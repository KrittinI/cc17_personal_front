import CourtContainer from '../features/courts/components/CourtContainer'
import useAuth from '../hooks/useAuth'
import useCourt from '../features/courts/hooks/useCourt'
import { useEffect } from 'react'
import CourtFormBox from '../features/courts/components/CourtFormBox'

export default function CourtPage() {
    const { authUser } = useAuth()


    const { fetchCourtData } = useCourt()

    useEffect(() => {
        fetchCourtData()
    }, [])


    return (
        <div>
            <div className='flex justify-between items-center px-8 pt-4 pb-2 sticky top-14 bg-blue-200 opacity-90'>
                <h1 className='text-4xl font-bold'>Courtlists</h1>
                {authUser?.isAdmin && <CourtFormBox />}
            </div>
            <CourtContainer />
        </div >
    )
}
