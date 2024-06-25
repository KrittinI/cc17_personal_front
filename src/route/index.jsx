import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import RedirectToLogin from '../features/authenticate/components/RedirectToLogin'
import RedirectAwayLogin from '../features/authenticate/components/RedirectAwayLogin'
import { lazy } from 'react'

const MainContainer = lazy(() => import('../layout/MainContainer'))
const HomePage = lazy(() => import('../pages/HomePage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const CourtPage = lazy(() => import('../pages/CourtPage'))
const EventPage = lazy(() => import('../pages/EventPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const BillPage = lazy(() => import('../pages/BillPage'))
const CourtDetailPage = lazy(() => import('../pages/CourtDetailPage'))
const EventDetailPage = lazy(() => import('../pages/EventDetailPage'))

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
            { path: '/courts/:courtId', element: <CourtDetailPage /> },
            {
                path: '/events', element: (
                    <RedirectToLogin>
                        <EventPage />
                    </RedirectToLogin>
                )
            },
            {
                path: '/events/:eventId', element: (
                    <RedirectToLogin>
                        <EventDetailPage />
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
                path: '/users/:userId', element: (
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
