import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { UsersContent } from "./UsersContent";

export default async function UsersPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/lg/en");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();

  if (!profile?.is_admin) redirect("/");

  // Expire overdue verifications
  await supabase.rpc("expire_verifications");

  const { data: users, error } = await supabase
    .from("profiles")
    .select("id, user_id, email, first_name, last_name, profile_image_url, is_admin, is_verified, verified_until, is_banned, auth_provider, current_coins, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return <p>Error loading users: {error.message}</p>;
  }

  return <UsersContent users={users ?? []} />;
}
