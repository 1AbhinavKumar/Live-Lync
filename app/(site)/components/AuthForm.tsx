'use client';
//  as we are using button, input , useeffects since these are interactive so it is a client side component .

import Input from "@/app/components/inputs/input";
import Button from "@/app/components/button"
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialBtn from "./AuthSocialBtn";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = 'LOGIN' | "REGISTER";

const AuthForm = () => {
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false)

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
            // register logic
        }

        if (variant === "LOGIN") {
            // login logic
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        // Social sign in 

    }

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className=" bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                <form className=" space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    {variant === "REGISTER" && (
                        < Input id="email" label='Username' register={register} errors={errors} disabled={isLoading} />
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