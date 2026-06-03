import Link from "next/link";
import { createClient } from "./lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: cohorts, error } = await supabase.from("cohorts").select("id, name")

  return (
    <div>
      <h1 className="text-2xl ml-10 mt-10 mb-5 font-semibold">Home</h1>
      <div className="ml-10 flex flex-col text-blue-600">
        <Link href="/talent/thabo-mokoena">Talent Profile</Link>
        <div className="my-5 flex flex-col">
          {cohorts?.map(i => <Link href={`/cohort/${i.id}`}>{i.name}</Link>)}
        </div>

      </div>
    </div>
  );
}
