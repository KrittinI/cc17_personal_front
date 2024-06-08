import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import validateRegister from "../validators/register-validator";
import authApi from "../../../api/auth";
import { toast } from "react-toastify";

const initialInput = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
}
const initialInputError = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: ''
}


export default function RegisterForm({ onSuccess }) {
    const [input, setInput] = useState(initialInput)
    const [inputError, setInputError] = useState(initialInputError)
    const [error, setError] = useState('')

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setInputError({ ...inputError, [e.target.name]: '' })
        setError('')
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const error = validateRegister(input)
            if (error) {
                return setInputError(error)
            }
            setInputError({ ...initialInputError })
            const result = await authApi.register(input)
            if (!result) {
                const error = new Error('username email or mobile already used')
                throw error
            }
            onSuccess();
            toast.success('register successfully. please login to continue.')
            console.log(result);
        } catch (error) {
            setError('username email or mobile already used')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <Input
                        placeholder="username"
                        name="userName"
                        value={input.userName}
                        onChage={handleChangeInput}
                        error={inputError.userName}
                    />
                </div>
                <div>
                    <Input
                        placeholder="firstname"
                        name="firstName"
                        value={input.firstName}
                        onChage={handleChangeInput}
                        error={inputError.firstName}
                    />
                </div>
                <div>
                    <Input
                        placeholder="lastname"
                        name="lastName"
                        value={input.lastName}
                        onChage={handleChangeInput}
                        error={inputError.lastName}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        placeholder="email"
                        name="email"
                        value={input.email}
                        onChage={handleChangeInput}
                        error={inputError.email}
                    />
                </div>
                <div className="col-span-2">
                    <Input
                        placeholder="mobile"
                        name="mobile"
                        value={input.mobile}
                        onChage={handleChangeInput}
                        error={inputError.mobile}
                    />
                </div>
                <div>
                    <Input
                        placeholder="password"
                        name="password"
                        type="password"
                        value={input.password}
                        onChage={handleChangeInput}
                        error={inputError.password}
                    />
                </div>
                <div>
                    <Input
                        placeholder="confirmpassword"
                        name="confirmPassword"
                        type="password"
                        value={input.confirmPassword}
                        onChage={handleChangeInput}
                        error={inputError.confirmPassword}
                    />
                </div>
                {error ? <span className="text-red-500 w-full col-span-2 text-center">{error}</span> : <p></p>}
                <div className="col-span-2">
                    <Button width="full">Sign up</Button>
                </div>
            </div>
        </form>
    )
}
