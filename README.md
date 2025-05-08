# Notes Editor with Chat UI - Assignment

## 🚀 Project Overview  
Build a Notion-style note editor with an embedded ChatGPT-like AI interface using Next.js 14, TypeScript, and Tailwind CSS. Supports rich text editing and note-specific AI chat history.

---

## ✨ Features  
**📝 Notes System**  
- **Sidebar**: Switch between multiple notes with titles
- **TipTap Editor**:  
  - Rich text formatting (headings H1-H3, bullet/numbered lists)
  - Floating AI button at bottom-right

**🤖 AI Chat UI**  
- Chat interface opens below note content (non-modal)
- Mock API integration with fixed responses  
- Message alignment:  
  - User messages (right-aligned)  
  - AI responses (left-aligned)  

**⚡ State Management**  
- Zustand stores for:  
  - Notes data (title/content)  
  - Note-specific chat histories  
- Local persistence (optional bonus)  

---

## 🛠 Tech Stack  
| Component          | Technology           |
|--------------------|----------------------|
| Framework          | Next.js 14 (App Router) |
| Language           | TypeScript           |
| Styling            | Tailwind CSS 3 and ShadcnUI |
| Text Editor        | TipTap v2            |
| State Management   | Zustand[9]          |

---

## ⚙️ Installation  
1. Clone starter template:  
   ```bash
   git clone <link>
   ```
2. Install dependencies:  
   ```bash
   npm install -D tailwindcss @tailwindcss/postcss postcss zustand
   ```
3. Configure Tailwind:  
   ```js
   // postcss.config.mjs
   export default { plugins: {'@tailwindcss/postcss': {}}}
   ```
4. Initialize ShadcnUI
   ```bash
   npx shadcn@latest init
   ```
---

## 🧩 Component Structure  
```
src/
├── app/
│   ├── layout.tsx         # Root layout with Tailwind
│   ├── globals.css        # Tailwind directives
├── components/
│   ├── ai-chat/            # AI chat bar
│   ├── editor-toolbar/            # TipTap editor toolbar
│   ├── note-editor/            # TipTap editor
│   ├── theme-provider/            # From shadcnUI
│   ├── theme-toggle/            # From shadcnUI
├── lib/
│   ├── store.ts   # Zustand store for notes
│   ├── utils.ts   
```

---

## 🔄 State Management (Zustand)  

---

## 🚧 Running the Project  
```bash
npm run dev
```