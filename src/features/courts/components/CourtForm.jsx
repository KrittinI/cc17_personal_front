import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import courtApi from "../../../api/court";
import { toast } from "react-toastify";
import useCourt from "../hooks/useCourt";

const initialInput = {
    name: "", // unique notnull
    location: "",
    ratePerHour: '',
    amountCourt: '',
    mobile: "", // notnull
    detail: "",
    isActive: true,
    courtImage: ""
}


export default function CourtForm({ onSuccess }) {
    const [input, setInput] = useState(initialInput)
    const [error, setError] = useState()
    const { courts, setCourts } = useCourt()

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError('')
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const data = { ...input }
            if (!(data.name.trim() && data.mobile.trim()))
                return setError("court must have name and mobile")
            if (data.name.trim > 20) {
                return setError("court name cannot contain more than 20 characters")
            }
            if (isNaN(data.mobile) || data.mobile.trim().length < 10)
                return setError("invalid mobile number")
            if (isNaN(data.ratePerHour)) {
                return setError("rate per hour must be a number")
            }
            if (data.ratePerHour > 1000000) {
                return setError("rate per should less than 1,000,000")
            }

            const response = await courtApi.createCourt(data)
            if (response?.status !== 201) {
                return setError(response?.response?.data.message)
            }
            onSuccess()
            data.id = courts.length + 1
            setCourts(prev => [...prev, data])
            toast.success(response.data.message)
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-4">
                    <Input
                        placeholder="name"
                        name="name"
                        value={input.name}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-4">
                    <Input
                        placeholder="location"
                        name="location"
                        value={input.location}
                        onChage={handleChangeInput}
                    />
                </div>
                <div>
                    <Input
                        placeholder="rate/hour"
                        name="ratePerHour"
                        value={input.ratePerHour}
                        onChage={handleChangeInput}
                    />
                </div>
                <div>
                    <Input
                        placeholder="amount court"
                        name="amountCourt"
                        value={input.amountCourt}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        placeholder="mobile"
                        name="mobile"
                        value={input.mobile}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-4 row-span-2">
                    <Input
                        placeholder="detail"
                        name="detail"
                        value={input.detail}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-4">
                    <Input
                        placeholder="court image"
                        name="courtImage"
                        value={input.courtImage}
                        onChage={handleChangeInput}
                    />
                </div>
                {error ? <span className="text-red-500 w-full col-span-4 text-center">{error}</span> : <p></p>}
                <div className="col-span-4">
                    <Button width="full">Add Court</Button>
                </div>
            </div>
        </form>
    )
}
