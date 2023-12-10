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
import ReactFlagsSelect from "react-flags-select"
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js'
import { registerSchema } from "../validations/registerValidation"

const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [isLoading, setIsLoading] = useState(false)
    const [userRole, setUserRole] = useState('');
    const [phoneNumber, setPhoneNumber] = useState("+966");
    const [flagSelected, setFlagSelected] = useState("");
    const [touristPhoneNumber, setTouristPhoneNumber] = useState('');

 


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
        const inputValue = event.target.value;
        let countryCode = '';
    
        if (userRole === 'Local Citizen') {
            countryCode = "+966";
            setPhoneNumber(inputValue); //update the local citizen phone number
        } else if (userRole === 'Tourist') {
            countryCode = "+" + getCountryCallingCode(flagSelected as CountryCode); //get the country code for the selected flag
            const fullNumber = countryCode + inputValue.slice(countryCode.length); //set new input to the country code
            setTouristPhoneNumber(fullNumber); //update the tourist phone number
        }
    };
    
    const handleCountryChange = (code: any) => {
        const dialCode = getCountryCallingCode(code);
    setFlagSelected(code);
    setTouristPhoneNumber("+" + dialCode);
    };
    

    

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        let finalPhoneNumber = userRole === 'Local Citizen' ? phoneNumber : touristPhoneNumber;

    if (finalPhoneNumber.length !== 13 && userRole === 'Local Citizen') {
        toast.error("Phone number must be exactly 13 characters long.");
        return;
    }


    const payload = { ...data, role: userRole, phoneNumber: finalPhoneNumber };
    const validateData = registerSchema.parse(payload);
    setIsLoading(true);
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
        const selectedRole = event.target.value;
        setUserRole(selectedRole);
    
        if (selectedRole === 'Local Citizen') {
            setPhoneNumber("+966");
        } else if (selectedRole === 'Tourist') {
            setPhoneNumber("");
        }
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
        {userRole === 'Tourist' && (
    <>
        <ReactFlagsSelect
            selected={flagSelected}
            onSelect={(code) => handleCountryChange(code)}
        />
        <Input
            id="touristPhoneNumber"
            label="Phone Number"
            type="text"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            value={touristPhoneNumber}
            onChange={handlePhoneNumberChange}
        />
    </>
)}




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