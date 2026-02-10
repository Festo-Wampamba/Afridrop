import { db } from '@/db';
import { users, orders, products, blogPosts, projects } from '@/db/schema';
import { count, isNull, eq } from 'drizzle-orm';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { Users, ShoppingBag, Package, FileText, FolderKanban, DollarSign } from 'lucide-react';

export default async function AdminDashboard() {
  const session = await auth();

  // Run all stat queries in parallel for faster load
  const [
    [userCount],
    [orderCount],
    [productCount],
    [postCount],
    [projectCount],
    [pendingOrders],
    recentUsers,
  ] = await Promise.all([
    db.select({ value: count() }).from(users).where(isNull(users.deletedAt)),
    db.select({ value: count() }).from(orders).where(isNull(orders.deletedAt)),
    db.select({ value: count() }).from(products).where(isNull(products.deletedAt)),
    db.select({ value: count() }).from(blogPosts).where(isNull(blogPosts.deletedAt)),
    db.select({ value: count() }).from(projects).where(isNull(projects.deletedAt)),
    db.select({ value: count() }).from(orders).where(eq(orders.status, 'pending')),
    db.query.users.findMany({
      where: isNull(users.deletedAt),
      orderBy: (users, { desc }) => [desc(users.createdAt)],
      limit: 5,
      with: { rolesUsers: { with: { role: true } } },
    }),
  ]);

  const stats = [
    { label: 'Total Users', value: userCount.value, icon: Users, href: '/admin/users', color: 'bg-blue-500' },
    { label: 'Orders', value: orderCount.value, icon: ShoppingBag, href: '/admin/orders', color: 'bg-green-500' },
    { label: 'Products', value: productCount.value, icon: Package, href: '/admin/products', color: 'bg-purple-500' },
    { label: 'Blog Posts', value: postCount.value, icon: FileText, href: '/admin/blog', color: 'bg-orange-500' },
    { label: 'Projects', value: projectCount.value, icon: FolderKanban, href: '/admin/projects', color: 'bg-indigo-500' },
    { label: 'Pending Orders', value: pendingOrders.value, icon: DollarSign, href: '/admin/orders', color: 'bg-yellow-500' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
        </h2>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s what&apos;s happening with your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="group">
            <div className="bg-white rounded-xl border p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Users */}
      <div className="bg-white rounded-xl border shadow-sm">
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Users</h3>
          <Link href="/admin/users" className="text-sm text-blue-600 hover:text-blue-800">View all →</Link>
        </div>
        <div className="divide-y">
          {recentUsers.map((user) => (
            <div key={user.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {user.firstName[0]}{user.lastName[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {user.rolesUsers[0]?.role.name || 'No role'}
                </span>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
          {recentUsers.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">No users yet</div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/admin/users?action=create" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-blue-50 hover:border-blue-200 transition">
            <Users size={20} className="text-blue-600" /> <span className="text-xs font-medium text-gray-700">Add User</span>
          </Link>
          <Link href="/admin/products?action=create" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-purple-50 hover:border-purple-200 transition">
            <Package size={20} className="text-purple-600" /> <span className="text-xs font-medium text-gray-700">Add Product</span>
          </Link>
          <Link href="/admin/blog?action=create" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-orange-50 hover:border-orange-200 transition">
            <FileText size={20} className="text-orange-600" /> <span className="text-xs font-medium text-gray-700">New Post</span>
          </Link>
          <Link href="/admin/projects?action=create" className="flex flex-col items-center gap-2 p-4 rounded-lg border hover:bg-indigo-50 hover:border-indigo-200 transition">
            <FolderKanban size={20} className="text-indigo-600" /> <span className="text-xs font-medium text-gray-700">New Project</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
