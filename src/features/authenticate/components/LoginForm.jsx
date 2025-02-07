import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegisterFormBox from "./RegisterFormBox";
import validateLogin from "../validators/login-validator";

const initialInput = {
    userName: '',
    password: ''
}

export default function LoginForm() {
    const [input, setInput] = useState(initialInput)
    const [error, setError] = useState("")

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChangeInput = e => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError("")
    }

    const handleLogin = async e => {
        try {
            e.preventDefault()
            const error = validateLogin(input)
            if (error) {
                console.log(error);
                return setError('Please fill the form')
            }
            input.email = input.userName
            input.mobile = input.userName
            await login(input)
            navigate('/')
            toast.success(`Welcome, ${input.userName}`)
        } catch (error) {
            delete input.email
            delete input.mobile
            setError(error.response.data.message)
        }

    }

    return (
        <div className="flex flex-col gap-4 bg-slate-100 w-96 p-8 justify-center items-center rounded-xl">
            <p className="text-4xl font-bold font-serif text-blue-500">LOG IN</p>
            <Input placeholder={`Username Email or Mobile`} name="userName" value={input.userName} onChage={handleChangeInput} />
            <Input placeholder={`Password`} type="password" name="password" value={input.password} onChage={handleChangeInput} />
            {error ? <span className="text-red-500 text-sm">{error}</span> : <p></p>}
            <Button width={60} onClick={handleLogin}>LOGIN</Button>
            <hr className="w-[90%] border " />
            <RegisterFormBox />
        </div>
    )
}
