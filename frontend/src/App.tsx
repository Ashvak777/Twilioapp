import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/common/Layout'
import Dashboard from './components/dashboard/Dashboard'
import LeadsPage from './components/leads/LeadsPage'
import PropertiesPage from './components/properties/PropertiesPage'
import CommunicationsPage from './components/communications/CommunicationsPage'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/communications" element={<CommunicationsPage />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App

