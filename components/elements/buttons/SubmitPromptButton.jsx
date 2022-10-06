import React from "react";
import style from "./SubmitPromptButton.module.css";

export default function SubmitPromptButton ({ isEnabled, inputSubmissionHandler }) {
    return (
        <div className={style["submit-prompt-button-wrapper"]}>
            <button className={style["submit-prompt-button"]} onClick={inputSubmissionHandler} disabled={!isEnabled}>
                <svg className={style["submit-prompt-button-arrow"]} width="12" height="12" viewBox="0 0 12 12" fill="" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 6L1.0575 7.0575L5.25 2.8725V12H6.75V2.8725L10.935 7.065L12 6L6 0L0 6Z" fill=''/>
                </svg>
            </button>
            <div className={style["submit-prompt-button-hover-suggestion"]}>
                <h5 className={style["submit-prompt-button-hover-suggestion-text"]}>Submit</h5>
            </div>
        </div>
    )
}