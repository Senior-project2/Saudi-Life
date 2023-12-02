"use client"
import React from 'react'
import{CldUploadWidget} from 'next-cloudinary'
import {useCallback} from 'react'
import {MdOutlineAddPhotoAlternate} from 'react-icons/md'
import Avatar from './Avatar'
import SettingsAvatar from './navbar/SettingsAvatar'
import { RiEdit2Line } from "react-icons/ri";

declare global{
    var cloudinary: any
}

interface UserImageUploadProps{
    onChange: (value: string) => void;
    value: string
    userId: string
    isEditable: boolean
}

const UserImageUpload: React.FC<UserImageUploadProps> = ({
    value,
    onChange,
    userId,
    isEditable
}
) => {
    const handleUpload = useCallback((result: any) => {
        onChange(result.info.secure_url)
    }, [onChange])
    const uploadOptions = {
        uploadPresent: "zlalvxhl",  
        maxFiles: 1,
        
        resourceType: "image",
        folder: `${userId}/`,
        cropping: true,              
        croppingAspectRatio: 1,       
        croppingShowDimensions: true, 
        croppingShape: "circle",      
        multiple: false, 
        transformation: [{ crop: "fill", radius: "max"}],
        secure: true,
        
    };
  return (
    <CldUploadWidget
    onUpload={handleUpload}
    uploadPreset="jhwudwoy"
    options={
        
        uploadOptions
    }
    >
        {({open}) =>{
            return(
                <div
                onClick={() => isEditable && open?.()}
                className="
                relative
                p-5
                flex
                flex-col
                items-center
                justify-center
                text-neutral-600
                "
                >
                    
                    {value && (
                        <div
                        className="absolute inset-0 w-full h-full"
                        >
                            
                        
                    
                            <SettingsAvatar
                            src={value}
                            />
                            
                         </div>
                    )}
                    

                </div>
            )
        }}

    </CldUploadWidget>
  )
}

export default UserImageUpload