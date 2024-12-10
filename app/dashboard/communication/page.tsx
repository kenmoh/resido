"use client"

import { useState } from 'react'
import MessageForm from "@/components/MessageForm";
import {Calendar, MessageCircle} from "lucide-react";

export default function Communication() {
  const recentMessages = [
    {
      id: 1,
      title: 'Monthly Meeting Notice',
      message: 'The monthly residents meeting will be held on Saturday...',
      date: '2024-03-15',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Security Update',
      message: 'New security measures have been implemented...',
      date: '2024-03-14',
      priority: 'medium',
    },
  ];
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Admin', content: 'Welcome to the estate communication channel!', timestamp: '2023-06-15 10:00' },
    { id: 2, sender: 'John Doe', content: 'When is the next community meeting?', timestamp: '2023-06-15 10:05' },
    { id: 3, sender: 'Admin', content: 'The next community meeting is scheduled for June 30th at 7 PM.', timestamp: '2023-06-15 10:10' },
  ])

  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleString()
      }])
      setNewMessage('')
    }
  }

  return (
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Send Message</h2>
            <MessageForm onSubmit={handleSendMessage}/>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Recent Messages</h2>
            <div className="space-y-4">
              {recentMessages.map((message) => (
                  <div
                      key={message.id}
                      className="p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <MessageCircle className="w-5 h-5 text-blue-500 mr-3"/>
                        <h3 className="font-medium">{message.title}</h3>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Calendar className="w-4 h-4 mr-2"/>
                        <span className="text-sm">{message.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{message.message}</p>
                    <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                      message.priority === 'high' ? 'bg-red-100 text-red-800' :
                          message.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                  }`}>
                    {message.priority.charAt(0).toUpperCase() + message.priority.slice(1)} Priority
                  </span>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}

