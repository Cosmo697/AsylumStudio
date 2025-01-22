"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface Message {
  id: number
  user: string
  text: string
}

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [username, setUsername] = useState("")
  const [isUsernameDialogOpen, setIsUsernameDialogOpen] = useState(false)
  const [tempUsername, setTempUsername] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedUsername = localStorage.getItem("chatUsername")
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() !== "" && username) {
      const newMessage: Message = {
        id: Date.now(),
        user: username,
        text: inputMessage.trim(),
      }
      setMessages((prevMessages) => [...prevMessages, newMessage])
      setInputMessage("")
    }
  }

  const handleSetUsername = (e: React.FormEvent) => {
    e.preventDefault()
    if (tempUsername.trim() !== "") {
      const newUsername = tempUsername.trim()
      setUsername(newUsername)
      localStorage.setItem("chatUsername", newUsername)
      setIsUsernameDialogOpen(false)
    }
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full text-white h-[400px] sm:h-[500px] flex flex-col">
      <div className="flex justify-between items-center mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-[#ff00ff]">Chat Room</h2>
        {username ? (
          <Button
            onClick={() => setIsUsernameDialogOpen(true)}
            variant="outline"
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm"
          >
            Change Username
          </Button>
        ) : (
          <Button
            onClick={() => setIsUsernameDialogOpen(true)}
            variant="outline"
            size="sm"
            className="bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm"
          >
            Set Username
          </Button>
        )}
      </div>
      <div className="flex-grow overflow-y-auto mb-4 space-y-2 text-sm">
        {messages.map((message) => (
          <div key={message.id} className="bg-gray-800 p-2 rounded-md">
            <span className="font-bold text-[#ff00ff] text-sm sm:text-base">{message.user}: </span>
            <span className="text-gray-300 text-sm sm:text-base">{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="flex space-x-2 text-sm">
        <Input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder={username ? "Type a message..." : "Set a username to chat"}
          className="flex-grow bg-gray-800 text-white border-gray-700 text-sm sm:text-base"
          disabled={!username}
        />
        <Button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base"
          disabled={!username}
        >
          Send
        </Button>
      </form>

      <Dialog open={isUsernameDialogOpen} onOpenChange={setIsUsernameDialogOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-[#ff00ff]">Choose Your Username</DialogTitle>
            <DialogDescription className="text-gray-400">
              Choose a username to identify yourself in the chat.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSetUsername}>
            <Input
              type="text"
              value={tempUsername}
              onChange={(e) => setTempUsername(e.target.value)}
              placeholder="Enter your username"
              className="bg-gray-700 text-white border-gray-600 mb-4"
            />
            <DialogFooter>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white">
                Set Username
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

