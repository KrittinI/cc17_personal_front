import { useState } from 'react'
import Button from '../components/Button'
import Modal from '../components/Modal'
import CourtContainer from '../features/courts/components/CourtContainer'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import CourtForm from '../features/courts/components/CourtForm'
import { toast } from 'react-toastify'
import useCourt from '../features/courts/hooks/useCourt'
import { useEffect } from 'react'

export default function CourtPage() {
    const { authUser } = useAuth()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)

    const { fetchCourtData } = useCourt()

    useEffect(() => {
        fetchCourtData()
    }, [])

    const handeClickAddCourt = () => {
        if (!authUser) {
            toast.error('you must login first')
            navigate('/login')
        }
        setOpen(true)
    }

    return (
        <div>
            <div className='flex justify-between items-center px-8 pt-4 pb-2 sticky top-14 bg-blue-200'>
                <h1 className='text-4xl font-bold'>Courtlists</h1>
                {authUser?.isAdmin && <Button bg='sky' onClick={handeClickAddCourt} >Add Court</Button>}
                <Modal title="Court Detail" open={open} onClose={() => setOpen(false)}>
                    <CourtForm onSuccess={() => setOpen(false)} />
                </Modal>
            </div>
            <CourtContainer />
        </div >
    )
}
