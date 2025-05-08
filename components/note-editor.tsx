"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Heading from "@tiptap/extension-heading"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Placeholder from "@tiptap/extension-placeholder"
import { useNotesStore } from "@/lib/store"
import EditorToolbar from "./editor-toolbar"

interface NoteEditorProps {
  note: {
    id: string
    title: string
    content: string
  }
}

export default function NoteEditor({ note }: NoteEditorProps) {
  const { updateNoteTitle, updateNoteContent } = useNotesStore()
  const [title, setTitle] = useState(note.title)
  useEffect(() => {
    setTitle(note.title);
  }, [note.id, note.title]);
  
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disable StarterKit's heading to avoid conflicts
        bulletList: false, // Disable StarterKit's bullet list to avoid conflicts
        orderedList: false, // Disable StarterKit's ordered list to avoid conflicts
        listItem: false, // Disable StarterKit's list item to avoid conflicts
      }),
      Heading.configure({
        levels: [1, 2, 3], // Configure specific heading levels
      }),
      BulletList, // Include bullet list extension
      OrderedList, // Include ordered list extension
      ListItem, // Include list item extension for proper nesting
      Placeholder.configure({
        placeholder: "Start writing...",
      }),
    ],
    content: note.content,
    onUpdate: ({ editor }) => {
      updateNoteContent(note.id, editor.getHTML());
    },
    autofocus: true,
  });
  

  useEffect(() => {
    if (editor && note.content !== editor.getHTML()) {
      editor.commands.setContent(note.content)
    }
  }, [note.id, note.content, editor])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    updateNoteTitle(note.id, newTitle)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Untitled"
          className="w-full text-2xl font-bold outline-none border-none bg-transparent dark:text-white"
        />
      </div>

      <EditorToolbar editor={editor} />

      <div className="flex-1 overflow-y-auto p-4">
  <div className="relative max-w-full h-full">
    <EditorContent editor={editor} className="prose max-w-none h-full outline-none dark:prose-invert" />
  </div>
</div>

    </div>
  )
}
