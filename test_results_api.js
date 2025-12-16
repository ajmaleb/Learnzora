
import fetch from 'node-fetch';

async function testResults() {
    try {
        const response = await fetch('http://localhost:5001/api/parent-connect/results/STU-2024-001');
        if (!response.ok) {
            console.log('Error:', response.status, response.statusText);
            const text = await response.text();
            console.log('Body:', text);
            return;
        }
        const data = await response.json();
        console.log('Results:', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error('Fetch error:', e);
    }
}

testResults();
