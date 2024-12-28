"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, checked, defaultChecked, ...props }, ref) => {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={e => onCheckedChange?.(e.target.checked)}
          {...props}
        />
        <div className={cn(
          "w-11 h-6 bg-gray-200 rounded-full peer",
          "peer-checked:bg-blue-600",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
          "after:bg-white after:rounded-full after:h-5 after:w-5",
          "after:transition-all peer-checked:after:translate-x-full",
          className
        )} />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }

