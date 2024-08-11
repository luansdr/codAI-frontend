'use client'
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import Topbar from './components/topSideBar';
import EditorContent from './components/editorContent';
import ProtectedRoute from './../../admin/protectedPage';
import { ChatProvider } from './context/chatContext';
import { AuthContextProvider } from '@//authservice/AuthContext';
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (

    <AuthContextProvider>
      <ProtectedRoute>
        <ChatProvider>
          <div className="flex max-h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col ">
              <Topbar sidebarOpen={sidebarOpen} />
              <EditorContent sidebarOpen={sidebarOpen} />
            </div>
          </div>
        </ChatProvider>
      </ProtectedRoute>
    </AuthContextProvider>

  );
};

export default Home;
