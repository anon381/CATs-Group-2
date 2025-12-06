"use client"

import { useEffect, useState } from "react"

export type NavItem = {
  label: string
  href: string
}

type SidebarNavProps = {
  items: NavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const [active, setActive] = useState<string>(items[0]?.href ?? "")

  useEffect(() => {
    const setFromHash = () => {
      if (typeof window === "undefined") return
      const hash = window.location.hash || items[0]?.href || ""
      if (hash) setActive(hash)
    }

    setFromHash()
    window.addEventListener("hashchange", setFromHash)
    return () => window.removeEventListener("hashchange", setFromHash)
  }, [items])

  return (
    <nav className="space-y-2 text-sm">
      {items.map((item) => {
        const isActive = active === item.href
        return (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setActive(item.href)}
            className={`flex items-center gap-2 rounded-xl border px-3 py-2 font-semibold transition focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 ${
              isActive
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-100"
            }`}
          >
            <span className="text-[10px]">•</span>
            <span>{item.label}</span>
          </a>
        )
      })}
    </nav>
  )
}
