'use client'

import { useState, useEffect } from 'react'

type WindowSize = {
  width: number
  height: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  isSmallMobile: boolean
  isLandscape: boolean
  isPortrait: boolean
  scrollY: number
  scrollX: number
}

// Breakpoints
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024
const SMALL_MOBILE_BREAKPOINT = 480

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isSmallMobile: false,
    isLandscape: false,
    isPortrait: false,
    scrollY: 0,
    scrollX: 0
  })

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setWindowSize({
        width,
        height,
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        isSmallMobile: width < SMALL_MOBILE_BREAKPOINT,
        isLandscape: width > height,
        isPortrait: height > width,
        scrollY: window.scrollY,
        scrollX: window.scrollX
      })
    }

    // Handler for scroll
    const handleScroll = () => {
      setWindowSize(prev => ({
        ...prev,
        scrollY: window.scrollY,
        scrollX: window.scrollX
      }))
    }

    // Add event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()
    handleScroll()

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Empty array ensures effect runs only once

  return windowSize
}

// Specific size hooks
export function useIsMobile() {
  const { isMobile } = useWindowSize()
  return isMobile
}

export function useIsTablet() {
  const { isTablet } = useWindowSize()
  return isTablet
}

export function useIsDesktop() {
  const { isDesktop } = useWindowSize()
  return isDesktop
}

export function useIsLandscape() {
  const { isLandscape } = useWindowSize()
  return isLandscape
}

export function useScrollPosition() {
  const { scrollY } = useWindowSize()
  return scrollY
}

export function useIsScrolled(threshold = 50) {
  const { scrollY } = useWindowSize()
  return scrollY > threshold
}