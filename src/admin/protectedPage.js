'use client'
import React, { useEffect } from "react";
import { useAuthContext } from "@//authservice/AuthContext";
import { useRouter } from "next/navigation";

function ProtectedPage({ children }) {
    const { user } = useAuthContext()
    const router = useRouter()



    React.useEffect(() => {
        if (user == null) router.push("/login")
    }, [user])

    return (children);
}

export default ProtectedPage;