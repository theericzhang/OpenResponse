import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./Dialogue.module.css";

import SubmitPromptButton from "../buttons/SubmitPromptButton";
import ResetPromptButton from "../buttons/ResetPromptButton";
import TypingPlaceholder from "./TypingPlaceholder";
import StatusIndicator from "./StatusIndicator";

export default function Dialogue() {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");
    const [isFetchingResponse, setIsFetchingResponse] = useState(false);
    const [isUserTyping, setIsUserTyping] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    let dialogueLoadedTimeoutOffset = 300;

    // dialogue history is a feature planned for future release - conversation-like UI is intended
    // const [ dialogueHistory, setDialogueHistory ] = useState([]);
    const [isAutoTyperFinished, setIsAutoTyperFinished] = useState(false);

    // handling the returned data
    // all responses appear to start with a \n\n header, so split to a regex and ignore the first two instances
    const responseParsed = response.split(/\r?\n/).map((line, index) => {
        if (index > 1)
            return (
                <p className={style["openresponse-text"]} key={index}>
                    {line}
                </p>
            );
    });

    // activates an active state for OpenResponse Logo if the user has stopped tying for 6 seconds.
    // useEffect captures the state of the input and debounces the timer when the user enters a key within 6 seconds of the last one
    // return statement destroys the setTimeout function
    useEffect(() => {
        if (!!userInput) {
            setIsUserTyping(true);
            const delayedUnshowLogoSuggestion = setTimeout(() => {
                setIsUserTyping(false);
            }, 6000);

            return () => {
                clearTimeout(delayedUnshowLogoSuggestion);
            };
        } else {
            setIsUserTyping(false);
        }
    }, [userInput]);

    // simulate first typing event - no explanation needed?
    // first, initialize the search prompt we want answered.
    // in order to loop through each character of the string, we need to manually iterate through the string using an index.
    // If the index is less than or equal to the length of the prompt, then we setUserInput to a substring - from index 0 to indexChar.
    // after that, increment indexChar.
    // If indexChar exceeds the length of initialPrompt (meaning it would be accessing garbage data), we need to clear the interval to prevent infinite function calls.
    useEffect(() => {
        let initialPrompt =
            "What does it mean to be conscious? Are you conscious?";
        let indexChar = 0;
        const typingInterval = setInterval(setInitialUserInputTextPerChar, 70);

        function setInitialUserInputTextPerChar() {
            if (indexChar <= initialPrompt.length) {
                setUserInput(initialPrompt.slice(0, indexChar));
                indexChar++;
            } else {
                clearInterval(typingInterval);
            }
        }
    }, []);

    // animation mount. once component mounts, change the transform rotateX value to 0 degress.
    // achievable by setting a custom id target, #loaded
    useEffect(() => {
        setTimeout(() => {
            setIsLoaded(true);
        }, dialogueLoadedTimeoutOffset);
    }, []);

    function userInputChangeHandler(e) {
        setUserInput(e.target.value);
    }

    // since <textarea /> elements don't have an "enter to submit", we must create our own event listener that handles a submit whenever an Enter key is pressed while focused in the text area
    // attaching onKeyPress as an attribute passes an event, e
    // e has key values that we can use to check to see if an Enter key is pressed
    // namely e.key
    // since we need to check that shiftKey is also not pressed - e.shiftKey return a boolean, whether or not the shiftKey was pressed when the event was fired
    function enterHandler(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            inputSubmissionHandler(e);
        }
    }

    async function inputSubmissionHandler(e) {
        e.preventDefault();
        setIsFetchingResponse(true);
        const response = await fetch("/api/server", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: userInput }),
        });
        if (response.ok) {
            const data = await response.json();
            setIsFetchingResponse(false);
            setResponse(data.result);

            // dialogue history is a feature planned for future release - conversation-like UI is intended
            // setDialogueHistory(prevDialogueHistory => [
            //                                             ...prevDialogueHistory,
            //                                             {
            //                                                 userInput: userInput,
            //                                                 response: data.result
            //                                             }
            //                                           ]
            // );
            // console.log(dialogueHistory);
        }
    }

    return (
        <div
            className={style["dialogue-wrapper"]}
            id={isLoaded ? style["dialogue-wrapper-loaded"] : ""}
            data-testid="dialogue-wrapper"
        >
            <div className={style["dialogue-core"]}>
                <div className={style["user-input-wrapper"]}>
                    <svg
                        className={style["user-input-arrow-right"]}
                        width="39"
                        height="39"
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.4795 26.9587L20.922 19.5L13.4795 12.0412L15.7707 9.75L25.5207 19.5L15.7707 29.25L13.4795 26.9587Z"
                            fill="#FFC226"
                        />
                    </svg>
                    <form
                        onSubmit={(e) => inputSubmissionHandler(e)}
                        className={style["input-form"]}
                    >
                        <textarea
                            type="text"
                            value={userInput}
                            placeholder="Type your prompt here..."
                            className={style["user-input"]}
                            onChange={(e) => userInputChangeHandler(e)}
                            autoComplete="off"
                            onKeyPress={(e) => enterHandler(e)}
                            data-testid="user-input"
                        />
                        <div className={style["user-input-button-group"]}>
                            <ResetPromptButton
                                setUserInput={setUserInput}
                                setResponse={setResponse}
                            />
                            <SubmitPromptButton
                                isEnabled={!!userInput}
                                inputSubmissionHandler={inputSubmissionHandler}
                            />
                        </div>
                    </form>
                </div>
                <div className={style["openresponse-wrapper"]}>
                    <svg
                        className={style["openresponse-input-logo"]}
                        // if the AI has already responded, set the logo to the active state
                        // otherwise, check to see if the user is typing. Then, if the user is typing, set it to active
                        // otherwise, set the style to idle
                        id={!!response ? "" : isUserTyping ? "" : style["idle"]}
                        width="39"
                        height="39"
                        viewBox="0 0 39 39"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M23.5625 4.875C23.5625 5.33 23.205 5.6875 22.75 5.6875C22.295 5.6875 21.9375 5.33 21.9375 4.875C21.9375 4.42 22.295 4.0625 22.75 4.0625C23.205 4.0625 23.5625 4.42 23.5625 4.875ZM9.75 8.125C8.85625 8.125 8.125 8.85625 8.125 9.75C8.125 10.6438 8.85625 11.375 9.75 11.375C10.6438 11.375 11.375 10.6438 11.375 9.75C11.375 8.85625 10.6438 8.125 9.75 8.125ZM9.75 14.625C8.85625 14.625 8.125 15.3562 8.125 16.25C8.125 17.1438 8.85625 17.875 9.75 17.875C10.6438 17.875 11.375 17.1438 11.375 16.25C11.375 15.3562 10.6438 14.625 9.75 14.625ZM8.125 22.75C8.125 21.8563 8.85625 21.125 9.75 21.125C10.6438 21.125 11.375 21.8563 11.375 22.75C11.375 23.6437 10.6438 24.375 9.75 24.375C8.85625 24.375 8.125 23.6437 8.125 22.75ZM8.125 29.25C8.125 28.3563 8.85625 27.625 9.75 27.625C10.6438 27.625 11.375 28.3563 11.375 29.25C11.375 30.1437 10.6438 30.875 9.75 30.875C8.85625 30.875 8.125 30.1437 8.125 29.25ZM4.0625 16.25C4.0625 15.795 4.42 15.4375 4.875 15.4375C5.33 15.4375 5.6875 15.795 5.6875 16.25C5.6875 16.705 5.33 17.0625 4.875 17.0625C4.42 17.0625 4.0625 16.705 4.0625 16.25ZM34.9375 16.25C34.9375 16.705 34.58 17.0625 34.125 17.0625C33.67 17.0625 33.3125 16.705 33.3125 16.25C33.3125 15.795 33.67 15.4375 34.125 15.4375C34.58 15.4375 34.9375 15.795 34.9375 16.25ZM22.75 11.375C23.6437 11.375 24.375 10.6438 24.375 9.75C24.375 8.85625 23.6437 8.125 22.75 8.125C21.8563 8.125 21.125 8.85625 21.125 9.75C21.125 10.6438 21.8563 11.375 22.75 11.375ZM4.875 21.9375C4.42 21.9375 4.0625 22.295 4.0625 22.75C4.0625 23.205 4.42 23.5625 4.875 23.5625C5.33 23.5625 5.6875 23.205 5.6875 22.75C5.6875 22.295 5.33 21.9375 4.875 21.9375ZM15.4375 34.125C15.4375 33.67 15.795 33.3125 16.25 33.3125C16.705 33.3125 17.0625 33.67 17.0625 34.125C17.0625 34.58 16.705 34.9375 16.25 34.9375C15.795 34.9375 15.4375 34.58 15.4375 34.125ZM16.25 5.6875C16.705 5.6875 17.0625 5.33 17.0625 4.875C17.0625 4.42 16.705 4.0625 16.25 4.0625C15.795 4.0625 15.4375 4.42 15.4375 4.875C15.4375 5.33 15.795 5.6875 16.25 5.6875ZM17.875 9.75C17.875 10.6438 17.1438 11.375 16.25 11.375C15.3562 11.375 14.625 10.6438 14.625 9.75C14.625 8.85625 15.3562 8.125 16.25 8.125C17.1438 8.125 17.875 8.85625 17.875 9.75ZM16.25 20.3125C14.9012 20.3125 13.8125 21.4013 13.8125 22.75C13.8125 24.0987 14.9012 25.1875 16.25 25.1875C17.5988 25.1875 18.6875 24.0987 18.6875 22.75C18.6875 21.4013 17.5988 20.3125 16.25 20.3125ZM27.625 22.75C27.625 21.8563 28.3563 21.125 29.25 21.125C30.1437 21.125 30.875 21.8563 30.875 22.75C30.875 23.6437 30.1437 24.375 29.25 24.375C28.3563 24.375 27.625 23.6437 27.625 22.75ZM29.25 27.625C28.3563 27.625 27.625 28.3563 27.625 29.25C27.625 30.1437 28.3563 30.875 29.25 30.875C30.1437 30.875 30.875 30.1437 30.875 29.25C30.875 28.3563 30.1437 27.625 29.25 27.625ZM27.625 16.25C27.625 15.3562 28.3563 14.625 29.25 14.625C30.1437 14.625 30.875 15.3562 30.875 16.25C30.875 17.1438 30.1437 17.875 29.25 17.875C28.3563 17.875 27.625 17.1438 27.625 16.25ZM29.25 8.125C28.3563 8.125 27.625 8.85625 27.625 9.75C27.625 10.6438 28.3563 11.375 29.25 11.375C30.1437 11.375 30.875 10.6438 30.875 9.75C30.875 8.85625 30.1437 8.125 29.25 8.125ZM33.3125 22.75C33.3125 22.295 33.67 21.9375 34.125 21.9375C34.58 21.9375 34.9375 22.295 34.9375 22.75C34.9375 23.205 34.58 23.5625 34.125 23.5625C33.67 23.5625 33.3125 23.205 33.3125 22.75ZM22.75 27.625C21.8563 27.625 21.125 28.3563 21.125 29.25C21.125 30.1437 21.8563 30.875 22.75 30.875C23.6437 30.875 24.375 30.1437 24.375 29.25C24.375 28.3563 23.6437 27.625 22.75 27.625ZM21.9375 34.125C21.9375 33.67 22.295 33.3125 22.75 33.3125C23.205 33.3125 23.5625 33.67 23.5625 34.125C23.5625 34.58 23.205 34.9375 22.75 34.9375C22.295 34.9375 21.9375 34.58 21.9375 34.125ZM16.25 13.8125C14.9012 13.8125 13.8125 14.9012 13.8125 16.25C13.8125 17.5988 14.9012 18.6875 16.25 18.6875C17.5988 18.6875 18.6875 17.5988 18.6875 16.25C18.6875 14.9012 17.5988 13.8125 16.25 13.8125ZM14.625 29.25C14.625 28.3563 15.3562 27.625 16.25 27.625C17.1438 27.625 17.875 28.3563 17.875 29.25C17.875 30.1437 17.1438 30.875 16.25 30.875C15.3562 30.875 14.625 30.1437 14.625 29.25ZM22.75 20.3125C21.4013 20.3125 20.3125 21.4013 20.3125 22.75C20.3125 24.0987 21.4013 25.1875 22.75 25.1875C24.0987 25.1875 25.1875 24.0987 25.1875 22.75C25.1875 21.4013 24.0987 20.3125 22.75 20.3125ZM20.3125 16.25C20.3125 14.9012 21.4013 13.8125 22.75 13.8125C24.0987 13.8125 25.1875 14.9012 25.1875 16.25C25.1875 17.5988 24.0987 18.6875 22.75 18.6875C21.4013 18.6875 20.3125 17.5988 20.3125 16.25Z"
                        />
                    </svg>
                    {isFetchingResponse ? (
                        <TypingPlaceholder />
                    ) : (
                        <div
                            className={style["response-text-wrapper"]}
                            data-testid="response-text-wrapper"
                        >
                            {responseParsed}
                        </div>
                    )}
                </div>
            </div>
            <StatusIndicator />
        </div>
    );
}
