import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .limit(1);

  return (
    <main className="min-h-screen flex items-center justify-center text-white">
      <pre className="text-sm">
        {JSON.stringify({ data, error }, null, 2)}
      </pre>
    </main>
  );
}