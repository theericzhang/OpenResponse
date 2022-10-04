/* eslint-disable import/no-anonymous-default-export */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
    const completion = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: generatePrompt(req.body.prompt),
        temperature: 0.6,
        max_tokens: 100,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt) {
    //   const capitalizedAnimal =
    //     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    //   return `Suggest three names for an animal that is a superhero.

    // Animal: Cat
    // Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
    // Animal: Dog
    // Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
    // Animal: ${capitalizedAnimal}
    // Names:`;

    return `${prompt}`;
}
