import { IconType } from "react-icons";

interface AuthSocialBtnProps {
    icon: IconType
    onclick : () => void ; 
}
const AuthSocialBtn :React.FC <AuthSocialBtnProps>= ({
    icon: Icon, onclick
}) => {
    return (
        <button
        type="button" onClick={onclick} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 ring-1 ring-inset ring-gray-400 hover:bg-gray-100 focus:outline-offset-0">

            <Icon />
        </button>
    );
}

export default AuthSocialBtn