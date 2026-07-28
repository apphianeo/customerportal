import { useEffect, useState } from 'react'

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=6580814843&text&type=phone_number&app_absent=0'

/**
 * Floating WhatsApp FAB shown on every logged-in page.
 * Desktop (>=1024px): opens WhatsApp Web in a new tab.
 * Mobile (<1024px): follows the deep link, launching the native app
 * (falling back to the store when the app is missing).
 *
 * The FAB always floats *above* page chrome — it lifts when the footer
 * (or the mobile bottom nav) scrolls into view instead of covering them.
 */
export default function WhatsappWidget() {
  const [isDesktop, setIsDesktop] = useState(false)
  const [lift, setLift] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const update = () => setIsDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Lift the FAB so it rests above the footer / bottom nav rather than on top of them.
  useEffect(() => {
    const scroller = document.querySelector('main')

    function update() {
      let offset = 0
      const footer = document.querySelector('footer')
      if (footer) {
        const overlap = window.innerHeight - footer.getBoundingClientRect().top
        if (overlap > 0) offset = overlap
      }
      const nav = document.querySelector('nav.lg\\:hidden')
      if (nav) {
        const navRect = nav.getBoundingClientRect()
        // Only counts while the nav is actually on screen (mobile breakpoints).
        if (navRect.height > 0) offset = Math.max(offset, navRect.height)
      }
      setLift(offset)
    }

    update()
    scroller?.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      scroller?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <a
      href={WHATSAPP_URL}
      target={isDesktop ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      style={{ bottom: 24 + lift }}
      className="fixed right-[24px] z-50 flex items-center justify-center size-[56px] rounded-full bg-[#25D366] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] cursor-pointer transition-[bottom] duration-150"
    >
      <svg viewBox="0 0 32 32" className="size-[32px]" aria-hidden="true">
        <path
          fill="#fff"
          d="M16.001 4.8c-6.185 0-11.2 5.014-11.2 11.2 0 1.977.516 3.912 1.496 5.617L4.8 27.2l5.72-1.49a11.15 11.15 0 0 0 5.48 1.43h.005c6.184 0 11.199-5.014 11.199-11.2 0-2.992-1.165-5.805-3.28-7.92A11.12 11.12 0 0 0 16.001 4.8Zm0 20.53h-.004a9.3 9.3 0 0 1-4.735-1.296l-.34-.202-3.394.89.906-3.31-.221-.353a9.28 9.28 0 0 1-1.423-4.94c0-5.137 4.18-9.317 9.32-9.317a9.26 9.26 0 0 1 6.588 2.732 9.26 9.26 0 0 1 2.728 6.593c0 5.137-4.18 9.316-9.316 9.316Zm5.11-6.978c-.28-.14-1.657-.818-1.913-.911-.257-.094-.443-.14-.63.14-.186.28-.723.91-.886 1.097-.163.187-.326.21-.606.07-.28-.14-1.182-.436-2.252-1.39-.832-.742-1.394-1.658-1.557-1.938-.163-.28-.017-.431.123-.571.126-.125.28-.326.42-.49.14-.163.187-.28.28-.466.093-.187.047-.35-.023-.49-.07-.14-.63-1.518-.863-2.078-.227-.546-.458-.472-.63-.48l-.537-.01c-.187 0-.49.07-.746.35-.257.28-.98.957-.98 2.335 0 1.377 1.003 2.708 1.143 2.895.14.187 1.974 3.014 4.783 4.226.668.289 1.19.461 1.596.59.67.213 1.28.183 1.762.111.538-.08 1.657-.677 1.89-1.331.234-.654.234-1.215.164-1.331-.07-.117-.257-.187-.537-.327Z"
        />
      </svg>
    </a>
  )
}
