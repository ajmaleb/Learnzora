
// Native fetch verification script
const API_KEY = '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';
const URL = "https://router.huggingface.co/v1/chat/completions";

async function verify() {
    console.log("Checking API Key...");
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "meta-llama/Meta-Llama-3-8B-Instruct",
                messages: [{ role: "user", content: "Is this key valid?" }],
                max_tokens: 10
            })
        });

        if (response.ok) {
            console.log("SUCCESS: API Key is valid.");
            const data = await response.json();
            console.log("Response:", data.choices[0].message.content);
        } else {
            console.log(`FAILURE: Status ${response.status}`);
            const text = await response.text();
            console.log("Error:", text);
        }
    } catch (e) {
        console.error("NETWORK ERROR:", e);
    }
}

verify();
