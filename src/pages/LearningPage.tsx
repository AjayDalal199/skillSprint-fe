import { Link, useLocation, useParams } from 'react-router-dom'
import { useVideoSubmitStore } from '../store/videoSubmitStore'

type LocationState = {
  youtubeUrl?: string
}

export function LearningPage() {
  const { videoId } = useParams<{ videoId: string }>()
  const location = useLocation()
  const state = location.state as LocationState | null
  const lastSubmitted = useVideoSubmitStore((s) => s.lastSubmitted)

  const youtubeUrl =
    state?.youtubeUrl ??
    (lastSubmitted?.videoId === videoId ? lastSubmitted?.url : undefined)

  if (!videoId) {
    return (
      <main className="flex flex-1 flex-col justify-center px-5 py-12 sm:px-8">
        <p className="text-zinc-600 dark:text-zinc-400">Missing video id.</p>
        <Link to="/" className="mt-4 text-accent dark:text-accent-dark">
          Back to home
        </Link>
      </main>
    )
  }

  return (
    <main className="flex flex-1 flex-col justify-center px-5 py-12 sm:px-8">
      <div className="mx-auto w-full max-w-xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent dark:text-accent-dark">
          Processing
        </p>
        <h1 className="mb-4 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100">
          Learning material for this video
        </h1>
        <p className="mb-6 text-zinc-600 dark:text-zinc-400">
          Backend pipeline coming next: transcript, summary, concepts, and quiz
          will appear here.
        </p>
        <dl className="space-y-3 rounded-xl border border-zinc-200 bg-zinc-100/80 p-4 dark:border-zinc-700 dark:bg-zinc-900/80">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-500">
              Video ID
            </dt>
            <dd className="mt-1 font-mono text-sm text-zinc-900 dark:text-zinc-100">
              {videoId}
            </dd>
          </div>
          {youtubeUrl && (
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Source URL
              </dt>
              <dd className="mt-1 break-all text-sm text-zinc-700 dark:text-zinc-300">
                {youtubeUrl}
              </dd>
            </div>
          )}
        </dl>
        <Link
          to="/"
          className="mt-8 inline-block text-sm font-medium text-accent hover:underline dark:text-accent-dark"
        >
          ← Submit another video
        </Link>
      </div>
    </main>
  )
}
