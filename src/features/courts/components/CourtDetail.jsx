import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import { BadmintonIcon } from "../../../icons";
import EventForm from "../../events/components/EventForm";
import useAuth from "../../../hooks/useAuth";

const widthMap = {
    full: 'w-full',
    70: 'w-[70%]'
}

export default function CourtDetail({ courtDetail, width = "full" }) {

    const { authUser } = useAuth()
    const [open, setOpen] = useState(false)


    return (
        <div className={`${widthMap[width]} mx-auto bg-white p-4 rounded-xl flex min-h-[80vh] gap-2`}>
            <div className="w-[60%] flex flex-col justify-start gap-8 py-4">
                <div className="text-5xl font-bold">
                    {courtDetail.name}
                </div>
                <div className="flex flex-col justify-start gap-4 bg-slate-100 p-4 rounded-md">
                    <div className="text-xl">
                        <span className="font-semibold">Amount Court: </span>
                        <span>{courtDetail.amountCourt}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Rate per Hour: </span>
                        <span>{courtDetail.ratePerHour} Baht</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Tel: </span>
                        <span>{courtDetail.mobile}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">More Detail: </span>
                        <span>{courtDetail.detail ? courtDetail.detail : "none"}</span>
                    </div>
                    <div className="text-xl">
                        <span className="font-semibold">Status: </span>
                        <span>{courtDetail.isActive ? 'On Service' : 'Closed'}</span>
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col justify-between py-4 items-center">
                <div className="flex flex-col gap-4 w-full">
                    <div
                        className=" flex justify-center items-center bg-gray-100 rounded-md h-64 w-full">
                        {courtDetail.courtImage || <BadmintonIcon />}
                    </div>
                    <div className="font-semibold">Google Map:</div>
                    {courtDetail.location
                        ? <a href={courtDetail.location} className="text-blue-500 underline" target="_blank">
                            {courtDetail.location}
                        </a>
                        : <p>none</p>
                    }
                </div>
                {authUser && <Button width={40} onClick={() => setOpen(true)} >Add Event</Button>}
                <Modal title="Event Detail" width={40} open={open} onClose={() => setOpen(false)}>
                    <EventForm onSuccess={() => setOpen(false)} courtId={courtDetail.id} />
                </Modal>
            </div>
        </div>
    )
}
