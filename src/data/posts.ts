export type Post = {
  slug: string
  title: string
  date: string // ISO calendar date, e.g. YYYY-MM-DD.
  description: string
  url?: string
}

export const posts: Post[] = []
