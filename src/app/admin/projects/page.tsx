import { db } from '@/db';
import { projects, projectTags } from '@/db/schema';
import { eq, desc, isNull } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import Link from 'next/link';

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function createProject(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const clientName = formData.get('clientName') as string;
  const location = formData.get('location') as string;
  const status = formData.get('status') as string;

  await db.insert(projects).values({
    title, slug: slugify(title),
    description: description || null,
    clientName: clientName || null,
    location: location || null,
    status: status || 'planned',
    createdBy: session.user.id,
  });
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

async function updateProject(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const clientName = formData.get('clientName') as string;
  const location = formData.get('location') as string;
  const status = formData.get('status') as string;

  await db.update(projects).set({
    title, slug: slugify(title),
    description: description || null,
    clientName: clientName || null,
    location: location || null,
    status,
    updatedAt: new Date(),
  }).where(eq(projects.id, id));
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

async function deleteProject(formData: FormData) {
  'use server';
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const id = formData.get('id') as string;
  await db.update(projects).set({ deletedAt: new Date() }).where(eq(projects.id, id));
  revalidatePath('/admin/projects');
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; edit?: string }>;
}) {
  const params = await searchParams;
  const showCreate = params.action === 'create';
  const editId = params.edit;

  const allProjects = await db.select().from(projects).where(isNull(projects.deletedAt)).orderBy(desc(projects.createdAt));
  const editProject = editId ? allProjects.find((p) => p.id === editId) : null;

  const statusColors: Record<string, string> = {
    planned: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects Management</h2>
          <p className="text-gray-500 text-sm mt-1">{allProjects.length} projects</p>
        </div>
        {!showCreate && !editProject && (
          <Link href="/admin/projects?action=create" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
            + New Project
          </Link>
        )}
      </div>

      {(showCreate || editProject) && (
        <div className="bg-white rounded-xl border p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">{editProject ? 'Edit Project' : 'Add New Project'}</h3>
          <form action={editProject ? updateProject : createProject} className="space-y-4">
            {editProject && <input type="hidden" name="id" value={editProject.id} />}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                <input name="title" defaultValue={editProject?.title} required className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input name="clientName" defaultValue={editProject?.clientName ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input name="location" defaultValue={editProject?.location ?? ''} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select name="status" defaultValue={editProject?.status ?? 'planned'} className="w-full px-3 py-2 border rounded-lg text-sm">
                  <option value="planned">Planned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" defaultValue={editProject?.description ?? ''} rows={4} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                {editProject ? 'Update Project' : 'Create Project'}
              </button>
              <Link href="/admin/projects" className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition">Cancel</Link>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Project</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Created</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {allProjects.map((project) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{project.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.clientName || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{project.location || '—'}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status ?? 'planned'] || 'bg-gray-100 text-gray-800'}`}>
                    {project.status?.replace('_', ' ')}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'N/A'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/projects?edit=${project.id}`} className="text-sm text-blue-600 hover:text-blue-800">Edit</Link>
                    <form action={deleteProject}>
                      <input type="hidden" name="id" value={project.id} />
                      <button type="submit" className="text-sm text-red-600 hover:text-red-800">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {allProjects.length === 0 && (
              <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-500">No projects yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
