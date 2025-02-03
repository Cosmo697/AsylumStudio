"use client"

import type React from "react"
import { createContext, useState, useContext, useRef, useEffect } from "react"
import { getNowPlaying, type NowPlaying } from "@/utils/azuracastApi"

interface AudioPlayerContextType {
  isPlaying: boolean
  togglePlayPause: () => void
  volume: number
  setVolume: (volume: number) => void
  isMuted: boolean
  toggleMute: () => void
  nowPlaying: NowPlaying | null
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider")
  }
  return context
}

export const AudioPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.25)
  const [isMuted, setIsMuted] = useState(false)
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    audioRef.current = new Audio("https://radio.asylumstudio.net:8000/radio.mp3")
    audioRef.current.volume = volume

    const fetchNowPlaying = async () => {
      try {
        const data = await getNowPlaying()
        setNowPlaying(data)
      } catch (error) {
        console.error("Failed to fetch now playing data:", error)
      }
    }

    fetchNowPlaying()
    const interval = setInterval(fetchNowPlaying, 30000) // Update every 30 seconds

    return () => {
      clearInterval(interval)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  return (
    <AudioPlayerContext.Provider
      value={{
        isPlaying,
        togglePlayPause,
        volume,
        setVolume,
        isMuted,
        toggleMute,
        nowPlaying,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

