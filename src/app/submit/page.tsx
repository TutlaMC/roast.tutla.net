"use client"
import { useState } from "react"
import ChooseRoast from "@/components/chooseRoast"
import { X } from "lucide-react"

export default function SubmitPage() {
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [author, setAuthorName] = useState("")
  const [taggedRoasts, setTaggedRoasts] = useState<string[]>([])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content,
        description,
        authorName: author,
        taggedRoastIds: taggedRoasts,
      }),
    })
    const json = await res.json()
    console.log(json)
  }
   
  const handleSelect = (id: string) => {
    if (!taggedRoasts.includes(id)) {
      setTaggedRoasts(prev => [...prev, id])
    }
  }

  const handleRemove = (id: string) => {
    setTaggedRoasts(prev => prev.filter(x => x !== id))
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-950 p-4">
      <form
        onSubmit={submit}
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800">Submit a Roast</h1>

        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your mom so fat..."
          className="border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="This should be used in a scenario where..."
          className="border border-gray-300 rounded-lg px-3 py-2 min-h-[100px] text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />

        <input
          value={author}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="ToolaEmSee"
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
        />

        <div className="flex flex-col gap-2">
          <ChooseRoast onSelect={handleSelect} />
          {taggedRoasts.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {taggedRoasts.map(id => (
                <div
                  key={id}
                  className="flex items-center gap-1 text-black border border-gray-300 px-2 py-1 rounded-lg text-sm"
                >
                  <span>{id}</span>
                  <button
                    type="button"
                    className="text-red-500 font-bold hover:text-red-600"
                    onClick={() => handleRemove(id)}
                  >
                    <X></X>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  )
}
