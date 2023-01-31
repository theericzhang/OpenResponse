/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.AZURE_OPENAI_KEY;
const base_url = process.env.BASE_URL;
const deploymentName = process.env.DEPLOYMENT_NAME;

// WARNING - DO NOT EDIT BLOCKS CONTAINING isCurrentEnvironment UNLESS YOU HAVE DEPLOYED A GPT-3 INSTANCE ON AZURE.
const isCurrentEnvironment = process.env.CURRENT_ENVIRONMENT === 'azure';
let url;
let configuration;
let openai;
console.log(isCurrentEnvironment);

if (isCurrentEnvironment === 'azure') {
    url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`
} else {
    configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    openai = new OpenAIApi(configuration);
}

export default async function (req, res) {
    if (isCurrentEnvironment === 'azure') {
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
    } else {
        const completion = await openai.createCompletion({
            model: "text-davinci-002",
            prompt: generatePrompt(req.body.prompt),
            temperature: 0.6,
            max_tokens: 1000,
        });
        res.status(200).json({ result: completion.data.choices[0].text });
    }
}

function generatePrompt(prompt) {
    if (isCurrentEnvironment === 'azure') {
        return {
            'prompt': prompt,
            'max_tokens': 1000,
            // other options here
        };
    } else {
        return `${prompt}`;
    }
}
