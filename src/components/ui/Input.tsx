'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export function Input({ label, error, icon, className = '', ...props }: InputProps) {
  return (
    <div className="w-full space-y-2 relative">
      {label && (
        <label className="block text-sm font-semibold text-aura-black ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-gray pointer-events-none">
            {icon}
          </div>
        )}
        <input
          className={cn(
            "w-full px-4 py-3 bg-aura-light-gray/50 border border-transparent rounded-2xl focus:bg-white focus:border-aura-black/10 focus:ring-4 focus:ring-aura-black/5 outline-none transition-all duration-300 placeholder:text-aura-gray text-aura-black",
            icon && "pl-11",
            error && "border-red-500 focus:ring-red-500/10",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1 ml-1 font-medium">{error}</p>}
    </div>
  )
}
