import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface Note {
  id: string
  title: string
  content: string
  chatHistory: ChatMessage[]
}

interface NotesState {
  notes: Note[]
  activeNoteId: string | null
  setActiveNote: (id: string) => void
  createNote: () => string
  updateNoteTitle: (id: string, title: string) => void
  updateNoteContent: (id: string, content: string) => void
  getChatHistory: (noteId: string) => ChatMessage[]
  addChatMessage: (noteId: string, message: ChatMessage) => void
  initializeNotes: () => void
}

// Sample initial notes
const initialNotes: Note[] = [
  {
    id: "1",
    title: "Welcome to Notes",
    content:
      "<h1>Welcome to your Notes App!</h1><p>This is a Notion-style editor with an embedded AI assistant. Try it out:</p><ul><li>Edit this note</li><li>Create a new note</li><li>Use the AI assistant by clicking the button in the bottom right</li></ul>",
    chatHistory: [],
  },
  {
    id: "2",
    title: "Meeting Notes",
    content:
      "<h2>Team Meeting - May 8, 2025</h2><p>Attendees:</p><ul><li>John Doe</li><li>Jane Smith</li><li>Alex Johnson</li></ul><h3>Action Items:</h3><ol><li>Complete project proposal by Friday</li><li>Schedule follow-up meeting</li><li>Review quarterly goals</li></ol>",
    chatHistory: [],
  },
]

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  activeNoteId: null,

  initializeNotes: () => {
    // Check if we already have notes in localStorage
    const storedNotes = localStorage.getItem("notes")
    if (storedNotes) {
      set({ notes: JSON.parse(storedNotes) })
    } else {
      // Initialize with default notes
      set({ notes: initialNotes })
      localStorage.setItem("notes", JSON.stringify(initialNotes))
    }
  },

  setActiveNote: (id) => {
    set({ activeNoteId: id })
  },

  createNote: () => {
    const newNote: Note = {
      id: uuidv4(),
      title: "Untitled",
      content: "",
      chatHistory: [],
    }

    set((state) => {
      const updatedNotes = [...state.notes, newNote]
      localStorage.setItem("notes", JSON.stringify(updatedNotes))
      return { notes: updatedNotes }
    })

    return newNote.id
  },

  updateNoteTitle: (id, title) => {
    set((state) => {
      const updatedNotes = state.notes.map((note) => (note.id === id ? { ...note, title } : note))
      localStorage.setItem("notes", JSON.stringify(updatedNotes))
      return { notes: updatedNotes }
    })
  },

  updateNoteContent: (id, content) => {
    set((state) => {
      const updatedNotes = state.notes.map((note) => (note.id === id ? { ...note, content } : note))
      localStorage.setItem("notes", JSON.stringify(updatedNotes))
      return { notes: updatedNotes }
    })
  },

  getChatHistory: (noteId) => {
    const note = get().notes.find((note) => note.id === noteId)
    return note?.chatHistory || []
  },

  addChatMessage: (noteId, message) => {
    set((state) => {
      const updatedNotes = state.notes.map((note) =>
        note.id === noteId ? { ...note, chatHistory: [...note.chatHistory, message] } : note,
      )
      localStorage.setItem("notes", JSON.stringify(updatedNotes))
      return { notes: updatedNotes }
    })
  },
}))
