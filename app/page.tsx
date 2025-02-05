"use client"

import { useAudioPlayer } from "@/contexts/AudioPlayerContext"

export default function Home() {
  const { nowPlaying } = useAudioPlayer()

  return (
    <div className="w-full min-h-screen bg-gray-950 px-2 py-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center text-primary">Welcome to Asylum Studio</h1>
        <p className="text-lg text-center text-gray-300">Experience the mind-freeing power of psychedelic music</p>
        {nowPlaying && (
          <div className="bg-gray-900 p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-[#ff00ff]">Now Playing</h2>
            <img
              src={nowPlaying.now_playing.song.art || "/placeholder.svg?height=256&width=256"}
              alt="Album Art"
              className="w-full h-48 sm:h-64 object-cover rounded-md mb-4"
            />
            <p className="text-xl font-semibold text-[#ff00ff]">{nowPlaying.now_playing.song.title}</p>
            <p className="text-lg text-gray-400">{nowPlaying.now_playing.song.artist}</p>
          </div>
        )}
      </div>
    </div>
  )
}

