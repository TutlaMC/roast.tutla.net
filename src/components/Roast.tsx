"use client"

import { useState, useEffect, useRef } from "react";
export default function Roast({ r, link=false }: {r: any, link: boolean}) {

  return (
    <a
    key={r.id}
    href={link ? `/roast/${r.id}` : ''}
    target="_blank"
    className="group bg-white border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-500 transition duration-200 flex flex-col gap-2"
    >
        <p className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-2">
            {r.content}
        </p>
        {r.description && (
            <p className="text-sm text-gray-500 line-clamp-3">
                {r.description}
            </p>
        )}
    </a>
  )
}
