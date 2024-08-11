import React, { createContext, useContext, useState, useEffect } from "react";
import { getChatsByUserId } from "@//actions/chat";
import { useAuthContext } from "@//authservice/AuthContext";
const ChatContext = createContext();

export function ChatProvider({ children }) {
  const { user } = useAuthContext();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentEditor, setContentEditor] = useState([]);
  const [vmInstanceActual, setVmInstanceActual] = useState();
  const [loadingChats, setLoadingChats] = useState(false);

  useEffect(() => {
    async function fetchChats() {
      setLoadingChats(true);
      try {
        const userId = user.uid;
        const response = await getChatsByUserId(userId, user);
        const sortedChats = response.data.sort(
          (a, b) => b.lastModified - a.lastModified
        );
        setChats(sortedChats);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }

      setLoadingChats(false);
    }

    fetchChats();
  }, []);

  async function fetchChats() {
    try {
      const userId = user.uid;
      const response = await getChatsByUserId(userId, user);
      const sortedChats = response.data.sort(
        (a, b) => b.lastModified - a.lastModified
      );
      setChats(sortedChats);
      setSelectedChat(sortedChats[0]);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  async function getChatById(id) {
    try {
      await getChatById(id, user);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        fetchChats,
        contentEditor,
        setContentEditor,
        getChatById,
        vmInstanceActual,
        setVmInstanceActual,
        loading,
        setLoading,
        loadingChats,
        setLoadingChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
