"use client"
import axios from "axios"
import {FcGoogle} from "react-icons/fc"
import {useCallback, useState} from "react"
import{FieldValues, SubmitHandler, useForm} from "react-hook-form"
import{useRegisterModal} from "@/app/hooks/useRegistedModal"
import Modal from "./Modal"
import Heading from "@/components/Heading"
import Input from "@/components/Input"
import toast from "react-hot-toast"
import CustomButton from "@/components/CustomButton"
import { signIn } from "next-auth/react"
import useLoginModal from "@/app/hooks/useLoginModal"
import { useEffect } from "react"

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const [userRole, setUserRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("+966");


    const{
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "",
            phoneNumber: "+996",

        }
        


    });

    useEffect(() => {
        setValue("phoneNumber", phoneNumber);
    }, [phoneNumber, setValue]);

    const handlePhoneNumberChange = (event: any) => {
        const value = event.target.value;
        if (value.length <= 13 && value.startsWith("+966")) {
            setPhoneNumber(value); 
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        if (phoneNumber.length !== 13 && userRole === 'Local Citizen') {
            toast.error("Phone number must be exactly 13 characters long.");
            return;
        }
        
        const payload = { ...data, role: userRole };
        setIsLoading(true);
        axios.post('api/register', payload)
        .then(() =>{
            toast.success("Account created successfully!")
            registerModal.onClose();
            loginModal.onOpen();
        })
        .catch((error) =>{
            toast.error("Somthing went wrong!")
                })
        .finally(() =>{
            setIsLoading(false)
        })
    }
    const handleRoleChange = (event: any) => {
        setUserRole(event.target.value);
      };
    
    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent=(
        <div className="
        flex
        flex-col
        gap-4
        ">
        <Heading
        title="Welcome to Saudi Life"
        subtitle="Create an account to continue"
        />
        <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        />
        <select onChange={handleRoleChange} className="form-select">
        <option value="">Select Role</option>
        <option value="Local Citizen">Local Citizen</option>
        <option value="Tourist">Tourist</option>
      </select>

      {userRole === 'Local Citizen' && (
        <Input
            id="phoneNumber"
                    label="Phone Number"
                    type="text"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
        />)}
        
        
        
        
        </div>
    )

    const footerContent=(
        <div className="
        flex
        flex-col
        gap-4
        mt-3">
            <hr/>
            <CustomButton
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}/>
            <div className="
            text-neutral-500
            text-center
            mt-4
            font-light">
                <div className="
                flex
                flex-row
                items-center
                gap-2
                justify-center
                ">
                    Already have an account?
                </div>
                <div className="
                text-neutral-800
                cursor-pointer
                hover:underline"
                onClick={toggle}>
                    Log in
                </div>

            </div>
        </div>


    )
    
  return (
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Register"
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    actionLabel="Continue"
    body={bodyContent}
    footer={footerContent}
    />
  )
};

export default RegisterModal