import Link from "next/link"

export default function ConnectPage () {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="flex gap-4">
                <Link href="/dashboard" className="btn btn-primary">
                    Connect
                </Link>
            </div>
        </div>
    )
}
