import { ArrowUpRight } from 'lucide-react'

type ResourceLinkProps = {
  label: string
  url: string | null
  accessibleName?: string
  showArrow?: boolean
}

export function ResourceLink({ label, url, accessibleName, showArrow }: ResourceLinkProps) {
  const arrow = (showArrow ?? /^(https?:)?\/\//i.test(url ?? '')) && (
    <ArrowUpRight size={13} aria-hidden="true" />
  )
  if (!url) {
    return (
      <span className="pending-link" role="link" aria-disabled="true"
        aria-label={accessibleName ?? label}>
        {label}{arrow}
      </span>
    )
  }

  return (
    <a className="resource-link" href={url} aria-label={accessibleName}>
      {label}
      {arrow}
    </a>
  )
}
