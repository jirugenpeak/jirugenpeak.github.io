import { ArrowUpRight } from 'lucide-react'

type ResourceLinkProps = {
  label: string
  url: string | null
  accessibleName?: string
  groupStatus?: boolean
  showArrow?: boolean
}

export function ResourceLink({ label, url, accessibleName, groupStatus = false, showArrow }: ResourceLinkProps) {
  const arrow = (showArrow ?? /^(https?:)?\/\//i.test(url ?? '')) && (
    <ArrowUpRight size={13} aria-hidden="true" />
  )
  if (!url) {
    return (
      <span className="pending-link" role="link" aria-disabled="true"
        aria-label={`${accessibleName ?? label} (pending)`} title={`${label} link pending`}>
        {label}{arrow}{!groupStatus && <small> (pending)</small>}
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
