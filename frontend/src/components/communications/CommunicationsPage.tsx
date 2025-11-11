import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { communicationsApi, leadsApi } from '../../services/api'
import type { Communication, Message } from '../../types'

const CommunicationsPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messageText, setMessageText] = useState('')
  const queryClient = useQueryClient()

  const { data: communicationsData } = useQuery({
    queryKey: ['communications'],
    queryFn: () => communicationsApi.getAll().then(res => res.data),
  })

  const { data: messagesData } = useQuery({
    queryKey: ['messages', selectedConversation],
    queryFn: () => {
      if (!selectedConversation) return Promise.resolve({ messages: [] })
      return communicationsApi.getMessages(selectedConversation).then(res => res.data)
    },
    enabled: !!selectedConversation,
  })

  const { data: leadsData } = useQuery({
    queryKey: ['leads'],
    queryFn: () => leadsApi.getAll().then(res => res.data),
  })

  const sendMessageMutation = useMutation({
    mutationFn: ({ leadId, body }: { leadId: string; body: string }) =>
      communicationsApi.sendMessage(leadId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', selectedConversation] })
      queryClient.invalidateQueries({ queryKey: ['communications'] })
      setMessageText('')
    },
  })

  const communications = communicationsData?.communications || []
  const messages = messagesData?.messages || []
  const leads = leadsData?.leads || []

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedConversation && messageText.trim()) {
      sendMessageMutation.mutate({
        leadId: selectedConversation,
        body: messageText.trim(),
      })
    }
  }

  const getLeadName = (leadId: string) => {
    const lead = leads.find((l: any) => l._id === leadId)
    return lead ? lead.name : 'Unknown'
  }

  return (
    <div className="px-4 py-6 h-[calc(100vh-8rem)]">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">Messages</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Conversations List */}
        <div className="card overflow-hidden flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Conversations</h2>
          <div className="flex-1 overflow-y-auto space-y-2">
            {communications.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">No conversations yet</p>
            ) : (
              communications.map((comm: Communication) => (
                <button
                  key={comm._id}
                  onClick={() => setSelectedConversation(comm.leadId)}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedConversation === comm.leadId
                      ? 'bg-primary-50 dark:bg-primary-900 border-2 border-primary-500'
                      : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{comm.leadName}</h3>
                    {comm.unreadCount > 0 && (
                      <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
                        {comm.unreadCount}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {comm.lastMessage || 'No messages yet'}
                  </p>
                  {comm.lastMessageTime && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(comm.lastMessageTime).toLocaleString()}
                    </p>
                  )}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Messages View */}
        <div className="lg:col-span-2 card flex flex-col">
          {selectedConversation ? (
            <>
              <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  {getLeadName(selectedConversation)}
                </h2>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No messages yet</p>
                ) : (
                  messages.map((message: Message) => (
                    <div
                      key={message._id}
                      className={`flex ${message.direction === 'outbound' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.direction === 'outbound'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.body}</p>
                        <p className={`text-xs mt-1 ${
                          message.direction === 'outbound' ? 'text-primary-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.createdAt ? new Date(message.createdAt).toLocaleString() : ''}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  className="input-field flex-1"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={!messageText.trim() || sendMessageMutation.isPending}
                  className="btn-primary"
                >
                  Send
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">Select a conversation to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommunicationsPage

