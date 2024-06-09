import LoginForm from "../features/authenticate/components/LoginForm";
import CourtContainer from "../features/courts/components/CourtContainer";

export default function LoginPage() {
    return (
        <div className="flex flex-col gap-4">
            <div className="h-[50vh] relative shadow">
                <LoginForm />
            </div>
            <div className="h-[40vh] w-full overflow-x-auto">
                <CourtContainer display="flex" />
            </div>
        </div>
    )
}
