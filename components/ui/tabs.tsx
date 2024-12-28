import React, { useState } from 'react'
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue: string
  className?: string
  children: React.ReactNode
}

interface TabsListProps {
  className?: string
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
}

interface TabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

const TabsContext = React.createContext<{
  activeTab: string
  setActiveTab: (value: string) => void
} | undefined>(undefined)

export const Tabs: React.FC<TabsProps> = ({ defaultValue, className, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export const TabsList: React.FC<TabsListProps> = ({ className, children }) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      {children}
    </div>
  )
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, className, children }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsTrigger must be used within Tabs')

  const { activeTab, setActiveTab } = context

  return (
    <button
      className={cn(
        "px-3 py-1.5 text-sm font-medium rounded-md",
        activeTab === value ? "bg-white text-black" : "text-gray-600 hover:text-black",
        className
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  )
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, className, children }) => {
  const context = React.useContext(TabsContext)
  if (!context) throw new Error('TabsContent must be used within Tabs')

  const { activeTab } = context

  if (activeTab !== value) return null

  return <div className={className}>{children}</div>
}

