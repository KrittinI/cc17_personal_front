import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import MainContainer from '../layout/MainContainer'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import CourtPage from '../pages/CourtPage'
import EventPage from '../pages/EventPage'
import ProfilePage from '../pages/ProfilePage'
import BillPage from '../pages/BillPage'
import RedirectToLogin from '../features/authenticate/components/RedirectToLogin'
import RedirectAwayLogin from '../features/authenticate/components/RedirectAwayLogin'


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainContainer />,
        children: [
            {
                path: '/', element: (
                    <RedirectToLogin>
                        <HomePage />
                    </RedirectToLogin>
                )
            },
            {
                path: '/login', element: (
                    <RedirectAwayLogin>
                        <LoginPage />
                    </RedirectAwayLogin>
                )
            },
            { path: '/courts', element: <CourtPage /> },
            {
                path: '/events', element: (
                    <RedirectToLogin>
                        <EventPage />
                    </RedirectToLogin>
                )
            },
            {
                path: '/bills', element: (
                    <RedirectToLogin>
                        <BillPage />
                    </RedirectToLogin>
                )
            },
            {
                path: '/profile', element: (
                    <RedirectToLogin>
                        <ProfilePage />
                    </RedirectToLogin>
                )
            },
        ]
    },
])

export default function Router() {
    return (
        <RouterProvider router={router} />
    )
}
