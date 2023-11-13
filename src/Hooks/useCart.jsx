//Approach 1------------------------------------------------
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


// const useCart = () => {
//     const axiosSecure = useAxiosSecure()

//     const { data: cart=[] } = useQuery({
//         queryKey: ['cart'],
//         queryFn: async () =>{
//             const res = await axiosSecure.get('/carts')
//             return res.data
//         }
//     })
//     return [cart]
// };

// export default useCart;




//Approach 2------------------------------------------------------

const useCart = () => {
    const {user} = useAuth()
    const axiosSecure = useAxiosSecure()

    const {data: cart=[], refetch} = useQuery({                                  //here we are getting the data, giving it a name 'cart' and also assigning a default value empty array
        queryKey: ['cart', user?.email],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data
        }
    })
    return [cart, refetch]
};

export default useCart;