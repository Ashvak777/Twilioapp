import { useQuery } from '@tanstack/react-query'
import { leadsApi, propertiesApi, communicationsApi } from '../../services/api'

const Dashboard = () => {
  const { data: leadsData } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsApi.getAll().then(res => res.data),
  })

  const { data: propertiesData } = useQuery({
    queryKey: ['properties'],
    queryFn: () => propertiesApi.getAll().then(res => res.data),
  })

  const { data: communicationsData } = useQuery({
    queryKey: ['communications'],
    queryFn: () => communicationsApi.getAll().then(res => res.data),
  })

  const leads = leadsData?.leads || []
  const properties = propertiesData?.properties || []
  const communications = communicationsData?.communications || []

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter((l: any) => l.status === 'new').length,
    totalProperties: properties.length,
    availableProperties: properties.filter((p: any) => p.status === 'available').length,
    totalMessages: communications.reduce((sum: number, c: any) => sum + c.messageCount, 0),
    unreadMessages: communications.reduce((sum: number, c: any) => sum + c.unreadCount, 0),
  }

  const recentLeads = leads.slice(0, 5)
  const recentProperties = properties.slice(0, 5)

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Leads</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalLeads}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">New Leads</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.newLeads}</p>
            </div>
            <div className="text-4xl">✨</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Properties</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalProperties}</p>
            </div>
            <div className="text-4xl">🏠</div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unread Messages</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.unreadMessages}</p>
            </div>
            <div className="text-4xl">💬</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Leads</h2>
          <div className="space-y-3">
            {recentLeads.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No leads yet</p>
            ) : (
              recentLeads.map((lead: any) => (
                <div key={lead._id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-gray-100">{lead.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{lead.phone}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    lead.status === 'qualified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Recent Properties</h2>
          <div className="space-y-3">
            {recentProperties.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No properties yet</p>
            ) : (
              recentProperties.map((property: any) => (
                <div key={property._id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{property.address}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {property.city}, {property.state} • ${property.price.toLocaleString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

