interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}

export function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="admin-stat-card">
      <div className="admin-stat-card-header">
        <div className="admin-stat-icon">{icon}</div>
      </div>
      <p className="admin-stat-label">{label}</p>
      <p className="admin-stat-value">{value}</p>
    </div>
  );
}
