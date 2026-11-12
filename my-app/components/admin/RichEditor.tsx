"use client";

import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Btn = {
  label: string;
  text: string;
  active?: boolean;
  disabled?: boolean;
  run: () => void;
};

const base =
  "rounded-[8px] border-[1.5px] border-ink px-2.5 py-1 font-mono text-xs aria-pressed:bg-ink aria-pressed:text-paper disabled:opacity-40";

export default function RichEditor({
  value,
  onChange,
  labelledBy,
}: {
  value: string;
  onChange: (html: string) => void;
  labelledBy: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    content: value,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: {
          openOnClick: false,
          HTMLAttributes: { rel: "noopener nofollow", target: "_blank" },
        },
        code: false,
        codeBlock: false,
        strike: false,
        horizontalRule: false,
      }),
    ],
    editorProps: {
      attributes: {
        role: "textbox",
        "aria-multiline": "true",
        "aria-labelledby": labelledBy,
        class: "post-prose min-h-[220px] px-3 py-2 outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const s = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: !!editor?.isActive("bold"),
      italic: !!editor?.isActive("italic"),
      underline: !!editor?.isActive("underline"),
      h2: !!editor?.isActive("heading", { level: 2 }),
      h3: !!editor?.isActive("heading", { level: 3 }),
      ul: !!editor?.isActive("bulletList"),
      ol: !!editor?.isActive("orderedList"),
      link: !!editor?.isActive("link"),
      undo: !!editor?.can().undo(),
      redo: !!editor?.can().redo(),
    }),
  });
  if (!editor || !s) return null;

  const c = () => editor.chain().focus();
  const setLink = () => {
    const prev = editor.getAttributes("link").href ?? "https://";
    const url = window.prompt("Link address (https:// or mailto:)", prev);
    if (url === null) return;
    if (url === "") return void c().unsetLink().run();
    if (/^(https:\/\/|mailto:)/i.test(url))
      c().extendMarkRange("link").setLink({ href: url }).run();
  };

  const btns: Btn[] = [
    {
      label: "Bold",
      text: "B",
      active: s.bold,
      run: () => c().toggleBold().run(),
    },
    {
      label: "Italic",
      text: "I",
      active: s.italic,
      run: () => c().toggleItalic().run(),
    },
    {
      label: "Underline",
      text: "U",
      active: s.underline,
      run: () => c().toggleUnderline().run(),
    },
    {
      label: "Heading 2",
      text: "H2",
      active: s.h2,
      run: () => c().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Heading 3",
      text: "H3",
      active: s.h3,
      run: () => c().toggleHeading({ level: 3 }).run(),
    },
    {
      label: "Bulleted list",
      text: "• List",
      active: s.ul,
      run: () => c().toggleBulletList().run(),
    },
    {
      label: "Numbered list",
      text: "1. List",
      active: s.ol,
      run: () => c().toggleOrderedList().run(),
    },
    { label: "Link", text: "Link", active: s.link, run: setLink },
    {
      label: "Undo",
      text: "Undo",
      disabled: !s.undo,
      run: () => c().undo().run(),
    },
    {
      label: "Redo",
      text: "Redo",
      disabled: !s.redo,
      run: () => c().redo().run(),
    },
  ];

  return (
    <div className="rounded-[10px] border-[1.5px] border-ink bg-card">
      <div
        role="toolbar"
        aria-label="Formatting"
        className="flex flex-wrap gap-1.5 border-b-[1.5px] border-ink p-2"
      >
        {btns.map((b) => (
          <button
            key={b.label}
            type="button"
            aria-label={b.label}
            aria-pressed={b.active === undefined ? undefined : b.active}
            disabled={b.disabled}
            onClick={b.run}
            className={base}
          >
            {b.text}
          </button>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
