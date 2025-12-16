
// Use native fetch (Node 18+) or import
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fetch = require('node-fetch'); // or rely on global fetch if Node 18+

const HUGGING_FACE_API_KEY = process.env.HUGGING_FACE_API_KEY || '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';
const MODEL_ID = "meta-llama/Meta-Llama-3-8B-Instruct";
const API_URL = "https://router.huggingface.co/v1/chat/completions";

async function testAPI() {
    console.log(`Testing API with Key: ${HUGGING_FACE_API_KEY.substring(0, 5)}...`);
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HUGGING_FACE_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: MODEL_ID,
                messages: [{ role: "user", content: "Hello, are you working?" }],
                max_tokens: 50,
                temperature: 0.5,
                stream: false
            }),
        });

        console.log(`Status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const text = await response.text();
            console.log('Error Body:', text);
            return;
        }

        const data = await response.json();
        console.log('Response:', JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

testAPI();
