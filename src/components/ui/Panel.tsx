import React from 'react'

interface PanelProps {
  title?: string
  className?: string
  children: React.ReactNode
}

export default function Panel({ title, className = '', children }: PanelProps) {
  return (
    <div className={`bg-gray-900 border border-gray-700 rounded-lg ${className}`}>
      {title && (
        <div className="px-4 py-2 border-b border-gray-700 font-medium text-gray-200">
          {title}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  )
}
