"use client"

import React, { useRef, useState, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { getNowPlaying, type NowPlaying } from "@/utils/azuracastApi"

const STREAM_URL = "https://radio.asylumstudio.net:8000/radio.mp3"
const UPDATE_INTERVAL = 30000 // Update every 30 seconds

export default function IcecastPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const [isMuted, setIsMuted] = useState(false)
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const data = await getNowPlaying()
        setNowPlaying(data)
      } catch (error) {
        console.error("Failed to fetch now playing data:", error)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, UPDATE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0]
    setVolume(volumeValue)
    if (audioRef.current) {
      audioRef.current.volume = volumeValue
    }
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full text-white">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center text-[#ff00ff]">Asylum Studio Radio</h2>
      <audio ref={audioRef} src={STREAM_URL} />

      {nowPlaying && (
        <div className="mb-4">
          <img
            src={nowPlaying.now_playing.song.art || "/placeholder.svg?height=256&width=256"}
            alt="Album Art"
            className="w-full h-48 sm:h-64 object-cover rounded-md mb-4"
          />
          <p className="text-base sm:text-lg font-semibold text-[#ff00ff]">{nowPlaying.now_playing.song.title}</p>
          <p className="text-sm sm:text-md text-gray-400">{nowPlaying.now_playing.song.artist}</p>
        </div>
      )}

      <div className="flex items-center justify-between mb-4 gap-2">
        <Button
          onClick={togglePlayPause}
          size="icon"
          variant="outline"
          className="bg-teal-500 hover:bg-teal-600 text-white"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause className="h-5 w-5 sm:h-6 sm:w-6" /> : <Play className="h-5 w-5 sm:h-6 sm:w-6" />}
        </Button>
        <Button
          onClick={toggleMute}
          size="icon"
          variant="outline"
          className="bg-teal-500 hover:bg-teal-600 text-white"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX className="h-5 w-5 sm:h-6 sm:w-6" /> : <Volume2 className="h-5 w-5 sm:h-6 sm:w-6" />}
        </Button>
        {nowPlaying && (
          <div className="flex items-center bg-indigo-500 px-2 py-1 rounded-full text-xs sm:text-sm">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-white" />
            <span className="text-sm sm:text-base text-white">{nowPlaying.listeners.current}</span>
          </div>
        )}
      </div>

      <div className="flex items-center mb-4">
        <Volume2 className="h-4 w-4 mr-2 text-[#ff00ff]" />
        <Slider
          value={[volume]}
          onValueChange={handleVolumeChange}
          max={1}
          step={0.01}
          className="flex-grow"
          aria-label="Volume control"
        />
      </div>

      {nowPlaying && (
        <div className="mt-4 bg-gray-800 p-2 sm:p-3 rounded-md">
          <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-[#ff00ff]">Coming Up Next:</h3>
          <p className="text-sm sm:text-base text-gray-300">
            {nowPlaying.playing_next.song.title} - {nowPlaying.playing_next.song.artist}
          </p>
        </div>
      )}

      <p className="text-center mt-4 text-xs sm:text-sm text-gray-400">{isPlaying ? "Now Playing" : "Paused"}</p>
    </div>
  )
}

