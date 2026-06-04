import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react"

export type QuickstartsDeploymentId = "network" | "oel" | "oss"

type QuickstartsDeploymentContextValue = {
  deployment: QuickstartsDeploymentId
  setDeployment: (id: QuickstartsDeploymentId) => void
}

const QuickstartsDeploymentContext =
  createContext<QuickstartsDeploymentContextValue | null>(null)

export function QuickstartsDeploymentProvider({
  children,
  initialDeployment = "network",
}: {
  children: React.ReactNode
  initialDeployment?: QuickstartsDeploymentId
}) {
  const [deployment, setDeploymentState] =
    useState<QuickstartsDeploymentId>(initialDeployment)

  // Keep context in sync with explicitly segmented URLs (e.g. /docs/oel/...).
  useEffect(() => {
    if (initialDeployment === "network") return
    setDeploymentState(initialDeployment)
  }, [initialDeployment])

  const setDeployment = useCallback((id: QuickstartsDeploymentId) => {
    setDeploymentState(id)
  }, [])
  return (
    <QuickstartsDeploymentContext.Provider
      value={{ deployment, setDeployment }}
    >
      {children}
    </QuickstartsDeploymentContext.Provider>
  )
}

export function useQuickstartsDeployment(): QuickstartsDeploymentContextValue | null {
  return useContext(QuickstartsDeploymentContext)
}
