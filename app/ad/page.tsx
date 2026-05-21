import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardContent } from "./DashboardContent";
import { AccessDenied } from "./widgets/AccessDenied";
import "./admin.css";

export default async function AdminPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/lg/en");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, first_name, last_name, email, profile_image_url")
    .eq("user_id", user.id)
    .single();

  if (!profile?.is_admin) {
    return <AccessDenied />;
  }

  const [totalUsers, totalPosts, totalLives] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("posts").select("*", { count: "exact", head: true }),
    supabase.from("lives").select("*", { count: "exact", head: true }).eq("status", "live"),
  ]);

  return (
    <DashboardContent
      name={`${profile.first_name} ${profile.last_name}`}
      email={profile.email}
      avatar={profile.profile_image_url}
      totalUsers={totalUsers.count ?? 0}
      totalPosts={totalPosts.count ?? 0}
      totalLives={totalLives.count ?? 0}
    />
  );
}
