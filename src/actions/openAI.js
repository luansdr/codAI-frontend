const API_KEY_OPENAI = process.env.NEXT_PUBLIC_API_KEY_OPEN_AI;

export async function postOpenAI(messages) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY_OPENAI}`,
  };

  const messageToGFpt = [
    {
      role: "system",
      content:
        "Crie um titulo para um chat (deve retornar apenas o titulo) de até 20 caractere descrito o tema pedido pelo usuario SEMPRE GERE um titulo independente do que ele mandar não pode conter ASPAS",
    },
    { role: "user", content: messages },
  ];

  const data = {
    messages: messageToGFpt,
    model: "gpt-3.5-turbo",
    temperature: 0,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
