'use client';

import { useActionState } from 'react';
import ImageUpload from '@/components/admin/ImageUpload';
import Link from 'next/link';

interface BlogFormProps {
  action: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | void>;
  editPost?: {
    id: string;
    title: string;
    excerpt: string | null;
    content: string;
    featuredImageUrl: string | null;
    status: string | null;
  } | null;
}

export default function BlogForm({ action, editPost }: BlogFormProps) {
  const [state, formAction, pending] = useActionState(action, null);

  return (
    <div className="bg-white rounded-xl border p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">{editPost ? 'Edit Post' : 'Create New Post'}</h3>
      <form action={formAction} className="space-y-4">
        {editPost && <input type="hidden" name="id" value={editPost.id} />}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input name="title" defaultValue={editPost?.title} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
          <input name="excerpt" defaultValue={editPost?.excerpt ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Short summary of the post..." />
        </div>

        <ImageUpload
          name="featuredImageUrl"
          defaultValue={editPost?.featuredImageUrl ?? ''}
          label="Featured Image"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea name="content" defaultValue={editPost?.content} required rows={10} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" defaultValue={editPost?.status ?? 'draft'} className="w-full px-3 py-2 border rounded-lg text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {state && 'error' in state && state.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={pending} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50">
            {pending ? 'Saving...' : editPost ? 'Update Post' : 'Create Post'}
          </button>
          <Link href="/admin/blog" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
