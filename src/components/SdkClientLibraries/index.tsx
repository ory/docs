import React, { useState } from "react"

type Sdk = {
  key: string
  label: string
  icon: string
  install: string
  packageUrl: string
  packageLabel: string
  repoUrl: string
}

const SDKS: Sdk[] = [
  {
    key: "typescript",
    label: "TypeScript",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
    install: "npm install @ory/client",
    packageUrl: "https://www.npmjs.com/package/@ory/client",
    packageLabel: "@ory/client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/typescript/README.md",
  },
  {
    key: "go",
    label: "Go",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/go/go-original-wordmark.svg",
    install: "go get github.com/ory/client-go",
    packageUrl: "https://github.com/ory/client-go",
    packageLabel: "ory/client-go",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/go/README.md",
  },
  {
    key: "python",
    label: "Python",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    install: "pip install ory-client",
    packageUrl: "https://pypi.org/project/ory-client/",
    packageLabel: "ory-client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/python/README.md",
  },
  {
    key: "php",
    label: "PHP",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg",
    install: "composer require ory/client",
    packageUrl: "https://packagist.org/packages/ory/client",
    packageLabel: "ory/client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/php/README.md",
  },
  {
    key: "java",
    label: "Java",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
    install: "mvn dependency:get -Dartifact=sh.ory:ory-client:LATEST",
    packageUrl: "https://search.maven.org/artifact/sh.ory/ory-client",
    packageLabel: "sh.ory:ory-client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/java/README.md",
  },
  {
    key: "ruby",
    label: "Ruby",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/ruby/ruby-plain.svg",
    install: "gem install ory-client",
    packageUrl: "https://rubygems.org/gems/ory-client",
    packageLabel: "ory-client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/ruby/README.md",
  },
  {
    key: "dotnet",
    label: ".NET",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dot-net/dot-net-original.svg",
    install: "dotnet add package Ory.Client",
    packageUrl: "https://www.nuget.org/packages/Ory.Client/",
    packageLabel: "Ory.Client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/dotnet/README.md",
  },
  {
    key: "rust",
    label: "Rust",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/rust/rust-original.svg",
    install: "cargo add ory-client",
    packageUrl: "https://crates.io/crates/ory-client",
    packageLabel: "ory-client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/rust/README.md",
  },
  {
    key: "dart",
    label: "Dart",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dart/dart-original.svg",
    install: "dart pub add ory_client",
    packageUrl: "https://pub.dev/packages/ory_client",
    packageLabel: "ory_client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/dart/README.md",
  },
  {
    key: "elixir",
    label: "Elixir",
    icon: "https://raw.githubusercontent.com/devicons/devicon/master/icons/elixir/elixir-original.svg",
    install: "mix deps.add ory_client",
    packageUrl: "https://hex.pm/packages/ory_client",
    packageLabel: "ory_client",
    repoUrl:
      "https://github.com/ory/sdk/blob/master/clients/client/elixir/README.md",
  },
]

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export default function SdkClientLibraries() {
  const [selected, setSelected] = useState(SDKS[0])
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(selected.install).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div
      style={{
        border: "1px solid var(--ifm-toc-border-color)",
        borderRadius: "var(--ifm-global-radius)",
        overflow: "hidden",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          padding: "0.6rem 1rem",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ifm-color-secondary)",
          borderBottom: "1px solid var(--ifm-toc-border-color)",
        }}
      >
        Client Libraries
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.25rem",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid var(--ifm-toc-border-color)",
        }}
      >
        {SDKS.map((sdk) => {
          const isActive = sdk.key === selected.key
          return (
            <button
              key={sdk.key}
              onClick={() => setSelected(sdk)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.35rem",
                padding: "0.5rem 0.75rem",
                border: isActive
                  ? "1px solid var(--ifm-color-primary)"
                  : "1px solid transparent",
                borderRadius: "var(--ifm-global-radius)",
                background: isActive
                  ? "var(--ifm-color-primary-lightest, rgba(var(--ifm-color-primary-rgb), 0.08))"
                  : "transparent",
                cursor: "pointer",
                transition: "all 200ms",
                minWidth: "60px",
              }}
            >
              <img
                src={sdk.icon}
                alt={sdk.label}
                width={28}
                height={28}
                style={{ display: "block" }}
              />
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive
                    ? "var(--ifm-color-primary)"
                    : "var(--ifm-color-secondary)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {sdk.label}
              </span>
            </button>
          )
        })}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          background: "var(--ifm-pre-background)",
        }}
      >
        <code
          style={{
            fontSize: "0.85rem",
            color: "var(--ifm-code-color)",
            fontFamily: "var(--ifm-font-family-monospace)",
            whiteSpace: "pre",
          }}
        >
          {selected.install}
        </code>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexShrink: 0,
            marginLeft: "1rem",
          }}
        >
          <button
            onClick={copy}
            title="Copy install command"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
              color: "var(--ifm-color-secondary)",
              display: "flex",
              alignItems: "center",
            }}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <a
            href={selected.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            title={`${selected.label} SDK README`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
              fontSize: "0.8rem",
              fontWeight: 600,
              color: "var(--ifm-color-primary)",
              textDecoration: "none",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            <GithubIcon />
            {selected.packageLabel}
          </a>
        </div>
      </div>
    </div>
  )
}
