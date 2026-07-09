import type { CSSProperties } from 'react'

/* ─── UOI design-library icons (exact vectors from Figma) ────
   fill="currentColor" so callers control color via `style.color`
   or a text-* class, mirroring the previous @ant-design/icons API. */

type IconProps = { size?: number; className?: string; style?: CSSProperties }

/* ic-right — breadcrumb / row chevron (node 1461:743) */
export function ChevronRightIcon({ size = 10, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M6.94866 4.63169L3.55431 1.23729L3.11236 1.67922L6.43306 4.99997L3.11236 8.32067L3.5543 8.76261L6.94866 5.36826C7.15205 5.16486 7.15206 4.83509 6.94866 4.63169Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ic-down — dropdown / accordion chevron (node 2096:23932) */
export function ChevronDownIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M8.58916 11.1179L14.0202 5.68689L13.3131 4.97978L7.99991 10.2929L2.68679 4.97979L1.97968 5.68689L7.41065 11.1179C7.73608 11.4433 8.26372 11.4433 8.58916 11.1179Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ic-up — chevron pointing up (ic-down rotated 180°) */
export function ChevronUpIcon({ size = 16, className, style }: IconProps) {
  return <ChevronDownIcon size={size} className={className} style={{ ...style, transform: `rotate(180deg)${style?.transform ? ` ${style.transform}` : ''}` }} />
}

/* ic-forward — long CTA arrow (node 1136:28062) */
export function ArrowForwardIcon({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className} style={style} aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.1262 8.5L8.31311 13.3131L9.02022 14.0202L14.6869 8.35355C14.8822 8.15829 14.8822 7.84171 14.6869 7.64645L9.02022 1.97978L8.31311 2.68689L13.1262 7.5L1 7.5L1 8.5L13.1262 8.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* Cart — Buy Policy / Buy Now CTA (Cart.svg) */
export function CartIcon({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} style={style} aria-hidden="true">
      <path d="M6.875 17.5C7.56536 17.5 8.125 16.9404 8.125 16.25C8.125 15.5596 7.56536 15 6.875 15C6.18464 15 5.625 15.5596 5.625 16.25C5.625 16.9404 6.18464 17.5 6.875 17.5Z" fill="currentColor" />
      <path d="M15.625 17.5C16.3154 17.5 16.875 16.9404 16.875 16.25C16.875 15.5596 16.3154 15 15.625 15C14.9346 15 14.375 15.5596 14.375 16.25C14.375 16.9404 14.9346 17.5 15.625 17.5Z" fill="currentColor" />
      <path d="M17.8438 4.71797C17.7559 4.61057 17.6453 4.52406 17.5199 4.46474C17.3945 4.40542 17.2575 4.37476 17.1188 4.375H5.23008L4.99063 3.01641C4.96509 2.87169 4.88938 2.7406 4.7768 2.64616C4.66421 2.55172 4.52195 2.49997 4.375 2.5H1.875C1.70924 2.5 1.55027 2.56585 1.43306 2.68306C1.31585 2.80027 1.25 2.95924 1.25 3.125C1.25 3.29076 1.31585 3.44973 1.43306 3.56694C1.55027 3.68415 1.70924 3.75 1.875 3.75H3.85078L5.63438 13.8586C5.65991 14.0033 5.73562 14.1344 5.8482 14.2288C5.96079 14.3233 6.10305 14.375 6.25 14.375H16.25C16.4158 14.375 16.5747 14.3092 16.6919 14.1919C16.8092 14.0747 16.875 13.9158 16.875 13.75C16.875 13.5842 16.8092 13.4253 16.6919 13.3081C16.5747 13.1908 16.4158 13.125 16.25 13.125H6.77422L6.55391 11.875H15.9938C16.2105 11.8747 16.4205 11.7996 16.5882 11.6623C16.7559 11.525 16.871 11.3339 16.9141 11.1215L18.0391 5.49648C18.0662 5.36035 18.0627 5.2199 18.0289 5.08527C17.9952 4.95064 17.9319 4.82518 17.8438 4.71797Z" fill="currentColor" />
    </svg>
  )
}
