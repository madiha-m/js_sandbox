'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menu-bar'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'

export default function RichTextEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-3'
                    }
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-3'
                    }
                }
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Image.configure({
                inline: true,
                resize: {
                    enabled: true,
                    directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
                    minWidth: 50,
                    minHeight: 50,
                    alwaysPreserveAspectRatio: true,
                }
            })
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
            },
        },
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            console.log(editor.getHTML())
        }
    })

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}