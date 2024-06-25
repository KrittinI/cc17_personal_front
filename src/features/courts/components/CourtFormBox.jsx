import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import CourtForm from "./CourtForm";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CourtFormBox() {
    const { authUser } = useAuth()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const handeClickAddCourt = () => {
        if (!authUser) {
            toast.error('you must login first')
            navigate('/login')
        }
        setOpen(true)
    }

    return (
        <div>
            <Button bg='sky' onClick={handeClickAddCourt} >Add Court</Button>
            <Modal title="Court Detail" open={open} onClose={() => setOpen(false)}>
                <CourtForm onSuccess={() => setOpen(false)} />
            </Modal>
        </div>
    )
}
