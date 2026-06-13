import { type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useVideoSubmitStore } from '../store/videoSubmitStore'

export function LandingPage() {
  const navigate = useNavigate()
  const youtubeUrl = useVideoSubmitStore((s) => s.youtubeUrl)
  const urlError = useVideoSubmitStore((s) => s.urlError)
  const setYoutubeUrl = useVideoSubmitStore((s) => s.setYoutubeUrl)
  const submitYoutubeUrl = useVideoSubmitStore((s) => s.submitYoutubeUrl)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const result = submitYoutubeUrl()
    if (result) {
      navigate(`/learn/${result.videoId}`, { state: { youtubeUrl: result.url } })
    }
  }

  return (
    <main className="flex flex-1 flex-col justify-center gap-10 px-5 py-12 sm:gap-12 sm:px-8 sm:py-16">
      <section className="mx-auto w-full max-w-xl" aria-labelledby="hero-title">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent dark:text-accent-dark">
          Learning accelerator
        </p>
        <h1
          id="hero-title"
          className="mb-4 text-3xl font-medium leading-tight tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100"
        >
          Learn the key ideas from any YouTube lesson in minutes
        </h1>
        <p className="mb-8 max-w-prose text-[1.0625rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
          Paste a long educational video and get a summary, key concepts, and a
          quiz—without watching the whole thing.
        </p>

        <form className="w-full" onSubmit={handleSubmit} noValidate>
          <label className="sr-only" htmlFor="youtube-url">
            YouTube video URL
          </label>
          <div
            className={`flex flex-col gap-3 rounded-xl border bg-zinc-100 p-2 shadow-md transition-colors focus-within:border-violet-400/50 sm:flex-row sm:items-stretch dark:bg-zinc-900/80 ${
              urlError
                ? 'border-rose-500'
                : 'border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <input
              id="youtube-url"
              type="url"
              name="youtubeUrl"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=…"
              autoComplete="off"
              spellCheck={false}
              aria-invalid={urlError ? true : undefined}
              aria-describedby={urlError ? 'url-error' : undefined}
              className="w-full rounded-lg border border-zinc-200 bg-white px-4 py-3.5 text-base text-zinc-900 outline-none placeholder:text-zinc-500 focus:border-violet-400/50 focus:ring-4 focus:ring-violet-500/10 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 sm:flex-1"
            />
            <button
              type="submit"
              className="shrink-0 cursor-pointer rounded-lg bg-accent px-5 py-3.5 text-base font-medium text-white transition hover:brightness-110 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-accent-dark sm:whitespace-nowrap"
            >
              Generate learning material
            </button>
          </div>
          {urlError && (
            <p
              id="url-error"
              className="mt-2.5 text-[0.9375rem] text-rose-600 dark:text-rose-400"
              role="alert"
            >
              {urlError}
            </p>
          )}
        </form>
      </section>

      <section className="mx-auto w-full max-w-xl" aria-label="How it works">
        <ol className="flex flex-col gap-4 p-0">
          {[
            'Paste your YouTube URL',
            'We extract the transcript and build your notes',
            'Study the summary and take the quiz',
          ].map((text, index) => (
            <li
              key={text}
              className="flex items-start gap-3.5 text-[0.9375rem] leading-snug text-zinc-600 dark:text-zinc-400"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-sm font-semibold text-accent dark:text-accent-dark">
                {index + 1}
              </span>
              {text}
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
