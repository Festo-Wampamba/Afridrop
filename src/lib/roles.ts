// Single source of truth for where each role lands after login. Pure (no
// server imports) so both the client login page and server layouts can use it.
export function homeForRole(role?: string | null): string {
  switch (role) {
    case 'customer':
      return '/portal';
    case 'technician':
      return '/technician';
    case 'manager':
      return '/manager';
    case 'sales_manager':
      return '/sales';
    case 'accountant':
      return '/accounts';
    case 'receptionist':
      return '/reception';
    case 'director':
      return '/director';
    case 'super_admin':
      return '/admin';
    default:
      return '/';
  }
}
