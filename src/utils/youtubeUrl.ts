const YOUTUBE_HOSTS = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'youtu.be',
  'www.youtu.be',
])

/** Returns the 11-character video id, or null if the URL is not a supported YouTube link. */
export function extractYouTubeVideoId(raw: string): string | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  try {
    const url = new URL(trimmed)

    if (url.hostname === 'youtu.be' || url.hostname === 'www.youtu.be') {
      const id = url.pathname.slice(1).split('/')[0]
      return id && /^[\w-]{11}$/.test(id) ? id : null
    }

    if (!YOUTUBE_HOSTS.has(url.hostname)) {
      return null
    }

    if (url.pathname === '/watch') {
      const id = url.searchParams.get('v')
      return id && /^[\w-]{11}$/.test(id) ? id : null
    }

    const embedMatch = url.pathname.match(/^\/(?:embed|v|shorts)\/([\w-]{11})/)
    if (embedMatch) return embedMatch[1]

    return null
  } catch {
    return null
  }
}

export function isValidYouTubeUrl(raw: string): boolean {
  return extractYouTubeVideoId(raw) !== null
}
