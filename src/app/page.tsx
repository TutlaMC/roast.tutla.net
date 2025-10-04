"use client"

import Roast from "@/components/Roast";
import { Flame } from "lucide-react";
import { useState, useEffect } from "react";

type Roast = {
  id: number;
  content: string;
  description?: string | null;
  authorName: string;
};

export default function Home() {
  const [results, setResults] = useState<Roast[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {

    const searchRoasts = async () => {
      try {
        
        const res = await fetch(`/api/roasts?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        console.log(data);
        setResults(data);
      } catch (err) {
        console.error(err);
      }
    };

    searchRoasts();
  }, [query]);

  return (
    <div className="h-screen flex flex-col">
      <div className="h-1/2 flex flex-col justify-center items-center space-y-2">
        <h1 className="text-3xl">Tutla's RoastDB</h1>
        <p className="mb-8">Search, submit and steal roasts!</p>
        <div className="relative">
          <Flame className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
          <input
            className="w-[50vw] pl-10 pr-4 py-2 rounded-xl bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roasts..."
          />
        </div>
      </div>

      <div className="flex-1 p-12 bg-gradient-to-br from-gray-50 to-gray-200">
        <div className="flex w-full items-center justify-center mb-2">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 w-full max-w-2xl shadow-xl backdrop-blur space-y-4">
            Want to submit a roast to the DB? <a className="font-bold text-blue-500" href="/submit">Click here!</a>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((r) => (
            <Roast r={r} link={true}></Roast>
          ))}
        </div>
      </div>

    </div>
  );
}
