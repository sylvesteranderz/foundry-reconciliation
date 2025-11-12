import { Toggle } from './toggle';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import {
  Bold,
  Heading,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
  Underline as UnderlineIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToggleGroup } from './toggle-group';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

function EditorToolbar({
  editor,
  disabled,
}: {
  editor: Editor | null;
  disabled?: boolean;
}) {
  if (!editor) {
    return null;
  }

  return (
    <div
      className="m-0 flex items-center justify-between p-2 border-b bg-neutral-50/40 dark:bg-neutral-900 rounded-t-lg"
      aria-label="Formatting options"
    >
      <ToggleGroup className="flex flex-row items-center" type="multiple">
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleBold().run()
          }
          pressed={editor.isActive('bold')}
        >
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleItalic().run()
          }
          pressed={editor.isActive('italic')}
        >
          <Italic className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            disabled || !editor.can().chain().focus().toggleUnderline().run()
          }
          pressed={editor.isActive('underline')}
        >
          <UnderlineIcon className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={disabled}
          pressed={editor.isActive('heading', { level: 2 })}
        >
          <Heading className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          disabled={disabled}
          pressed={editor.isActive('bulletList')}
        >
          <List className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          disabled={disabled}
          pressed={editor.isActive('orderedList')}
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() =>
            editor.chain().focus().toggleBlockquote().run()
          }
          disabled={disabled}
          pressed={editor.isActive('blockquote')}
        >
          <Quote className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>

      <ToggleGroup
        className="flex flex-row items-center invisible sm:visible"
        type="multiple"
      >
        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().undo().run()}
          disabled={disabled || !editor.can().chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>

        <Toggle
          size="sm"
          className="mr-1"
          onPressedChange={() => editor.chain().focus().redo().run()}
          disabled={disabled || !editor.can().chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write something...',
  disabled = false,
}: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Initialize editor with immediatelyRender set to false for SSR
  const editor = useEditor(
    {
      immediatelyRender: false,
      extensions: [StarterKit, Underline],
      content: value,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        const isEditorEmpty = editor.isEmpty;
        const content = editor.getHTML();
        onChange(isEditorEmpty ? '' : content);
      },
      editorProps: {
        attributes: {
          class:
            'prose prose-sm sm:prose-base max-w-none focus:outline-none min-h-[150px]',
          placeholder,
        },
      },
      parseOptions: {
        preserveWhitespace: 'full',
      },
      enableInputRules: false,
      enablePasteRules: false,
    },
    [isMounted]
  );

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      if (value === '') {
        editor.commands.clearContent();
      } else {
        editor.commands.setContent(value);
      }
    }
  }, [editor, value]);

  if (!isMounted) {
    return (
      <div className="border rounded-lg">
        <div className="m-0 flex items-center justify-between p-2 border-b bg-neutral-50/40 dark:bg-neutral-900 rounded-t-lg" />
        <div className="p-3 min-h-[200px]" />
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <EditorToolbar editor={editor} disabled={disabled} />
      <EditorContent
        editor={editor}
        className={`p-3 min-h-[200px] ${
          disabled ? 'bg-muted cursor-not-allowed' : ''
        }`}
      />
    </div>
  );
}
