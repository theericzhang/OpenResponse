/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.AZURE_OPENAI_KEY;
const base_url = process.env.BASE_URL;
const deploymentName = process.env.DEPLOYMENT_NAME;

// WARNING - DO NOT EDIT BLOCKS CONTAINING isCurrentEnvironmentAzure UNLESS YOU HAVE DEPLOYED A GPT-3 INSTANCE ON AZURE.
const isCurrentEnvironmentAzure = process.env.CURRENT_ENVIRONMENT === 'azure';
console.log(isCurrentEnvironmentAzure);
let url;
let configuration;
let openai;
console.log(isCurrentEnvironmentAzure);

if (isCurrentEnvironmentAzure) {
    url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`;
    console.log('set url');
} else {
    configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    openai = new OpenAIApi(configuration);
}

export default async function (req, res) {
    if (isCurrentEnvironmentAzure) {
        try {
            // console.log(req.body.prompt);
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': apiKey
                },
                body: JSON.stringify(generatePrompt(req.body.prompt))
            });
            console.log('attempted fetch');
        
            if (!response.ok) {
                console.log(`HTTP Code: ${response.status} - ${response.statusText}`);
                console.log('fetch failed');
            } else {
                const completion = await response.json();
                res.status(200).json({ result: completion.choices[0].text });
                console.log('fetch succeeded');
            }
        } catch(e) {
            console.error(e);
            console.log('fetch failed');
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
    if (isCurrentEnvironmentAzure) {
        // console.log('attempting to set model?');
        return {
            'model': 'text-davinci-003',
            'prompt': prompt,
            'max_tokens': 1000,
            // other options here
        };
    } else {
        return `${prompt}`;
    }
}
