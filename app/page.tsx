import IcecastPlayer from "@/components/IcecastPlayer"
import ChatComponent from "@/components/ChatComponent"

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-gray-950 px-2 py-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <IcecastPlayer />
        <ChatComponent />
      </div>
    </main>
  )
}

