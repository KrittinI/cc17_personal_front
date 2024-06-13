import { useState } from "react";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import SplitScreen from "../../../layout/SplitScreen";
import avatarExample from "../constant/avatar-example";

export default function ProfileAvatarContainer({ profileImage, onClose, userProfile, setUserProfile }) {

    const [image, setImage] = useState(profileImage)

    const handleSaveAvatar = () => {
        setUserProfile({ ...userProfile, profileImage: image })
        onClose(false)
    }

    const handleDeleteAvatar = () => {
        setImage(null)
    }
    return (
        <SplitScreen border>
            <div className="grid grid-cols-4 gap-4">
                <Avatar size={6} src={profileImage} />
                {avatarExample.map(
                    (avatar, index) =>
                        <button key={index} className="flex justify-center items-center hover:opacity-50" onClick={() => setImage(avatar)}>
                            <Avatar key={index} size={6} src={avatar} />
                        </button>
                )}
            </div>
            <div className="flex flex-col h-full items-center justify-between gap-4">
                <div className="flex justify-center flex-col items-center gap-2">
                    <Avatar size={10} src={image} />
                    <button className="text-blue-500 underline hover:text-blue-600" onClick={handleDeleteAvatar}>Delete Image</button>
                </div>
                <div className="flex justify-between gap-4">
                    <Button onClick={handleSaveAvatar}>Save</Button>
                    <Button bg="none" color="black" onClick={onClose}>Cancel</Button>
                </div>
            </div>
        </SplitScreen>
    )
}
