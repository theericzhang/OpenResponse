/* eslint-disable import/no-anonymous-default-export */
const apiKey = process.env.AZURE_OPENAI_KEY;
const base_url = process.env.BASE_URL;
const deploymentName = process.env.DEPLOYMENT_NAME;

let url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`

export default async function (req, res) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            body: JSON.stringify(generatePrompt(req.body.prompt))
        });
    
        if (!response.ok) {
            console.log(`HTTP Code: ${response.status} - ${response.statusText}`);
        } else {
            const completion = await response.json();
            res.status(200).json({ result: completion.choices[0].text });
        }
    } catch(e) {
        console.error(e);
    }
}

function generatePrompt(prompt) {
    return {
        'prompt': prompt,
        'max_tokens': 1000,
        // other options here
    };
}
