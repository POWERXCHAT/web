import { Sidebar } from "./widgets/sidebar/Sidebar";
import { StatCard } from "./widgets/StatCard";

interface DashboardContentProps {
  name: string;
  email: string;
  avatar: string | null;
  totalUsers: number;
  totalPosts: number;
  totalLives: number;
}

export function DashboardContent({ name, email, avatar, totalUsers, totalPosts, totalLives }: DashboardContentProps) {
  return (
    <div className="admin-page">
      <Sidebar />

      <main className="admin-main">
        <div className="admin-header">
          <div className="admin-greeting">
            <h1>Welcome, {name}</h1>
            <p>{email}</p>
          </div>
          <div className="admin-profile">
            {avatar ? (
              <img src={avatar} alt="" className="admin-avatar-img" />
            ) : (
              <div className="admin-avatar">
                {name.split(" ").map((n) => n[0]).join("").toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className="admin-stats">
          <StatCard
            label="Total Users"
            value={totalUsers.toLocaleString()}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            label="Posts"
            value={totalPosts.toLocaleString()}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            }
          />
          <StatCard
            label="Live Streams"
            value={totalLives.toLocaleString()}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
              </svg>
            }
          />
        </div>
      </main>
    </div>
  );
}
