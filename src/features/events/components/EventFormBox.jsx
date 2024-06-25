import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EventForm from "./EventForm";

export default function EventFormBox() {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Button bg='sky' onClick={() => setOpen(true)} >{"Add Event"}</Button>
            <Modal title="Event Detail" width={40} open={open} onClose={() => setOpen(false)}>
                <EventForm onSuccess={() => setOpen(false)} />
            </Modal>
        </div>
    )
}
