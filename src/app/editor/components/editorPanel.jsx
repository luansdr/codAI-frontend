"use client";
import React, { useState, useEffect, useRef } from "react";
import sdk from "@stackblitz/sdk";
import { useChat } from "../context/chatContext";
import { useAuthContext } from "@//authservice/AuthContext";
import { getChatById, updateEditor } from "@//actions/chat";

export default function EditorPanel() {
  const { user } = useAuthContext();
  const {
    selectedChat,
    contentEditor,
    setContentEditor,
    setVmInstanceActual,
    setLoading,
  } = useChat();

  const [projectInitialized, setProjectInitialized] = useState(false);
  const [projectFiles, setProjectFiles] = useState({});
  const [currentChatId, setCurrentChatId] = useState("");
  const [vmSave, setVmSave] = useState(null);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (selectedChat && selectedChat.id && selectedChat.id !== currentChatId) {
      setLoading(true);
      setContentEditor();
      setCurrentChatId(selectedChat.id);
      initializeProject();
    }
  }, [selectedChat, currentChatId]);

  useEffect(() => {
    if (contentEditor) {
      applyChangesToEditor();
    }
  }, [contentEditor]);

  const initializeProject = async () => {
    try {
      const response = await getChatById(selectedChat.id, user);
      let projectData = {};

      if (response.data.editor !== "") {
        projectData = parseEditorData(response.data.editor);
      } else {
        projectData = parseEditorData(
          response.data.history.slice(-1)[0].content
        );
        await saveEditorChanges(response.data.history.slice(-1)[0].content);
      }

      const iframe = document.getElementById("stackblitz-iframe");
      const vm = await sdk.embedProject(iframe, projectData, {
        hideNavigation: true,
      });

      setLoading(false);
      setVmSave(vm);

      const objectToInstance = {
        vm: vm,
      };
      setVmInstanceActual(objectToInstance);

      setProjectFiles(projectData);
      setProjectInitialized(true);

      await vm.editor.setTheme("dark");
    } catch (error) {
      console.error("Erro ao inicializar o projeto:", error);
      setLoading(false);
    }
  };

  const parseEditorData = (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error("Erro ao analisar o JSON do projeto:", error);
      return {};
    }
  };

  const saveEditorChanges = async (param = null) => {
    try {
      const iframe = document.getElementById("stackblitz-iframe");
      const vm = await sdk.connect(iframe);

      let fsSnapshot = param
        ? projectFiles
        : { ...projectFiles, files: await vm.getFsSnapshot() };

      await updateEditor(
        selectedChat.id,
        JSON.stringify(fsSnapshot),
        user.uid,
        user
      );

      console.log("Snapshot enviado para a API:", fsSnapshot);
    } catch (error) {
      console.error("Erro ao salvar as alterações do editor:", error);
    }
  };

  const applyChangesToEditor = async () => {
    try {
      const iframe = document.getElementById("stackblitz-iframe");
      const vm = await sdk.connect(iframe);

      const diff = computeFileDiff(
        JSON.parse(
          contentEditor.history[contentEditor.history.length - 1].content
        ).files,
        projectFiles.files
      );

      await vm.applyFsDiff({
        create: diff.create,
        destroy: [],
      });

      await saveEditorChanges();
    } catch (error) {
      console.error("Erro ao aplicar alterações ao editor:", error);
    }
  };

  const computeFileDiff = (newFiles, existingFiles) => {
    const diff = {
      create: {},
      destroy: [],
    };

    for (const file in newFiles) {
      if (!existingFiles[file] || existingFiles[file] !== newFiles[file]) {
        diff.create[file] = newFiles[file];
      }
    }

    for (const file in existingFiles) {
      if (!newFiles[file]) {
        diff.destroy.push(file);
      }
    }

    return diff;
  };

  return (
    <div className="responsive-iframe">
      <iframe
        className="responsive-iframe"
        ref={iframeRef}
        id="stackblitz-iframe"
        title="CodAI Editor"
      />
    </div>
  );
}
