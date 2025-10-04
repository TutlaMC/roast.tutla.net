import { notFound } from "next/navigation"

export default async function Page({ params }: any) {
  const { id } = params

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/fetch?id=${encodeURIComponent(id)}`, { cache: "no-store" })
  if (!res.ok) return notFound()

  const data = await res.json()
  console.log(data);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900 text-white p-6">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-4xl font-bold">Tutla&apos;s RoastDB</h1>
        <p className="text-gray-400 text-lg">Search, submit and steal roasts!</p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 w-full max-w-2xl shadow-xl backdrop-blur space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-blue-400">
            {data.content}
          </h2>
        </div>

        <div className="space-y-3">

          {data.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-1">Description</h3>
              <p className="bg-gray-900 rounded-xl px-4 py-3 border border-gray-800 text-gray-300">
                {data.description}
              </p>
            </div>
          )}

          {data.taggedBy && data.taggedBy.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Comebacks
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.taggedBy.map((t: any) => (
                  <a
                    key={t.id}
                    href={`/roast/${t.id}`}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 shadow-md backdrop-blur text-sm text-gray-200 hover:border-blue-500 hover:text-blue-400 transition"
                  >
                    {t.content}
                  </a>
                ))}
              </div>
            </div>
          )}

          {data.taggedRoasts && data.taggedRoasts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                It is a comeback to
              </h3>
              <div className="flex flex-wrap gap-3">
                {data.taggedRoasts.map((t: any) => (
                  <a
                    key={t.id}
                    href={`/roast/${t.id}`}
                    className="bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-2 shadow-md backdrop-blur text-sm text-gray-200 hover:border-blue-500 hover:text-blue-400 transition"
                  >
                    {t.content}
                  </a>
                ))}
              </div>
            </div>
          )}

          

          {data.authorName && (
            <div className="flex items-center pt-4 border-t border-gray-800">
              <span className="text-gray-400 text-sm mx-1">Submitted by</span>
              <span className="text-white font-medium">{data.authorName}</span>
            </div>
          )}
          

        </div>
      </div>
    </div>
  )

}
