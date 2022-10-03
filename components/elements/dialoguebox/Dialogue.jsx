import React from "react";
import style from './Dialogue.module.css';

export default function Dialogue () {
    return (
        <div className={style["dialogue-wrapper"]}>
            <div className={style["user-input-wrapper"]}>
                <svg className={style["user-input-arrow-right"]} width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4795 26.9587L20.922 19.5L13.4795 12.0412L15.7707 9.75L25.5207 19.5L15.7707 29.25L13.4795 26.9587Z" fill="#FFC226"/>
                </svg>
                <input type="text" className={style["user-input"]} />
            </div>
        </div>
    );
}