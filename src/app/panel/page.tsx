"use client"

import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import ChooseRoast from "@/components/chooseRoast";

type RequestedRoast = {
  id: number;
  content: string;
  description?: string | null;
  authorName: string;
  createdAt: string;
  taggedRoasts: { id: number; content:string }[];
};

export default function RequestedRoastsPanel() {
  const [roasts, setRoasts] = useState<RequestedRoast[]>([]);
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState("");

  const fetchRoasts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/requested/fetch");
      const data = await res.json();
      console.log(data);
      setRoasts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoasts();
  }, []);

  const handleAction = async (id: number, action: "accept" | "reject") => {

    if (!secret) return alert("Secret not set!");

    try {
      const res = await fetch(`/api/requested/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, secret }),
      });

      if (!res.ok) {
        const errData = await res.json();
        return alert(errData.error || "Error");
      }

      fetchRoasts();
    } catch (err) {
      console.error(err);
      alert("Error performing action");
    }
  };

  const del = async (id: number) => {

    if (!secret) return alert("Secret not set!");

    try {
      const res = await fetch(`/api/delete/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, secret }),
      });

      if (!res.ok) {
        const errData = await res.json();
        return alert(errData.error || "Error");
      }

      fetchRoasts();
    } catch (err) {
      console.error(err);
      alert("Error in deleting");
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Roasts Panel</h1>
      <input onChange={(e) => {setSecret(e.target.value)}} placeholder="secret" type="password"></input>
      {loading && <p>Loading...</p>}
      {!loading && roasts.length === 0 && <p>No requested roasts</p>}

      <ul className="space-y-4">
        {roasts.map((r) => (
          <li
            key={r.id}
            className="border-white border-4 p-4 rounded-lg shadow flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div className="mb-2 md:mb-0">
              <p className="text-2xl font-bold font-mono">
                {r.content}
                <span className="text-gray-400 text-sm">
                  By <span className="border-b-2">{r.authorName}</span>
                </span>
              </p>
              {r.description && <p className="text-gray-400 mb-2 text-sm">({r.description})</p>}
              
              {r.taggedRoasts && (
                <p className="text-gray-400 text-sm">
                  <span>Comeback(s) to:</span>
                  <div className="m-2">{r.taggedRoasts.map((t) => (<a className="border-2 rounded-lg p-2" href={`/roast/${t.id}`} target="_blank">{t.content}</a>))}</div>
                </p>
              )}
              
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleAction(r.id, "accept")}
                className="flex items-center px-3 py-1 bg-green-500  rounded hover:bg-green-600"
              >
                <CheckCircle className="w-5 h-5 mr-1" /> Accept
              </button>
              <button
                onClick={() => handleAction(r.id, "reject")}
                className="flex items-center px-3 py-1 bg-red-500 rounded hover:bg-red-600"
              >
                <XCircle className="w-5 h-5 mr-1" /> Reject
              </button>
            </div>
          </li>
        ))}
        </ul>
        <h1 className="text-2xl font-bold my-6">Delete Roast</h1>
        <ChooseRoast onSelect={(id)=>{confirm("Are you sure you want to delete this roast?") ? del(Number(id)) : null}}></ChooseRoast>
    </div>
  )
}