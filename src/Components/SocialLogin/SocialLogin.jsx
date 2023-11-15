import { FaGoogle } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {

    const {googleSignIn} = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(res => {
            const userInfo = {
                email: res.user?.email,
                name: res.user?.displayName,
            }
            axiosPublic.post('/users', userInfo)
            .then(res =>{
                console.log(res)
                navigate('/')
            })
            .catch(err =>{
                console.log(err)
                navigate('/')
            })
        })
    }

    return (
        <div className=" p-8">
            <div className="divider"></div> 
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className=" mr-2"></FaGoogle>
                    Button
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;