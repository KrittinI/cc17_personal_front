import { useState } from "react";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import ProfileAvatarContainer from "./ProfileAvatarContainer";

export default function ProfileAvatarBox({ userProfile, setUserProfile }) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button bg="avatar" onClick={() => setOpen(true)}>
                <Avatar size={8} src={userProfile?.profileImage} />
            </Button>
            <button className="text-blue-500 underline hover:text-blue-600" onClick={() => setOpen(true)}>Edit Avatar</button>
            <Modal title={`Choose Your Avatar`} open={open} onClose={() => setOpen(false)} width={50}>
                <ProfileAvatarContainer
                    profileImage={userProfile?.profileImage}
                    onClose={() => setOpen(false)}
                    setUserProfile={setUserProfile}
                    userProfile={userProfile}
                />
            </Modal>
        </>
    )
}
