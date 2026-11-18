import { posts } from '../data/posts'

const dateFormat = new Intl.DateTimeFormat('en', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

export function Writing() {
  return (
    <section className="document-section" aria-labelledby="writing-title">
      <h2 id="writing-title">Writing</h2>
      {posts.length === 0 ? (
        <p className="writing-note">
          Occasional notes on engineering, things I'm learning, and ideas worth remembering.{' '}
          <span>Nothing published yet.</span>
        </p>
      ) : (
        <ul className="entry-list">
          {posts.map((post) => (
            <li className="post-entry" key={post.slug} id={`post-${post.slug}`}>
              <h3>
                {post.url ? <a className="resource-link" href={post.url}>{post.title}</a> : post.title}
              </h3>
              <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
              <p className="entry-description">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
