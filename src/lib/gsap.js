import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, useGSAP }
