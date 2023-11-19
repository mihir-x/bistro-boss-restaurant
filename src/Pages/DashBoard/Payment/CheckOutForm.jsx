import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useCart from "../../../Hooks/useCart";
import useAuth from "../../../Hooks/useAuth";


const CheckOutForm = () => {
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionID, setTransactionID] = useState('')
    const {user} = useAuth()
    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart] = useCart()
    const totalPrice = cart.reduce((total, item)=> total + item.price, 0)

    useEffect(()=>{
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res => {
            console.log(res.data.clientSecret)
            setClientSecret(res.data.clientSecret)
        })
    },[axiosSecure, totalPrice])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return 
        }

        const card = elements.getElement(CardElement)
        if(card === null){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })
        if(error){
            console.log('Payment error: ', error)
            setError(error.message)
        }
        else{
            console.log('Payment Method: ', paymentMethod)
            setError('')
        }

        //confirm payment
        const { paymentIntent, error: confirmError} = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details:{
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                }
            }
        })
        if(confirmError){
            console.log('confirm error: ', confirmError.message)
        }
        else{
            console.log('Payment intent: ',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                console.log('Payment successful. Your transaction ID: ', paymentIntent.id)
                setTransactionID(paymentIntent.id)
                //now save the payment in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionID: paymentIntent.id,
                    date: new Date(), //must convert this to utc because this is an international operation. use moment js
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuID),
                    status: 'pending',
                }
                const res = await axiosSecure.post('/payments', payment)
                console.log('payment saved: ',res)
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret} className="btn btn-sm btn-primary my-4">
                Pay
            </button>
            <p className=" text-red-500 ">{error}</p>
            {
                transactionID && <p className=" text-green-600">Your transaction id: {transactionID}</p>
            }
        </form>
    );
};

export default CheckOutForm;