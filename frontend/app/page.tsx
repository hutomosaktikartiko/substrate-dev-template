import Link from "next/link"

export default function Page () {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Selamat datang di Aplikasi</h1>
      <p className="text-lg mb-4">Temukan data yang kamu butuhkan dengan mudah.</p>
      <div className="flex gap-4">
        <Link href="/connect" className="btn btn-primary">
          Connect
        </Link>
      </div>
    </div>
  )
}
