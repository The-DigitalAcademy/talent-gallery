import Link from "next/link";

export default function Page() {
    return (
        <div>
            <h1 className="text-2xl ml-10 mt-10 mb-5 font-semibold">Cohort Selection</h1>
            <div className="ml-10 flex flex-col text-blue-600">
                <Link href="/">Home</Link>
                <Link href="/talent/thabo-mokoena">Talent Profile</Link>
            </div>
        </div>
    )
}
