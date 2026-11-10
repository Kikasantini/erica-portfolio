import { useEffect, useState } from 'react'

type GitHubCommit = {
  html_url: string
  parents: Array<{ sha: string }>
  commit: {
    message: string

    author: { date: string } | null
    committer?: { date: string } | null
  }
}

type LatestCommitProps = {
  githubUrl: string
  label: string
  language: string
}

export default function LatestCommit({
  githubUrl,
  label,
  language,
}: LatestCommitProps) {
  const [commit, setCommit] = useState<GitHubCommit | null>(null)

  useEffect(() => {
    let owner: string
    let repository: string

    try {
      const repoUrl = new URL(githubUrl)

      if (repoUrl.hostname !== 'github.com') return

      ;[owner, repository] = repoUrl.pathname.split('/').filter(Boolean)

      repository = repository?.replace(/\.git$/, '')

      if (!owner || !repository) return
    } catch {
      return
    }

    const controller = new AbortController()

    async function loadLatestCommit() {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repository}/commits?per_page=10`,
          { signal: controller.signal },
        )

        if (!response.ok) return

        const commits = (await response.json()) as GitHubCommit[]
        const latestNonMergeCommit = commits.find(
          (candidate) => candidate.parents.length <= 1,
        )

        setCommit(latestNonMergeCommit ?? null)
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setCommit(null)
        }
      }
    }

    void loadLatestCommit()

    return () => controller.abort()
  }, [githubUrl])

  if (!commit) return null

  const commitDate = commit.commit.author?.date ?? commit.commit.committer?.date

  if (!commitDate) return null

  const formattedCommitDate = new Intl.DateTimeFormat(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Toronto',
    timeZoneName: 'short',
  }).format(new Date(commitDate))

  return (
    <div className="project-latest-commit">
      <a
        className="project-latest-commit__link"
        href={commit.html_url}
        target="_blank"
        rel="noreferrer"
      >
        <span>
          {label} <time dateTime={commitDate}>{formattedCommitDate}</time>
        </span>
        <svg
          className="project-latest-commit__external-icon"
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 5h4v4m0-4-7 7" />
          <path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
        </svg>
      </a>
    </div>
  )
}
