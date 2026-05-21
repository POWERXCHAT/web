import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("user_id", user.id)
    .single();
  if (!profile?.is_admin) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { user_id } = await req.json();
  if (!user_id) return NextResponse.json({ error: "Missing user_id" }, { status: 400 });

  // Delete all user data via the database function
  const { error: dbError } = await supabase.rpc("admin_delete_user", { target_user_id: user_id });
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  // Delete the auth user via admin API (triggers cascade cleanup)
  const adminClient = createAdminClient();
  const { error: authError } = await adminClient.auth.admin.deleteUser(user_id);
  if (authError) return NextResponse.json({ error: authError.message }, { status: 500 });

  return NextResponse.json({ success: true });
}