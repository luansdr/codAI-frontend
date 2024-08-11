const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function getAuthToken(user) {

    if (user) {
        const idToken = await user.getIdToken();
        return idToken;
    }

    return null;
}


export async function postCodeToOpenAI({ ask, template, chatId, userId, user }) {

    const authToken = await getAuthToken(user);
    if (!authToken) {
        return null;
    }

    const response = await fetch(`${API_BASE_URL}/code/code-openai`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            ask,
            template,
            chatId,
            userId,
        }),
    });

    return response.json();
}