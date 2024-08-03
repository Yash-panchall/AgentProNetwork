import React from 'react'
import AdminAgentPicture from '../Components/AdminAgentPicture'
import { useParams } from 'react-router-dom'

const AdminAgentProfile = () => {

    const params = useParams();
    return (
        <>
            <AdminAgentPicture getId = {params.id}/>
        </>
    )
}


export default AdminAgentProfile