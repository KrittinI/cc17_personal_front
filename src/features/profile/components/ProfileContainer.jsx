import { useState } from "react";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth"
import Input from "../../../components/Input";
import Avatar from "../../../components/Avatar";
import { useEffect } from "react";
import userApi from "../../../api/user";
import { toast } from "react-toastify";
import validateProfile from "../validator/profile-validator";
import Modal from "../../../components/Modal";
import ProfileAvatarContainer from "./ProfileAvatarContainer";

export default function ProfileContainer({ userId }) {
    const { authUser, setAuthUser } = useAuth()

    const [userProfile, setUserProfile] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)

    const handleChangeEditUser = e => {
        setError('')
        setUserProfile({ ...userProfile, [e.target.name]: e.target.value })
    }

    const handleClickCancelEdit = () => {
        setUserProfile(authUser)
        setIsEdit(false)
    }

    const handleClickSaveEdit = async () => {
        try {
            for (let i in authUser) {
                if (authUser[i] === userProfile[i]) continue
                const error = validateProfile(userProfile)
                if (error) {
                    console.log(error);
                    return setError("email or mobile incorrect form")
                }
                const response = await userApi.updateUserProfile(userProfile)
                if (response.status !== 200) {
                    return setError('username email or mobile already used')
                }
                setUserProfile(response.data.userProfile)
                setAuthUser(response.data.userProfile)
            }
            toast.success('Save Profile')
            setIsEdit(false)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const fetchProfileUSer = async () => {
            try {
                const response = await userApi.getUserProfile(userId)
                setUserProfile(response.data.userProfile)
                if (response.data.userProfile.id === authUser?.id)
                    setUserProfile(authUser)
            } catch (error) {
                console.log(error);
            }
        }
        fetchProfileUSer()
    }, [userId, authUser])

    return (
        <div className="flex flex-col  gap-4 bg-white p-4 rounded-2xl">
            <div className="text-3xl font-semibold text-center">Profile</div>
            <div className="flex flex-col gap-2 items-center">
                {isEdit
                    ? <>
                        <Button bg="avatar" onClick={() => setOpen(true)}>
                            <Avatar size={8} src={userProfile.profileImage} />
                        </Button>
                        <button className="text-blue-500 underline hover:text-blue-600" onClick={() => setOpen(true)}>Edit Avatar</button>
                        <Modal title={`Choose Your Avatar`} open={open} onClose={() => setOpen(false)} width={50}>
                            <ProfileAvatarContainer
                                profileImage={userProfile.profileImage}
                                onClose={() => setOpen(false)}
                                setUserProfile={setUserProfile}
                                userProfile={userProfile}
                            />
                        </Modal>
                    </>
                    : <Avatar size={8} src={userProfile.profileImage} />
                }
                <hr className="border-1 border-black w-full" />
            </div>
            <div className="flex flex-col gap-2">
                <p>Username : </p>
                {isEdit
                    ? <Input size={1} value={userProfile?.userName} name="userName" onChage={handleChangeEditUser} />
                    : <p>{userProfile?.userName}</p>
                }
                <hr className="border-1 border-black" />
            </div>
            <div className="flex flex-col gap-2">
                <p>Firstname : </p>
                {isEdit
                    ? <Input size={1} value={userProfile?.firstName} name="firstName" onChage={handleChangeEditUser} />
                    : <p>{userProfile?.firstName}</p>
                }
                <hr className="border-1 border-black" />
            </div>
            <div className="flex flex-col gap-2">
                <p>Lastname : </p>
                {isEdit
                    ? <Input size={1} value={userProfile?.lastName} name="lastName" onChage={handleChangeEditUser} />
                    : <p>{userProfile?.lastName}</p>
                }
                <hr className="border-1 border-black" />
            </div>
            <div className="flex flex-col gap-2">
                <p>E-mail : </p>
                {isEdit
                    ? <Input size={1} value={userProfile?.email} name="email" onChage={handleChangeEditUser} />
                    : <p>{userProfile?.email}</p>
                }
                <hr className="border-1 border-black" />
            </div>
            <div className="flex flex-col gap-2">
                <p>Mobile : </p>
                {isEdit
                    ? <Input size={1} value={userProfile?.mobile} name="mobile" onChage={handleChangeEditUser} />
                    : <p>{userProfile?.mobile}</p>
                }
                <hr className="border-1 border-black" />
            </div>
            <span className="text-center text-red-500">{error}</span>
            {authUser?.id === +userId && <div className="text-center">
                {isEdit
                    ? <div className="flex justify-evenly">
                        <Button width={40} onClick={handleClickSaveEdit}>Save</Button>
                        <Button bg="none" color="black" width={40} onClick={handleClickCancelEdit}>Cancel</Button>
                    </div>
                    : <Button bg="none" color="black" width={40} onClick={() => setIsEdit(true)}>Edit Profile</Button>
                }
            </div>}
        </div >
    )
}
