"use client"

import RichTextEditor from "@/components/rich-text-editor";
import { useState } from "react";

export default function Home() {
  const [post, setPost] = useState("")

  const onChange = (content: string) => {
    setPost(content)
    console.log(content)
  }

  return (
    <RichTextEditor content={post} onChange={onChange} />
  );
}
