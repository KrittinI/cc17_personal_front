import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import courtApi from "../../../api/court";
import { toast } from "react-toastify";



export default function CourtForm({ onSuccess, courtDetail, setCourtDetail }) {
    const [input, setInput] = useState(courtDetail)
    const [error, setError] = useState()

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError('')
    }
    const handleClickIsActive = () => {
        setInput({ ...input, isActive: !input.isActive })
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
            if (isNaN(data.amountCourt)) {
                return setError("Amount Court must be a number")
            }
            const response = await courtApi.updateCourtData(input.id, data)
            console.log(response);
            if (response?.status !== 200) {
                return setError(response?.response?.data.message)
            }
            onSuccess()
            setCourtDetail(data)
            toast.success("Update Successfully")
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-4 gap-4 ">
                <div className="col-span-4">
                    <p>Name:</p>
                    <Input
                        placeholder="name"
                        name="name"
                        value={input.name}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-4">
                    <p>Location:</p>
                    <Input
                        placeholder="google map link"
                        name="location"
                        value={input.location}
                        onChage={handleChangeInput}
                    />
                </div>
                <div>
                    <p>Rate/Hour:</p>
                    <Input
                        placeholder="rate/hour"
                        name="ratePerHour"
                        value={input.ratePerHour}
                        onChage={handleChangeInput}
                    />
                </div>
                <div>
                    <p>Court:</p>
                    <Input
                        placeholder="amount court"
                        name="amountCourt"
                        value={input.amountCourt}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-2">
                    <p>Tel: </p>
                    <Input
                        placeholder="mobile"
                        name="mobile"
                        value={input.mobile}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-4 row-span-2">
                    <p>Detail:</p>
                    <Input
                        placeholder="detail"
                        name="detail"
                        value={input.detail}
                        onChage={handleChangeInput}
                    />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <p>Active: </p>
                </div>
                <div>
                    <button
                        type="button"
                        name="isActive"
                        value={input?.isActive}
                        onClick={handleClickIsActive}
                        className={`${input.isActive
                            ? 'bg-green-500 hover:bg-green-600'
                            : 'bg-red-500 hover:bg-red-600'}
                            px-3 py-1.5 rounded-xl text-white`}
                    >
                        {input.isActive ? "TRUE" : "FALSE"}
                    </button>
                </div>
                {/* <div className="col-span-4">
                    <p>Court Image:</p>
                    <Input
                        placeholder="court image"
                        name="courtImage"
                        value={input.courtImage}
                        onChage={handleChangeInput}
                    />
                </div> */}
                {error ? <span className="text-red-500 w-full col-span-4 text-center">{error}</span> : <p className="col-span-4"></p>}
                <div className="col-span-2">
                    <Button width="full">Update</Button>
                </div>
                <div className="col-span-2">
                    <button type="button" className="border border-black hover:bg-gray-300 hover:border-gray-300 w-full px-3 py-1.5 rounded-xl" onClick={() => onSuccess()}>Cancel</button>
                </div>
            </div>
        </form>
    )
}
