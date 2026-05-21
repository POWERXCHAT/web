import Link from "next/link";

export function AccessDenied() {
  return (
    <div className="admin-access-denied">
      <div className="admin-access-card">
        <div className="admin-access-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>
        <h1>Access Denied</h1>
        <p>You are not an admin. You do not have permission to access this page.</p>
        <p className="admin-access-hint">If you believe this is a mistake, please contact support.</p>
        <Link href="/" className="admin-access-btn">Go to Home</Link>
      </div>
    </div>
  );
}
