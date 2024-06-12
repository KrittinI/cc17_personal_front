import { useState } from "react";
import Button from "../../../components/Button";
import useAuth from "../../../hooks/useAuth"
import Input from "../../../components/Input";
import Avatar from "../../../components/Avatar";
import { useEffect } from "react";
import userApi from "../../../api/user";
import { toast } from "react-toastify";

export default function ProfileContainer({ userId }) {
    const { authUser, setAuthUser } = useAuth()

    const [userProfile, setUserProfile] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState("")

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
                if (authUser[i] !== userProfile[i]) {
                    const response = await userApi.updateUserProfile(userProfile)
                    if (response.status !== 200) {
                        setError('username email or mobile already used')
                        return
                    }
                    setIsEdit(false)
                    setUserProfile(response.data.userProfile)
                    setAuthUser(response.data.userProfile)
                    toast.success('Save Profile')
                }
            }
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
                <Avatar size={8} />
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
