"use client";
import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import EditorPanel from "./editorPanel";
import MainEditor from "./mainEditor";
import { ChatProvider, useChat } from "../context/chatContext";
import InputCodeAI from "./inputCodeAI";
import Loading from "../../loading";

export default function EditorContent() {
  const { selectedChat, loading} = useChat();
  const parentRef = useRef(null);
  const [showEditorPanel, setShowEditorPanel] = useState(Boolean(selectedChat));
 
  useEffect(() => {
    setShowEditorPanel(Boolean(selectedChat));
  }, [selectedChat]);

  return (
    <div className="mx-2 h-full overflow-hidden relative flex flex-col">
      <div ref={parentRef} className="flex-grow">
        {showEditorPanel ? (
          <div className="h-full">
            {loading ? (
              <div className="z-10 absolute w-full h-full flex flex-col justify-center items-center bg-black opacity-90 backdrop-blur-lg">
                <Loading/>
              </div>
            ) : null}

            <EditorPanel
              selectedChat={selectedChat}
              parentRef={parentRef}
            />
          </div>
        ) : (
          <div className="h-full">
            <MainEditor />
          </div>
        )}{" "}
      </div>

      <div className="z-12">
        <InputCodeAI />
      </div>
    </div>
  );
}
