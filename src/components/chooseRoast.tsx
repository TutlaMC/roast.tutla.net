"use client"

import { useState, useEffect, useRef } from "react"

type Dict = Record<string, string>

interface Props {
  onSelect: (id: string) => void;
  className?: string;
}

export default function ChooseRoast({ onSelect, className="" }: Props) {
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<Dict>({})
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.trim() === "") {
      setData({})
      return
    }

    const fetchRoasts = async () => {
      try {
        const res = await fetch(`/api/roasts?q=${encodeURIComponent(query)}`)
        const roasts = await res.json()
        const dict: Dict = {}
        roasts.forEach((r: any) => {
          dict[r.content] = r.id
        })
        setData(dict)
      } catch (err) {
        console.error(err)
      }
    }

    fetchRoasts()
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (name: string, id: string) => {
    setQuery(name)
    setOpen(false)
    onSelect(id)
  }

  return (
    <div className="relative w-64" ref={containerRef}>
      <input
        type="text"
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring text-black ${className}`}
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
      />
      {open && Object.keys(data).length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-lg ">
          {Object.entries(data).map(([name, id]) => (
            <li
              key={id}
              className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelect(name, id)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
