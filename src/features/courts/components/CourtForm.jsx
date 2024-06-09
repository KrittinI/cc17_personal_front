import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import courtApi from "../../../api/court";
import { toast } from "react-toastify";

const initialInput = {
    name: "", // unique notnull
    location: "",
    ratePerHour: '',
    amountCourt: '',
    mobile: "", // notnull
    detail: "",
    courtImage: ""
}


export default function CourtForm({ onSuccess }) {
    const [input, setInput] = useState(initialInput)
    const [error, setError] = useState()

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError('')
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (!(input.name.trim() && input.mobile.trim()))
                return setError("court must have name and mobile")
            if (isNaN(input.mobile) || input.mobile.trim().length < 10)
                return setError("invalid mobile number")
            const response = await courtApi.createCourt(input)
            console.log(response);
            if (response?.status !== 201) {
                return setError(response?.response?.data.message)
            }
            onSuccess()
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
