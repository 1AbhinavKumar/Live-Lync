'use client';
//  as we are using button, input , useeffects since these are interactive so it is a client side component .

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button"
import { useCallback, useState , useEffect} from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialBtn from "./AuthSocialBtn";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios"
import toast from "react-hot-toast";
import {signIn, useSession} from "next-auth/react"
import { useRouter } from "next/navigation";

type Variant = 'LOGIN' | "REGISTER";

const AuthForm = () => {
    const {data: session , status } = useSession(); 
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false)


    useEffect(()=> {
        if (status === 'authenticated'){
            router.push("/users")
        }
    }, [status,router])

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === "REGISTER") {
            axios.post('/api/register', data)
            .then(()=> signIn('credentials', data ))
            .catch(()=> toast.error("Something went wrong !"))
            .finally(()=> setIsLoading(false))
        }

        if (variant === "LOGIN") {
            signIn('credentials',{
                ...data, 
                redirect: false
            })
            .then((callback)=> {
                if (callback ?.error ){
                    toast.error("Invalid info.")
                }
                if (callback ?. ok ) {
                    toast.success("Login successful.")
                    router.push("/users")
                }
            })
            .finally(()=> setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {redirect : false})
        .then((callback)=>{
            
            if (callback ?.error){
                toast.error("Something went wrong !")
            }

            if (callback ?. ok ){
                toast.success("Login successful.")
            }
        })
        .finally(()=> setIsLoading(false))
    
    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        < Input id="name" label='Username' register={register} errors={errors} disabled={isLoading} />
                    )}

                    < Input id="email" label='Email address' type="email" register={register} errors={errors} disabled={isLoading}/>

                    < Input id="password" label='Password' type="password" register={register} errors={errors} disabled={isLoading}/>


                    <div>
                        <Button
                            disabled={isLoading}
                            fullwidth
                            type="submit"
                        >{variant === 'LOGIN' ? 'Sign in' : 'Register'}</Button>
                    </div>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className=" absolute inset-0 flex items-center ">
                            <div className=" w-full border-t border-gray-500" />
                        </div>
                        <div className=" relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <div className=" mt-3 flex gap-2">
                        <AuthSocialBtn 
                        icon={BsGithub} onclick={()=> socialAction("github")}/>
                        <AuthSocialBtn 
                        icon={BsGoogle} onclick={()=> socialAction("google")}/>
                    </div>
                    
                    <div className=" flex gap-2 justify-center text-sm mt-3 px-2 text-gray-500">
                        {variant === "LOGIN" ? "Don't have an account?" : "Already have an account?"}

                    <div onClick={ toggleVariant}
                    className=" underline cursor-pointer">
                        {variant === "LOGIN" ? "Register" : "Login"}
                    </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
export default AuthForm;