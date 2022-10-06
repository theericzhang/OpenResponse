import React from "react";
import style from './TypingPlaceholder.module.css';

export default function TypingPlaceholder () {
    return (
        <div className={style["typing"]}>
            <span className={style["circle-scaling"]}></span>
            <span className={style["circle-scaling"]}></span>
            <span className={style["circle-scaling"]}></span>
        </div>
    )
}