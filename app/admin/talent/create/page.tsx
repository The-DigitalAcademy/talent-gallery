import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1 className="text-2xl ml-10 mt-10 mb-5 font-semibold">Create Talent Profile</h1>
            <div className="ml-10 flex flex-col text-blue-600">
                <Link href="/admin/talent/thabo-mokoena">Edit Talent Profile</Link>
                <Link href="/admin/talent">All Talent Profiles</Link>
            </div>
        </div>
    )
}
