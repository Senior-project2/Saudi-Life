"use client"
import Image from "next/image"
import { RiEdit2Line } from "react-icons/ri"

interface SettingsAvatarProps{
    src: string | null | undefined
}
const SettingsAvatar: React.FC<SettingsAvatarProps> = ({
    src}
) => {
  return (
    <div className="relative inline-block"> 
    <Image
        className="rounded-full"
        height="60"
        width="60"
        alt="Avatar"
        src={src || "/placeholder.png"}
    />
    <div className="absolute bottom-0 right-0 p-2"> 
        <RiEdit2Line size={16} className="text-white bg-gray-700 rounded-full" />
    </div>
</div>
  )
}

export default SettingsAvatar