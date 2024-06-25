import { useState } from "react";
import Input from "../../../components/Input";
import useAuth from "../../../hooks/useAuth";
import Button from "../../../components/Button";
import useCourt from "../../courts/hooks/useCourt";
import Select from "../../../components/Select";
import Option from "../../../components/Option";
import InputNumber from "../../../components/InputNumber";
import InputDateTime from "../../../components/InputDateTime";
import useEvent from "../hooks/useEvent";
import eventApi from "../../../api/event";
import { toast } from "react-toastify";
import relationApi from "../../../api/relation";

export default function EventForm({ courtId = 0, onSuccess }) {
    const { authUser } = useAuth()
    const { courts } = useCourt()
    const { setEvents } = useEvent()

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
    const [error, setError] = useState("")

    const handleChangeInput = e => {
        setError("")
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    // const handleChangeCheckBox = e => {
    //     setInput({ ...input, [e.target.name]: e.target.checked })
    // }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = { ...input }
            if (data.courtId === 0) {
                return setError("Event must have Location")
            } else
                data.courtId = +data.courtId
            const foundCourt = courts.find(court => court.id === +data.courtId)
            if (!data.name) {
                data.name = `${foundCourt?.name}-by-${authUser?.userName}`
            }
            if (!data.eventDay) {
                return setError("Event must have Datetime")
            }
            if (data.closingTime === '') {
                delete data.closingTime
            } else {
                data.closingTime = data.closingTime + ":00Z"
            }
            if (Date.parse(input.eventDay) < Date.parse(input.closingTime)) {
                return setError("Event have to be After Closing Day")
            }
            // if (data.evnetDuration) {
            //     data.evnetDuration = data.evnetDuration + "h"
            // }
            data.limit = +data.limit
            data.eventDay = data.eventDay + ":00Z"
            const response = await eventApi.createEvent(data)
            if (response.status !== 201) {
                setError("cannot create event")
            }
            onSuccess()
            await relationApi.createRelation(response.data.events.id)
            setEvents(prev => [...prev, response.data.events])
            toast.success('Create event complete')

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-6 gap-2 justify-center items-center">
                <div className="col-span-6">
                    <div className="flex justify-between pr-4">
                        <label role="button" htmlFor="name">Event Name: </label>
                        <span className="text-gray-500">* is required</span>
                    </div>
                    <Input
                        placeholder="Event Name"
                        onChage={handleChangeInput}
                        name="name"
                        value={input.name} />
                </div>
                <label role="button" htmlFor="eventDay" className="col-span-3">Date Time*: </label>
                <label role="button" htmlFor="closingTime" className="col-span-3">Register until:</label>
                <div className="col-span-3">
                    <InputDateTime
                        placeholder="eventday"
                        onChage={handleChangeInput}
                        name="eventDay"
                        value={input.eventDay}
                    />
                </div>
                <div className="col-span-3">
                    <InputDateTime
                        placeholder="closing day"
                        onChage={handleChangeInput}
                        name="closingTime"
                        value={input.closingTime}
                    />
                </div>
                <div className="col-span-3">
                    <label role="button" htmlFor="evnetDuration">Duration(hr, limit 10 hr):</label>
                    <InputNumber
                        placeholder="Duration"
                        onChage={handleChangeInput}
                        name="evnetDuration"
                        value={input.evnetDuration} max={10} />
                </div>
                <div className="col-span-3">
                    <label role="button" htmlFor="limit">Limit (person):</label>
                    <InputNumber
                        placeholder="Limit"
                        onChage={handleChangeInput}
                        name="limit"
                        value={input.limit} />
                </div>
                {/* <div className="col-span-1 flex flex-col justify-between items-center gap-2">
                    <label role="button" htmlFor="payFirst">PayFirst: </label>
                    <input type="checkbox" id="payFirst"
                        name="payFirst"
                        checked={input.payFirst}
                        onChange={handleChangeCheckBox} />
                </div> */}
                <div className="col-span-1">
                    <label role="button" htmlFor="courtId">Location*: </label>
                </div>
                <div className="col-span-5">
                    <Select id="courtId"
                        name="courtId"
                        onChange={handleChangeInput}
                        value={input.courtId}
                    >
                        {courts.map(court =>
                            <Option
                                className="col-span-6"
                                key={court.id}
                                value={court.id}
                                isActive={court.status}
                                name={court.name}
                            />
                        )}
                    </Select>
                </div>
                <div className="col-span-1  text-red-500 text-lg ">
                </div>
                <div className="col-span-4">
                    {error ? <p className="text-red-500 text-center pb-2">{error}</p> : null}
                    <Button width="full" >Add Event</Button>
                </div>
                <div className="col-span-1">
                </div>
            </div>
        </form>
    )
}
