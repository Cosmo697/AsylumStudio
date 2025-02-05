"use client"

import type React from "react"
import { useAudioPlayer } from "@/contexts/AudioPlayerContext"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

const PersistentPlayer: React.FC = () => {
  const { isPlaying, togglePlayPause, volume, setVolume, isMuted, toggleMute, nowPlaying } = useAudioPlayer()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            onClick={togglePlayPause}
            size="icon"
            variant="outline"
            className="bg-teal-500 hover:bg-teal-600 text-white"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            onClick={toggleMute}
            size="icon"
            variant="outline"
            className="bg-teal-500 hover:bg-teal-600 text-white"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <div className="w-32">
            <Slider
              value={[volume]}
              onValueChange={(newVolume) => setVolume(newVolume[0])}
              max={1}
              step={0.01}
              aria-label="Volume control"
            />
          </div>
        </div>
        {nowPlaying && (
          <div className="text-sm">
            <p className="font-semibold">{nowPlaying.now_playing.song.title}</p>
            <p className="text-gray-400">{nowPlaying.now_playing.song.artist}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PersistentPlayer

