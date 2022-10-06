import React from "react";
import style from './ResetPromptButton.module.css';

export default function ResetPromptButton({ setUserInput, setResponse }) {
    return (
        <div className={style["reset-button-wrapper"]}>
            <button className={style["reset-button"]}
                    onClick={() => {
                        setUserInput('');
                        setResponse('');
                    }}
                    type="reset"
            >
                <svg className={style["reset-button-icon"]} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path id="icon/navigation/refresh_24px" d="M13.2339 4.7625C12.1464 3.675 10.6539 3 8.99641 3C5.68141 3 3.00391 5.685 3.00391 9C3.00391 12.315 5.68141 15 8.99641 15C11.7939 15 14.1264 13.0875 14.7939 10.5H13.2339C12.6189 12.2475 10.9539 13.5 8.99641 13.5C6.51391 13.5 4.49641 11.4825 4.49641 9C4.49641 6.5175 6.51391 4.5 8.99641 4.5C10.2414 4.5 11.3514 5.0175 12.1614 5.835L9.74641 8.25H14.9964V3L13.2339 4.7625Z" fill="#808080"/>
                </svg>
            </button>
            <div className={style["reset-button-hover-suggestion"]}>
                <h5 className={style["reset-button-hover-suggestion-text"]}>Reset</h5>
            </div>
        </div>
    )
}