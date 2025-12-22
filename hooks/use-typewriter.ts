import { useState, useEffect } from 'react'

export function useTypewriter(
  text: string,
  speed: number = 100,
  delay: number = 2000
) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isDeleting && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(currentIndex + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (!isDeleting && currentIndex === text.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delay)

      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex - 1))
        setCurrentIndex(currentIndex - 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (isDeleting && currentIndex === 0) {
      const timeout = setTimeout(() => {
        setIsDeleting(false)
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed, delay, isDeleting])

  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setIsDeleting(false)
  }, [text])

  return displayedText
}

