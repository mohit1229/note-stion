"use client"

import { useState } from "react"
import { useNotesStore } from "@/lib/store"
import { PlusCircle, File, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function NoteSidebar() {
  const { notes, activeNoteId, setActiveNote, createNote } = useNotesStore()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const handleCreateNote = () => {
    const newNoteId = createNote()
    setActiveNote(newNoteId)
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>

      {/* Sidebar */}
      <div
        className={`bg-zinc-50 dark:bg-zinc-950 border-r border-zinc-200 dark:border-zinc-800 w-64 flex-shrink-0 flex flex-col h-full transition-all duration-300 ease-in-out
          ${isMobileSidebarOpen ? "fixed inset-y-0 left-0 z-40" : "fixed -left-64 md:left-0 md:relative"} z-30`}
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-semibold text-zinc-800 dark:text-white">Note-stion</h1>
        </div>
<div className="w-full p-2">
  
<Button variant="outline" className="flex items-center justify-center w-full" onClick={handleCreateNote}>
              <PlusCircle size={16} className="mr-2" />
              New Note
            </Button>
</div>
        <div className="flex-1 overflow-y-auto p-2">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`flex items-center p-2 rounded-md cursor-pointer mb-1 ${
                activeNoteId === note.id
                  ? "bg-zinc-200 dark:bg-zinc-900"
                  : "hover:bg-zinc-100 dark:hover:bg-zinc-900/50"
              }`}
              onClick={() => setActiveNote(note.id)}
            >
              <File size={16} className="mr-2 text-zinc-800 dark:text-zinc-200" />
              <span className="text-sm truncate dark:text-zinc-100">{note.title || "Untitled"}</span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  )
}
