import { redirect } from 'next/navigation';

// The portal has no separate login — all roles authenticate via /auth/login,
// which then routes each user to their role-appropriate home.
export default function PortalLoginRedirect() {
  redirect('/auth/login');
}
