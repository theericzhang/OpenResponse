/* eslint-disable react/no-unescaped-entities */
import React from "react";
import style from "./LandingContent.module.css";
import TextFieldExample from "../elements/text/TextFieldExample";
import GetStartedButton from "../elements/buttons/GetStartedButton";
import { useState, useEffect } from "react";

export default function LandingContent({ isPromptViewOpen, setIsPromptViewOpen }) {
    
    const [ isComponentUnmounting, setIsComponentUnmounting ] = useState(false);
    return (
        <div className={style["left-column"]} id={isComponentUnmounting ? style["unmounting"] : ''}>
            <div className={style["intro-text-description-wrapper"]}>
                <div className={style["intro-text-description"]}>
                    <h3 className={style.subtitle}>
                        I'm an AI built with OpenAI and NextJS. I'll read and
                        respond to any prompt that you type out.
                    </h3>
                    <p className={style.description}>
                        An example prompt would look like this
                    </p>
                    <TextFieldExample
                        text="What's so great about Brooklyn? What's so special about the pizza?"
                        textType="input"
                    />
                    <p className={style.description}>
                        I might say something like this in response
                    </p>
                    <TextFieldExample
                        text="There are many things that make Brooklyn great, but one of the most popular reasons is the pizza. Brooklyn is home to some of the best pizza places in the country, and the pizza here is truly special. The dough is thin and crispy, the sauce is flavorful, and the toppings are plentiful. If you're looking for a truly unique and delicious pizza experience, Brooklyn is the place to be."
                        textType="response"
                    />
                </div>
            </div>
            <div className={style["call-to-action-row"]}>
                <p className={style["description-call-to-action"]}>
                    Prompts can be extremely open-ended or as specific as you’d
                    like.
                </p>
                {!isPromptViewOpen && (
                    <GetStartedButton
                        setIsPromptViewOpen={setIsPromptViewOpen}
                        setIsComponentUnmounting={setIsComponentUnmounting}
                    />
                )}
            </div>
        </div>
    );
}
