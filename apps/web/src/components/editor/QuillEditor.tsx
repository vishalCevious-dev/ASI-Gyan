import { useEffect, useRef } from "react";
import Quill, { type QuillOptionsStatic } from "quill";
import "quill/dist/quill.snow.css";

type Props = {
  value: string;
  onChange: (html: string) => void;
  className?: string;
  minHeight?: string | number; // e.g., '24rem' or 400 (px)
};

const modules: QuillOptionsStatic["modules"] = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "code-block"],
    ["link"],
    [{ align: [] }],
    ["clean"],
  ],
};

export default function QuillEditor({
  value,
  onChange,
  className,
  minHeight = "24rem",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (quillRef.current) return; // already mounted

    const q = new Quill(containerRef.current, {
      theme: "snow",
      modules,
    });
    quillRef.current = q;

    // Set initial content
    if (value) {
      q.clipboard.dangerouslyPasteHTML(value);
    }

    // Apply min height to the editable area
    try {
      const root = q.root as HTMLDivElement;
      root.style.minHeight =
        typeof minHeight === "number" ? `${minHeight}px` : String(minHeight);
    } catch {
      // ignore
    }

    const handler = () => {
      onChange(q.root.innerHTML);
    };
    q.on("text-change", handler);

    return () => {
      q.off("text-change", handler);
      quillRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep external value in sync if it changes (avoid loops)
  useEffect(() => {
    const q = quillRef.current;
    if (!q) return;
    const current = q.root.innerHTML;
    if (value !== current) {
      const sel = q.getSelection();
      q.clipboard.dangerouslyPasteHTML(value || "");
      if (sel) q.setSelection(sel);
    }
  }, [value]);

  return <div className={className} ref={containerRef} />;
}
