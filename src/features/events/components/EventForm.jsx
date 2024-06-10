import { useState } from "react";
import Input from "../../../components/Input";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Button";

export default function EventForm({ courtId = 0 }) {

    const { authUser } = useAuth()

    const initialInput = {
        name: "",
        courtId: courtId,
        eventDay: "",
        evnetDuration: "",
        creatorId: authUser.id,
        closingTime: "",
        limit: "",
        payFirst: false
    }

    const [input, setInput] = useState(initialInput)

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const handleChangeCheckBox = e => {
        setInput({ ...input, [e.target.name]: e.target.checked })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(input);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-2 justify-center items-center">
                <div className="col-span-6">
                    <span>Event Name: </span>
                    <Input placeholder="Event Name" onChage={handleChangeInput} name="name" value={input.name} />
                </div>
                <span className="col-span-3">Date Time*: </span>
                <span className="col-span-3">Register until:</span>
                <div className="col-span-3">
                    <Input placeholder="eventday" type="datetime-local" onChage={handleChangeInput} name="eventDay" value={input.eventDay} />
                </div>
                <div className="col-span-3">
                    <Input placeholder="closing day" type="datetime-local" onChage={handleChangeInput} name="closingTime" value={input.closingTime} />
                </div>
                <div className="col-span-3">
                    <span>Duration(hr):</span>
                    <Input placeholder="Duration" type="number" onChage={handleChangeInput} name="evnetDuration" value={input.evnetDuration} />
                </div>
                <div className="col-span-2">
                    <span>Limit (person):</span>
                    <Input placeholder="Limit" type="number" onChage={handleChangeInput} name="limit" value={input.limit} />
                </div>
                <div className="col-span-1">
                    <label htmlFor="payFirst">PayFirst: </label>
                    <input type="checkbox" id="payFirst" name="payFirst" checked={input.payFirst} onChange={handleChangeCheckBox} />
                    {/* <Input placeholder="Payfirst" type="checkbox" onChage={handleChangeInput} name="payFirst" value={input.payFirst} /> */}
                </div>
                <div className="col-span-6">
                    <span>Location*: </span>
                    <Input placeholder="Loaction" onChage={handleChangeInput} name="courtId" value={input.courtId} />
                </div>
                <div className="col-span-2">
                </div>
                <div className="col-span-2">
                    <Button width="full" >Add Event</Button>
                </div>
                <div className="col-span-2">
                </div>
            </div>
        </form>
    )
}
