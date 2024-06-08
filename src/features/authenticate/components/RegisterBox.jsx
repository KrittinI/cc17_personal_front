import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterBox() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button width={60} bg='sky' onClick={() => setOpen(true)}>Register</Button>
            <Modal title="Sign up form" open={open} onClose={() => setOpen(false)}>
                <RegisterForm onSuccess={() => setOpen(false)} />
            </Modal>
        </>
    )
}
