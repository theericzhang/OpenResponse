/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.AZURE_OPENAI_KEY;
const base_url = process.env.BASE_URL;
const deploymentName = process.env.DEPLOYMENT_NAME;

// WARNING - DO NOT EDIT BLOCKS CONTAINING isCurrentEnvironmentAzure UNLESS YOU HAVE DEPLOYED A GPT-3 INSTANCE ON AZURE.
const isCurrentEnvironmentAzure = process.env.CURRENT_ENVIRONMENT === "azure";
console.log(isCurrentEnvironmentAzure);
let url;
let configuration;
let openai;
console.log(isCurrentEnvironmentAzure);

if (isCurrentEnvironmentAzure) {
    url = `${base_url}/openai/deployments/${deploymentName}/completions?api-version=2022-12-01`;
    console.log("set url");
} else {
    configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    openai = new OpenAIApi(configuration);
}

const httpMessages = {
    400: "Your request could not be understood. Try reworking your prompt and resubmitting it",
    401: "There was a problem authenticating your account. Check to see if your API keys are correct.",
    403: "Your request was received, but you do not have permission to access the resource.",
    404: "Not Found - The requested resource could not be found on the server.",
    500: "Internal Server Error - An unexpected error occurred on the server.",
};

export default async function (req, res) {
    if (isCurrentEnvironmentAzure) {
        try {
            // console.log(req.body.prompt);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "api-key": apiKey,
                },
                body: JSON.stringify(generatePrompt(req.body.prompt)),
            });
            console.log("attempted fetch");

            if (!response.ok) {
                console.log(
                    `HTTP Code: ${response.status} - ${response.statusText}`
                );
                console.log("fetch failed");
                res.status(500).json({
                    error: `Oops! Something went wrong. ${
                        httpMessages[response.status]
                    }`,
                });

                // If something went wrong, like an api call did not go through because of bad permissions, you will be redirected here
            } else {
                const completion = await response.json();
                res.status(200).json({ result: completion.choices[0].text });
                console.log("fetch succeeded");
            }
        } catch (e) {
            console.error(e);
            console.log("fetch failed 2");
            res.status(500).json({
                error: "Could not contact GPT 3.5. Check to see if your internet connection is stable",
            });
            // If there was an issue where the outbound connection could not reach the server, then you will be redirected here.
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
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 1000,
            // other options here
        };
    } else {
        return `${prompt}`;
    }
}
