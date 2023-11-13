
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";



const SignUp = () => {

    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()

    const onSubmit = (data) => {
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user)
                updateUserProfile(data.name, data.photo)
                    .then(result => {
                        console.log(result)
                        reset()
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User created successfully",
                            showConfirmButton: false,
                            timer: 1500
                        })
                        navigate('/')
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className=" text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photo", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photo && <span className=" text-red-600">Photo is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className=" text-red-600">Email is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/
                                })} placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && (<p className=" text-red-600">Password is required</p>)}
                                {errors.password?.type === "pattern" && (<p className=" text-red-600">Password must have a uppercase a lowercase a number and a special character</p>)}
                                {errors.password?.type === "minLength" && (<p className=" text-red-600">Password  must be at least 6 character</p>)}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>

                            <div className="form-control mt-6">
                                <input type="submit" value="Sign Up" className="btn btn-primary" />
                            </div>
                        </form>
                        <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;