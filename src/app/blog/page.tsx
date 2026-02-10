import PageHeader from '@/components/common/PageHeader';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, isNull, desc, and } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';

export default async function BlogPage() {
  // Fetch published posts from the database
  const posts = await db.query.blogPosts.findMany({
    where: and(
      isNull(blogPosts.deletedAt),
      eq(blogPosts.status, 'published'),
    ),
    with: { author: true },
    orderBy: desc(blogPosts.publishedAt),
  });

  return (
    <main>
      <PageHeader 
        title="Our Blog"
        subtitle="Expert tips, industry insights, and the latest pool care advice"
      />

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No blog posts published yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:shadow-xl transition-shadow group">
                  <div className="relative h-56 overflow-hidden">
                    {post.featuredImageUrl ? (
                      <Image 
                        src={post.featuredImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#009FCE] to-[#00477A] flex items-center justify-center">
                        <span className="text-white text-4xl font-bold opacity-30">{post.title[0]}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                      <span>
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                          : 'Unpublished'}
                      </span>
                      <span>•</span>
                      <span>{post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Afridrop Team'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#00477A] mb-3 group-hover:text-[#009FCE] transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 mb-4 leading-relaxed">
                      {post.excerpt || post.content.substring(0, 120) + '...'}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-[#009FCE] font-medium hover:text-[#00477A] transition-colors inline-flex items-center gap-2"
                    >
                      Read More 
                      <span>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-[#009FCE] to-[#00477A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-xl mb-8 opacity-90">Get the latest pool tips, industry news, and special offers delivered to your inbox</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-6 py-4 rounded-lg text-slate-800 placeholder:text-slate-500 bg-white border-2 border-transparent focus:border-[#d4eaf7] focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="bg-white text-[#009FCE] px-8 py-4 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
