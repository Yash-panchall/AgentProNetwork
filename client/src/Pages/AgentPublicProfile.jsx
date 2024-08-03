import React from 'react'
import AgentPublicPicture from '../Components/AgentPublicPicture'
import { useParams } from 'react-router-dom'

const AgentPublicProfile = () => {

    const {username , id} =  useParams();
  return (
    <>
        <AgentPublicPicture getdata={{username,id}}/>
    </>
  )
}

export default AgentPublicProfile