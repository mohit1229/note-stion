"use client"

import { useEffect } from "react"
import { useNotesStore } from "@/lib/store"
import NoteSidebar from "@/components/note-sidebar"
import NoteEditor from "@/components/note-editor"
import AIChat from "@/components/ai-chat"

export default function Home() {
  const { notes, activeNoteId, setActiveNote, initializeNotes } = useNotesStore()

  useEffect(() => {
    initializeNotes()
    // Set the first note as active if there's no active note
    if (notes.length > 0 && !activeNoteId) {
      setActiveNote(notes[0].id)
    }
  }, [notes.length, activeNoteId, initializeNotes, setActiveNote])

  const activeNote = useNotesStore(state => 
    state.notes.find(note => note.id === state.activeNoteId) || state.notes[0]
  );
  
  return (
    <div className="flex h-screen bg-white bg-gradient-to-br dark:from-zinc-950 dark:to-neutral-800">
      <NoteSidebar />
      <main className="flex-1 overflow-auto">
        {activeNote ? (
          <div className="relative h-full">
            <NoteEditor note={activeNote} />
            <AIChat noteId={activeNote.id} />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
            Select a note or create a new one
          </div>
        )}
      </main>
    </div>
  )
}
