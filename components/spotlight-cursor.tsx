"use client"

interface SpotlightCursorProps {
  mousePosition: { x: number; y: number }
}

export function SpotlightCursor({ mousePosition }: SpotlightCursorProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-10"
      style={{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
      }}
    />
  )
}
