'use client'; 

import clsx from 'clsx'; 
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps{
    label : string, 
    id : string, 
    type? : string , // ? is used for optional 
    required? : string , 
    register: UseFormRegister<FieldValues>, 
    errors: FieldErrors, 
    disabled? : boolean, 
}


const Input:  React.FC<InputProps> =({
    label, id , type, required, register, errors, disabled
}) => {
  return (
    <div>
        <label  className=' block text-sm font-medium leading-6 text-gray-800' htmlFor={id}>{label}</label>
        <div className='mt-2'>
            <input 
            id={id} 
            type={type} 
            autoComplete={id}
            disabled={disabled} 
            {...register(id,{required})}
            className={clsx("form-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-200 sm:text-sm sm:leading-6",errors[id] && "focus:ring-rose-500", disabled && "opacity-50 cursor-default" )}
            />
        </div>
    </div>
  )
}

export default Input