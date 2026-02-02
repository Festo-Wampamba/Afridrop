

import PageHeader from '@/components/common/PageHeader';
import { BLOG_POSTS } from '@/data/blogPosts';
import Image from 'next/image';
import Link from 'next/link';

// Helper function to safely get params (Next.js 15+ handling if needed, but works for standard)
export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = parseInt(id);
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) {
    return (
      <main className="min-h-screen">
        <PageHeader title="Post Not Found" subtitle="The article you are looking for does not exist." />
        <div className="container mx-auto px-4 py-20 text-center">
          <Link href="/blog" className="text-[#009FCE] underline hover:text-[#00477A]">
            Return to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageHeader 
        title={post.title}
        subtitle={`${post.date} • ${post.category}`}
        backgroundImage={post.image}
      />

      <article className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Featured Image */}
          <div className="relative w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden shadow-lg">
             <Image 
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
             />
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none prose-headings:text-[#00477A] prose-a:text-[#009FCE]">
             <div dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }} />
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-slate-200">
             <p className="font-semibold text-slate-700">Written by {post.author}</p>
          </div>

          {/* Navigation */}
          <div className="mt-8">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-[#009FCE] font-medium hover:text-[#00477A] transition-colors"
            >
              ← Back to All Articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
