import { Link, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="flex min-h-svh w-full flex-col text-left">
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-0 sm:max-w-2xl lg:max-w-3xl">
        <header className="border-b border-zinc-200 px-5 py-6 dark:border-zinc-800 sm:px-8">
          <Link
            to="/"
            className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
          >
            SkillSprint
          </Link>
        </header>

        <Outlet />

        <footer className="border-t border-zinc-200 px-5 py-6 text-center dark:border-zinc-800 sm:px-8">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Turn one hour of video into a 10–15 minute learning session.
          </p>
        </footer>
      </div>
    </div>
  )
}
