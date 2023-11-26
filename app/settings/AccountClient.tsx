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
interface AccountClientProps {
    currentUser?: SafeUser | null;
}



const AccountClient: React.FC<AccountClientProps> = ({ currentUser }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            phoneNumber: currentUser?.phoneNumber || '',
            
        }
    });

    const [editable, setEditable] = useState(false);
    const resetPasswordModal = useResetPasswordModal();
    const [isLoading, setIsLoading] = useState(false);

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
        }
    }, [currentUser, setValue]);

    const toggleEdit = () => {
        setEditable(!editable);
    };

    return (
        <Container>
            <div className="pl-2">
            <Heading
                title="Account Settings"
                subtitle="Manage your account settings here."
            />
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 p-4 border rounded-lg shadow-md">
                <div className="flex flex-col gap-4">
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
                onClick={onSubmit}
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
            </form>
        </Container>
    );
};

export default AccountClient;