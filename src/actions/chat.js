const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL


async function getAuthToken(user) {

    if (user) {
        const idToken = await user.getIdToken();
        return idToken;
    }

    return null;
}



export async function getChatsByUserId(idUser, user) {

    const authToken = await getAuthToken(user);

    console.log(authToken)
    if (!authToken) {
        return null;
    }

    const response = await fetch(`${API_BASE_URL}/chats/user/${idUser}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });

    return response.json();
}


export async function getChatById(idChat, user) {
    const authToken = await getAuthToken(user);


    if (!authToken) {
        return null;
    }

    const response = await fetch(`${API_BASE_URL}/chats/${idChat}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });

    return response.json();
}

export async function patchChatTitle(idChat, title, userId, user) {
    const authToken = await getAuthToken(user);


    if (!authToken) {

        return null;
    }

    console.log('authToken', authToken)

    const response = await fetch(`${API_BASE_URL}/chats/title/${idChat}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            title,
            userId,
        }),
    });

    return response.json();
}



export async function updateEditor(idChat, editor, userId, user) {
    const authToken = await getAuthToken(user);


    if (!authToken) {

        return null;
    }

    console.log('authToken', authToken)

    const response = await fetch(`${API_BASE_URL}/chats/editor/${idChat}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            editor,
            userId,
        }),
    });

    return response.json();
}



export async function deleteChat(chatId, user) {
    const authToken = await getAuthToken(user);


    if (!authToken) {

        return null;
    }

    const response = await fetch(`${API_BASE_URL}/chats/${chatId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });

    return response.json();
}