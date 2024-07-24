import Image from "next/image";
import AuthForm from "./components/AuthForm";

export default function Home() {
    return (
        <div
        className="flex min-h-full bg-gray-100 flex-col justify-center py-12 lg:px-8 sm:px-6">
            
            <div className=" sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                alt = "Logo"
                height= {64}
                width= {64}
                className=" mx-auto w-auto"
                src= "/images/logo1.png"
                />
            <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-cyan-700"
            >Sign in to your account</h2>
            </div>
            {/* auth form  */}
            <AuthForm />
        </div>
    );
  }