"use client"
import React, { createContext, useContext, useState } from "react"

interface StateContextType {
  selectedState: string
  setSelectedState: (state: string) => void
}

const StateContext = createContext<StateContextType | undefined>(undefined)

export function StateProvider({ children }: { children: React.ReactNode }) {
  const [selectedState, setSelectedState] = useState("")
  return (
    <StateContext.Provider value={{ selectedState, setSelectedState }}>
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  const context = useContext(StateContext)
  if (!context) throw new Error("useStateContext must be used within a StateProvider")
  return context
} 