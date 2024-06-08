import LoginForm from "../features/authenticate/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-[50vh] relative shadow">
                <LoginForm />
            </div>
            <div className="h-[40vh]">Court Box</div>
        </div>
    )
}
