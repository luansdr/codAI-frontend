const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function getAuthToken(user) {

    if (user) {
        const idToken = await user.getIdToken();
        return idToken;
    }

    return null;
}

export async function getAllFrameworkOptions(user) {
    const authToken = await getAuthToken(user);


    if (!authToken) {
        return null;
    }


    const response = await fetch(`${API_BASE_URL}/framework`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });


    return response.json();
}


export async function getFrameworkOptionById(id, user) {
    const authToken = await getAuthToken(user);

    if (!authToken) {
        return null;
    }

    const response = await fetch(`${API_BASE_URL}/framework/${id}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });

    return response.json();
}



export async function createFrameworkOption(title, template, user) {
    const authToken = await getAuthToken(user);


    if (!authToken) {

        return null;
    }

    const response = await fetch(`${API_BASE_URL}/framework`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            title,
            template,
        }),
    });

    return response.json();
}

export async function updateFrameworkOption(id, title, template, user) {
    const authToken = await getAuthToken(user);

    if (!authToken) {

        return null;
    }

    const response = await fetch(`${API_BASE_URL}/framework/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({
            title,
            template,
        }),
    });

    return response.json();
}

export async function deleteFrameworkOption(id, user) {
    const authToken = await getAuthToken(user);

    if (!authToken) {

        return null;
    }

    const response = await fetch(`${API_BASE_URL}/framework/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${authToken}`,
        },
    });

    return response.json();
}