import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, desc, isNull, like } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import BlogForm from '@/components/admin/BlogForm';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  const existing = await db.query.blogPosts.findFirst({
    where: eq(blogPosts.slug, baseSlug),
  });
  if (!existing) return baseSlug;

  const similar = await db.query.blogPosts.findMany({
    where: like(blogPosts.slug, `${baseSlug}%`),
    columns: { slug: true },
  });
  const slugSet = new Set(similar.map((s) => s.slug));
  let counter = 2;
  while (slugSet.has(`${baseSlug}-${counter}`)) counter++;
  return `${baseSlug}-${counter}`;
}

async function createPost(_prevState: unknown, formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) return { error: 'Unauthorized' };

  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const status = formData.get('status') as string;
  const featuredImageUrl = formData.get('featuredImageUrl') as string;

  const slug = await generateUniqueSlug(slugify(title));

  await db.insert(blogPosts).values({
    title,
    slug,
    content,
    excerpt: excerpt || null,
    featuredImageUrl: featuredImageUrl || null,
    status: status || 'draft',
    authorId: session.user.id,
    publishedAt: status === 'published' ? new Date() : null,
  });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

async function updatePost(_prevState: unknown, formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) return { error: 'Unauthorized' };

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const status = formData.get('status') as string;
  const featuredImageUrl = formData.get('featuredImageUrl') as string;

  const current = await db.query.blogPosts.findFirst({ where: eq(blogPosts.id, id) });
  let slug = current?.slug ?? slugify(title);
  if (current && slugify(title) !== current.slug) {
    slug = await generateUniqueSlug(slugify(title));
  }

  await db.update(blogPosts).set({
    title,
    slug,
    content,
    excerpt: excerpt || null,
    featuredImageUrl: featuredImageUrl || null,
    status,
    publishedAt: status === 'published' ? new Date() : null,
    updatedAt: new Date(),
  }).where(eq(blogPosts.id, id));
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
  redirect('/admin/blog');
}

async function deletePost(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  await db.update(blogPosts).set({ deletedAt: new Date() }).where(eq(blogPosts.id, id));
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; edit?: string }>;
}) {
  const params = await searchParams;
  const showCreate = params.action === 'create';
  const editId = params.edit;

  const allPosts = await db.query.blogPosts.findMany({
    where: isNull(blogPosts.deletedAt),
    with: { author: true },
    orderBy: desc(blogPosts.createdAt),
  });

  const editPost = editId ? allPosts.find((p) => p.id === editId) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-500 text-sm mt-1">{allPosts.length} posts</p>
        </div>
        {!showCreate && !editPost && (
          <Link href="/admin/blog?action=create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            + New Post
          </Link>
        )}
      </div>

      {(showCreate || editPost) && (
        <BlogForm
          action={editPost ? updatePost : createPost}
          editPost={editPost ? {
            id: editPost.id,
            title: editPost.title,
            excerpt: editPost.excerpt,
            content: editPost.content,
            featuredImageUrl: editPost.featuredImageUrl,
            status: editPost.status,
          } : null}
        />
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Views</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  {post.featuredImageUrl ? (
                    <img src={post.featuredImageUrl} alt="" className="h-10 w-14 object-cover rounded" />
                  ) : (
                    <div className="h-10 w-14 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">No img</div>
                  )}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{post.author ? `${post.author.firstName} ${post.author.lastName}` : 'Unknown'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' :
                    post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.viewsCount}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/blog?edit=${post.id}`} className="text-sm text-blue-600 hover:text-blue-800">Edit</Link>
                    <form action={deletePost}>
                      <input type="hidden" name="id" value={post.id} />
                      <button type="submit" className="text-sm text-red-600 hover:text-red-800">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allPosts.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-12 text-center text-gray-500">No blog posts yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
