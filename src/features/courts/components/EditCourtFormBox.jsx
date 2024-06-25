import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import EditCourtForm from "./EditCourtForm";

export default function EditCourtFormBox({ courtDetail, setCourtDetail }) {
    const [open, setOpen] = useState(false)
    return (
        <div className="self-end">
            <Button width={40} bg="none" color="black" onClick={() => setOpen(true)}>Edit Court</Button>
            <Modal title={`Edit Court`} open={open} onClose={() => setOpen(false)}>
                <EditCourtForm onSuccess={() => setOpen(false)} courtDetail={courtDetail} setCourtDetail={setCourtDetail} />
            </Modal>
        </div>
    )
}
