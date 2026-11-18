export type Project = {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl: string | null
  blogUrl?: string
  placeholder?: boolean
  liveUrl?: string
}

export const projects: Project[] = [
  {
    id: 'project-01',
    title: 'Project 01',
    description: 'Packed edges speed up graph scans but make inserts costly.',
    technologies: ['Python', 'C++', 'CSR Graphs', 'Spatial Indexing'],
    placeholder: true,
    githubUrl: null,
  },
  {
    id: 'project-02',
    title: 'Project 02',
    description: 'Larger batches trade data freshness for write throughput.',
    technologies: ['Kafka', 'Spark', 'Parquet'],
    placeholder: true,
    githubUrl: null,
  },
  {
    id: 'project-03',
    title: 'Project 03',
    description: 'Caching drops repeat reads at the cost of stale results.',
    technologies: ['Read-through Cache', 'TTL', 'Cache Invalidation'],
    placeholder: true,
    githubUrl: null,
  },
]
