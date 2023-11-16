import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    // withCredentials: true,
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
    //request interceptor to add authorization header for every secure call to the api
    axiosSecure.interceptors.request.use((config) =>{
        const token = localStorage.getItem('token')
        // console.log('request stopped by interceptor', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, (error)=>{
        return Promise.reject(error)
    })

    //intercepts 401 and 403 status
    axiosSecure.interceptors.response.use((response) =>{
        return response
    }, async(error) =>{
        const status = error.response.status
        // console.log('error status in the interceptor ', status)
        //for 401 and 403 logout the user and move them to the login page
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })

    return axiosSecure
};

export default useAxiosSecure;