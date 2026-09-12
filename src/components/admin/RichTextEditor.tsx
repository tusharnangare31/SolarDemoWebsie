'use client';

import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Eye,
  Edit3,
} from 'lucide-react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({
  label = 'Content',
  value,
  onChange,
  placeholder = 'Write article content here...',
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);

  const insertTag = (openTag: string, closeTag: string = '') => {
    const textarea = document.getElementById('rich-text-area') as HTMLTextAreaElement | null;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const replacement = `${openTag}${selectedText || 'Text'}${closeTag}`;

    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + openTag.length,
        start + replacement.length - closeTag.length
      );
    }, 50);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        {label && <label className="block text-sm font-semibold text-gray-700">{label}</label>}
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
        >
          {isPreview ? (
            <>
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" /> Preview
            </>
          )}
        </button>
      </div>

      <div className="border border-gray-300 rounded-xl overflow-hidden focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all bg-white">
        {/* Toolbar */}
        {!isPreview && (
          <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 border-b border-gray-200 text-gray-700">
            <button
              type="button"
              onClick={() => insertTag('<strong>', '</strong>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertTag('<em>', '</em>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="h-4 w-[1px] bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => insertTag('<h2>', '</h2>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Heading 2"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertTag('<h3>', '</h3>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Heading 3"
            >
              <Heading3 className="w-4 h-4" />
            </button>
            <div className="h-4 w-[1px] bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={() => insertTag('<ul>\n  <li>', '</li>\n</ul>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertTag('<ol>\n  <li>', '</li>\n</ol>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => insertTag('<blockquote>', '</blockquote>')}
              className="p-1.5 rounded hover:bg-gray-200 transition-colors"
              title="Blockquote"
            >
              <Quote className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Content View */}
        {isPreview ? (
          <div
            className="p-4 min-h-[260px] max-h-[400px] overflow-y-auto prose prose-sm max-w-none text-gray-800"
            dangerouslySetInnerHTML={{ __html: value || '<p className="text-gray-400 italic">No content to preview</p>' }}
          />
        ) : (
          <textarea
            id="rich-text-area"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={10}
            className="w-full p-4 outline-none resize-y text-gray-900 font-mono text-sm leading-relaxed"
          />
        )}
      </div>
      <p className="text-xs text-gray-400 mt-1">HTML tags supported for rich styling</p>
    </div>
  );
}
