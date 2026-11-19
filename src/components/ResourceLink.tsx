import { ArrowUpRight } from 'lucide-react'

type ResourceLinkProps = {
  label: string
  url: string | null
  accessibleName?: string
  showArrow?: boolean
  animateArrow?: boolean
}

export function ResourceLink({ label, url, accessibleName, showArrow, animateArrow }: ResourceLinkProps) {
  const motionClass = animateArrow ? ' link-arrow-motion' : ''
  const arrow = (showArrow ?? /^(https?:)?\/\//i.test(url ?? '')) && (
    <ArrowUpRight className="link-arrow" size={13} aria-hidden="true" />
  )
  if (!url) {
    return (
      <span className={`pending-link${motionClass}`} role="link" aria-disabled="true"
        aria-label={accessibleName ?? label}>
        {label}{arrow}
      </span>
    )
  }

  return (
    <a className={`resource-link${motionClass}`} href={url} aria-label={accessibleName}>
      {label}
      {arrow}
    </a>
  )
}
