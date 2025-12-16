
const API_BASE = 'http://localhost:5001/api';

async function testChat() {
    console.log("1. Logging in as Parent...");
    try {
        const loginRes = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: 'parent01', password: 'password123' })
        });
        const loginData = await loginRes.json();

        if (!loginRes.ok) {
            console.error("Login failed:", loginData);
            return;
        }
        console.log("Login success. Token:", loginData.token ? "Received" : "Missing");

        const token = loginData.token;

        console.log("\n2. Sending Message...");
        const sendRes = await fetch(`${API_BASE}/parent-connect/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                recipientId: 'teacher1',
                message: 'Hello from verification script!'
            })
        });
        const sendData = await sendRes.json();
        console.log("Send Result:", sendData);

        console.log("\n3. Fetching History...");
        const historyRes = await fetch(`${API_BASE}/parent-connect/history/teacher1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const historyData = await historyRes.json();
        console.log("History:", historyData);

    } catch (e) {
        console.error("Error:", e);
    }
}

testChat();
