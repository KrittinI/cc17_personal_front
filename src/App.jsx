import { ToastContainer } from "react-toastify"
import AuthContextProvider from "./contexts/AuthContext"
import Router from "./route"
import CourtContextProvider from "./features/courts/contexts/CourtContext"
import EventContextProvider from "./features/events/context/EventContext"

function App() {
  return (
    <CourtContextProvider>
      <AuthContextProvider>
        <EventContextProvider>
          <div className="min-h-[100vh-8] ">
            <Router />
            <ToastContainer
              position="bottom-right" autoClose={3000}
            />
          </div>
        </EventContextProvider>
      </AuthContextProvider>
    </CourtContextProvider>
  )
}

export default App
