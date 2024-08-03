import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegistrationForm from './Pages/AgentRegistration'
import LoginForm from './Pages/AgentLogin';
import AgentDashboard from './Pages/AgentDashboard';
import AgentProfile from './Pages/AgentProfile';
import AgentDrawerNavbar from './layouts/AgentDrawerNavbar';
import AgentLogOut from './Pages/AgentLogOut';
import AdminProfile from './Pages/AdminProfile';
import AdminDrawerNavbar from './layouts/AdminDrawerNavbar';
import AdminLogin from './Pages/AdminLogin';
import AgentsTable from './Pages/AdminAgentsTable';
import AdminLogOut from './Pages/AdminLogout';
import AdminAgentProfile from './Pages/AdminAgentProfile';
import AgentPublicProfile from './Pages/AgentPublicProfile';


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/agent/register' element={<RegistrationForm/>} />
          <Route path='/agent/login' element={<LoginForm/>} />
          <Route path='/agent' element = { <AgentDrawerNavbar/> }>
            <Route path='dashboard' element = {<AgentDashboard/>}/>
            <Route path='profile' element = {<AgentProfile/>}/>
          </Route>
          <Route path='/agent/logout' element = {<AgentLogOut/>}/>
          <Route path='/admin/login' element = {<AdminLogin/>}/>
          <Route path='/admin' element={<AdminDrawerNavbar />}>
            <Route path='profile' element={<AdminProfile />} />
            <Route path='agents-listing' element={<AgentsTable />} />
            <Route path="/admin/agents/profile/:id" element={<AdminAgentProfile  />} />
          </Route>
          <Route path='/admin/logout' element = {<AdminLogOut/>}/>
          <Route path='/agent/profile/:username/:id' element={<AgentPublicProfile/>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
