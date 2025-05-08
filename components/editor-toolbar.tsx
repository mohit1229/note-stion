"use client"

import type { Editor } from "@tiptap/react"
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditorToolbarProps {
  editor: Editor | null
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null
  }

  return (
    <div className="   p-2 flex flex-wrap gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Bold"
      >
        <Bold size={16} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Italic"
      >
        <Italic size={16} />
      </Button>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700  mx-1"></div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Heading 1"
      >
        <Heading1 size={16} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Heading 2"
      >
        <Heading2 size={16} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Heading 3"
      >
        <Heading3 size={16} />
      </Button>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700  mx-1"></div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Bullet List"
      >
        <List size={16} />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-zinc-200 dark:bg-zinc-700 " : ""}
        title="Ordered List"
      >
        <ListOrdered size={16} />
      </Button>
    </div>
  )
}
