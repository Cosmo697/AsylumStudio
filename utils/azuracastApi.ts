const API_BASE_URL = "https://radio.asylumstudio.net/api"

export interface NowPlaying {
  song: {
    title: string
    artist: string
    art: string
  }
  listeners: {
    current: number
  }
  now_playing: {
    song: {
      title: string
      artist: string
      art: string
    }
  }
  playing_next: {
    song: {
      title: string
      artist: string
    }
  }
}

export async function getNowPlaying(): Promise<NowPlaying> {
  const response = await fetch(`${API_BASE_URL}/nowplaying/1`)
  if (!response.ok) {
    throw new Error("Failed to fetch now playing data")
  }
  return response.json()
}

