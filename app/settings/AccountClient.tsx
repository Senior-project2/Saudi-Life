"use client"
import { FieldValues } from 'react-hook-form';
import React from 'react';
import Container from '@/components/Container';
import Heading from '@/components/Heading';
import { SafeUser } from '../types';
import Input from '@/components/Input';
import { useForm } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import useResetPasswordModal from '../hooks/usResetPasswordModal';
import ResetPasswordModal from '@/components/modals/resetPasswordModal';
import UserImageUpload from '@/components/UserImageUpload';
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"

const validPhoneNumberPrefixes = ['50', '53', '55', '58', '59', '54', '56', '570', '571', '572', '576', '577', '578'];

const phoneNumberRegex = new RegExp(`^\\+966(${validPhoneNumberPrefixes.join('|')})\\d{7}$`);

const settingsSchema = z.object({
    name: z.string().nonempty("Name is required").min(2).max(30),
    email: z.string().nonempty("Email is required").email("Invalid email format"),
    phoneNumber: z.string().nonempty().refine((val) => {
        return val === undefined || (phoneNumberRegex.test(val) && val.length === 13);
    }, {
        message: `Phone number must be exactly 13 characters long, start with +966, and follow with these prefixes: ${validPhoneNumberPrefixes.join(', ')}`,
    }),
    image: z.string().optional(),
    description: z.string().min(10).max(200).trim().transform((str) => escape(str.trim()))
  });



interface AccountClientProps {
    currentUser?: SafeUser | null;
}



const AccountClient: React.FC<AccountClientProps> = ({ currentUser }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm<FieldValues>({
        resolver: zodResolver(settingsSchema),
        defaultValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phoneNumber: currentUser?.phoneNumber || '',
            image: currentUser?.image || '',
            description: currentUser?.description || ''
            
        }
    });

    const [editable, setEditable] = useState(false);
    const resetPasswordModal = useResetPasswordModal();
    const [isLoading, setIsLoading] = useState(false);
    const watchImage = watch('image');

    const onSubmit = async (data: FieldValues) => {
        if (!currentUser) {
            toast.error("Please log in to update your account.");
            return;
        }
        
        setIsLoading(true);
        axios.post('/api/user', data)
            .then(() => {
                toast.success('Account updated successfully');
                setEditable(false);
                
            })
            .catch(() => {
                
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    

    
    React.useEffect(() => {
        if (currentUser) {
            setValue('name', currentUser.name || '');
            setValue('email', currentUser.email || '');
            setValue('phoneNumber', currentUser.phoneNumber || '');
            setValue('image', currentUser.image || '');
            setValue('description', currentUser.description || '');
        }
    }, [currentUser, setValue]);
    

    const toggleEdit = () => {
        
        setEditable(!editable);
    };

    const handleImageChange = (imageUrl: string) => {
        setValue('image', imageUrl,{
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        });
    }

    

 
    return (
        <Container>
            <div className="pl-2">
            <Heading
                title="Account Settings"
                subtitle="Manage your account settings here."
            />
            </div>
            
            <div  className="mt-4 p-4 border rounded-lg shadow-md">
                <div className="flex flex-col gap-4">
                <div className="pt-2 pl-3" >
                
              <UserImageUpload
              value={watchImage}
              onChange={handleImageChange}
              userId={currentUser?.id || 'samples'}
              isEditable={editable}
              />
                </div>
                <br/>
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />
                
                <Input
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />
                 <Input
                    id="description"
                    label="Description"
                    type="textarea"
                    disabled={!editable}
                    register={register}
                    errors={errors}
                />
               
                </div>
                
                <div className="p-4">
                <CustomButton
                label="Edit Account Information"
                onClick={toggleEdit}
                disabled={editable}
                outline={true}
                />
                <div className="pt-2">
                <CustomButton
                label="Submit Changes"
                onClick={handleSubmit(onSubmit)}
                disabled={!editable}
                />
                </div>
                </div>
                <div className="
            text-neutral-500
            text-center
            mt-4
            font-light">
               
                <div className="
                text-neutral-800
                cursor-pointer
                hover:underline"
                onClick={resetPasswordModal.onOpen}
                >
                    Change Password
                </div>
                

            </div>
            <ResetPasswordModal
                currentUser={currentUser}
                />
                
            </div>
        </Container>
    );
};

export default AccountClient;