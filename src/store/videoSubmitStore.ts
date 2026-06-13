import { create } from 'zustand'
import {
  extractYouTubeVideoId,
  isValidYouTubeUrl,
} from '../utils/youtubeUrl'

type SubmitResult = {
  videoId: string
  url: string
}

type VideoSubmitState = {
  youtubeUrl: string
  urlError: string | null
  lastSubmitted: SubmitResult | null
  setYoutubeUrl: (url: string) => void
  clearUrlError: () => void
  submitYoutubeUrl: () => SubmitResult | null
  reset: () => void
}

export const useVideoSubmitStore = create<VideoSubmitState>((set, get) => ({
  youtubeUrl: '',
  urlError: null,
  lastSubmitted: null,

  setYoutubeUrl: (url) =>
    set((state) => ({
      youtubeUrl: url,
      urlError: state.urlError && url ? null : state.urlError,
      lastSubmitted: state.lastSubmitted && url ? null : state.lastSubmitted,
    })),

  clearUrlError: () => set({ urlError: null }),

  submitYoutubeUrl: () => {
    const url = get().youtubeUrl

    if (!url.trim()) {
      set({ urlError: 'Paste a YouTube video link to continue.', lastSubmitted: null })
      return null
    }

    if (!isValidYouTubeUrl(url)) {
      set({
        urlError: 'Enter a valid YouTube URL (watch, youtu.be, or shorts).',
        lastSubmitted: null,
      })
      return null
    }

    const videoId = extractYouTubeVideoId(url)
    if (!videoId) {
      set({
        urlError: 'Enter a valid YouTube URL (watch, youtu.be, or shorts).',
        lastSubmitted: null,
      })
      return null
    }

    const result = { videoId, url: url.trim() }
    set({ urlError: null, lastSubmitted: result })
    return result
  },

  reset: () => set({ youtubeUrl: '', urlError: null, lastSubmitted: null }),
}))
