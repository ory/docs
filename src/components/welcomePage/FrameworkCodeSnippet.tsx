import React from "react"

export interface FrameworkCodeSnippetProps {
  /** Full snippet text to display */
  snippet: string
  /** Optional prefix (e.g. "npm install ") shown in default color */
  snippetPrefix?: string
  /** Rest of snippet after prefix (e.g. package names) shown in brand color */
  snippetRest?: string
}

export function FrameworkCodeSnippet({
  snippet,
  snippetPrefix = "",
  snippetRest,
}: FrameworkCodeSnippetProps) {
  const showHighlight = snippetPrefix && snippetRest !== undefined

  return (
    <div className="code-sample-body flex gap-ory-6 items-start p-ory-6 bg-ory-bg-primary border border-ory-border-primary font-mono text-sm">
      <span className="text-ory-text-tertiary shrink-0 text-right leading-[1.65]">
        1
      </span>
      <code className="flex-1 min-w-0 text-ory-text-primary leading-[1.65] whitespace-pre-wrap font-mono">
        {showHighlight ? (
          <>
            <span className="text-ory-text-primary">{snippetPrefix}</span>
            <span className="text-ory-brand-primary">{snippetRest}</span>
          </>
        ) : (
          <span className="text-ory-text-primary">{snippet}</span>
        )}
      </code>
    </div>
  )
}
