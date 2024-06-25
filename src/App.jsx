import { ToastContainer } from "react-toastify"
import AuthContextProvider from "./contexts/AuthContext"
import Router from "./route"
import CourtContextProvider from "./features/courts/contexts/CourtContext"
import EventContextProvider from "./features/events/context/EventContext"
import { Suspense } from "react"
import Spinner from "./components/Spinner"

function App() {
  return (
    <Suspense fallback={<Spinner />}>
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
    </Suspense>
  )
}

export default App
