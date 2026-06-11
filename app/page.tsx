import Link from "next/link";
import { createClient } from "./lib/supabase/server";
import { Button } from '@base-ui/react/button'

export default async function Home() {
  const supabase = await createClient();

  // 🔍 SCHEMA SCANNER: This inspects the actual database columns on the fly
  const { data: schemaData, error: schemaError } = await supabase
    .from("talents")
    .select("*")
    .limit(1);

  if (!schemaError && schemaData && schemaData.length > 0) {
    console.log("============== ACTUAL TALENTS TABLE COLUMNS ==============");
    console.log(Object.keys(schemaData[0]));
    console.log("=========================================================");
  } else {
    console.log("Schema scan error or table empty:", schemaError);
  }

  // Your existing working queries
  const { data: cohorts, error: cohortsError } = await supabase.from("cohorts").select("id, name, slug")
  const { data: talents, error: talentsError } = await supabase.from("talents").select("id, fullname, slug")
  const { data: locations, error: locationsError } = await supabase.from("locations").select("id, city, country")
  const { data: programs, error: programsError } = await supabase.from("programs").select("id, name")
  const { data: capabilities, error: capabilitiesError } = await supabase.from("capabilities").select("id, name")

  return (
    <div>
      <h1 className="text-2xl ml-10 mt-10 mb-5 font-semibold">Home (Debug Mode)</h1>
      <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 mx-10 my-4 rounded-xl text-xs font-mono">
        💡 Check your terminal logs! The exact array of available keys for the <strong>talents</strong> table is being printed right now.
      </div>
      
      <div className="ml-10 flex gap-15">
        <div>
          <h2 className="text-xl">Talents</h2>
          {talents?.map(i => <Link className="text-gray-500 underline block" key={i.id} href={`/talent/${i.slug}`}>{i.fullname}</Link>)}
        </div>
        <div>
          <h2 className="text-xl">Cohorts</h2>
          {cohorts?.map(i => <Link className="text-gray-500 underline block" key={i.id} href={`/cohort/${i.slug}`}>{i.name}</Link>)}
        </div>
        <div>
          <h2 className="text-xl">Locations</h2>
          {locations?.map(i => <Link className="text-gray-500 block" key={i.id} href="#">{i.city}</Link>)}
        </div>
        <div>
          <h2 className="text-xl">Programs</h2>
          {programs?.map(i => <Link className="text-gray-500 block" key={i.id} href="#">{i.name}</Link>)}
        </div>
        <div>
          <h2 className="text-xl">Capabilities</h2>
          {capabilities?.map(i => <Link className="text-gray-500 block" key={i.id} href="#">{i.name}</Link>)}
        </div>
      </div>
    </div>
  );
}