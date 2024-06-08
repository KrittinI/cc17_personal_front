import { ToastContainer } from "react-toastify"
import AuthContextProvider from "./contexts/AuthContext"
import Router from "./route"

function App() {
  return (
    <AuthContextProvider>
      <div className="min-h-[100vh]">
        <Router />
        <ToastContainer
          position="bottom-right" autoClose={3000}
        />
      </div>
    </AuthContextProvider>
  )
}

export default App
