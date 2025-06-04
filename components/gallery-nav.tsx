"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Upload, Grid, LogOut } from "lucide-react"

const GalleryNav = () => {
  const [userName, setUserName] = useState<string>("")
  const [userType, setUserType] = useState<string>("")
  const pathname = usePathname()

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const storedName = localStorage.getItem("user_name")
    const storedType = localStorage.getItem("user_type")

    if (storedName) setUserName(storedName)
    if (storedType) setUserType(storedType)
  }, [])

  const isActive = (path: string) => {
    return pathname === path
  }

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl z-40 md:hidden">
      <div className="flex justify-around items-center p-3">
        <Link
          href="/"
          className={`flex flex-col items-center p-2 ${isActive("/") ? "text-pink-600" : "text-gray-500"}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Inicio</span>
        </Link>

        <Link
          href="/gallery"
          className={`flex flex-col items-center p-2 ${isActive("/gallery") ? "text-pink-600" : "text-gray-500"}`}
        >
          <Grid size={20} />
          <span className="text-xs mt-1">Galería</span>
        </Link>

        <Link
          href="/gallery/upload"
          className={`flex flex-col items-center p-2 ${isActive("/gallery/upload") ? "text-pink-600" : "text-gray-500"}`}
        >
          <Upload size={20} />
          <span className="text-xs mt-1">Subir</span>
        </Link>

        {userType === "admin" || userType === "host" ? (
          <Link
            href="/admin/dashboard"
            className={`flex flex-col items-center p-2 ${
              pathname.startsWith("/admin") ? "text-pink-600" : "text-gray-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 9h.01" />
              <path d="M15 9h.01" />
              <path d="M9 15h.01" />
              <path d="M15 15h.01" />
            </svg>
            <span className="text-xs mt-1">Admin</span>
          </Link>
        ) : (
          <button onClick={handleLogout} className="flex flex-col items-center p-2 text-gray-500">
            <LogOut size={20} />
            <span className="text-xs mt-1">Salir</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default GalleryNav
