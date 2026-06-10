import Link from "next/link"
import { LayoutDashboard, ShoppingBag, Package, FolderKanban, FileText, Settings, Contact, ArrowLeft, ClipboardList, MessagesSquare, Globe, ScrollText, ShieldCheck } from "lucide-react"
import { auth, getSession } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()

  if (!session?.user) {
    redirect("/auth/login")
  }

  // Check role
  if (session.user.role !== 'super_admin') {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0">
        <div className="p-6 border-b border-gray-800">
          <h1 className="text-xl font-bold tracking-tight">Afridrop Admin</h1>
          <p className="text-xs text-gray-400 mt-1">Super Admin Dashboard</p>
        </div>
        
        <nav className="p-4 space-y-1">
          {/* System group */}
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors">
            <LayoutDashboard size={20} />
            <span>Overview</span>
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <ShieldCheck size={20} />
            <span>Users &amp; Roles</span>
          </Link>
          <Link href="/admin/audit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <ScrollText size={20} />
            <span>Audit Logs</span>
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Settings size={20} />
            <span>System Settings</span>
          </Link>

          {/* All Data group */}
          <p className="px-4 pt-5 pb-1 text-xs font-semibold uppercase tracking-wider text-gray-500">All Data</p>
          <Link href="/admin/clients" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Contact size={20} />
            <span>Clients</span>
          </Link>
          <Link href="/admin/jobs" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <ClipboardList size={20} />
            <span>Service Requests</span>
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <ShoppingBag size={20} />
            <span>Orders</span>
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <Package size={20} />
            <span>Products</span>
          </Link>
          <Link href="/admin/projects" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <FolderKanban size={20} />
            <span>Projects</span>
          </Link>
          <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <FileText size={20} />
            <span>Blog</span>
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
            <MessagesSquare size={20} />
            <span>Messages</span>
          </Link>
        </nav>
        
        <div className="p-4 mt-auto border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 mb-1 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors">
            <Globe size={18} />
            <span className="text-sm">Back to Website</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
              {session.user.name?.[0] || 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{session.user.name}</p>
              <p className="text-xs text-gray-400 truncate">{session.user.email}</p>
            </div>
          </div>
          <form action={async () => {
             'use server';
             await auth.api.signOut({ headers: await headers() });
             redirect('/auth/login');
          }}>
             <button type="submit" className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft size={16} />
                Sign Out
             </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
