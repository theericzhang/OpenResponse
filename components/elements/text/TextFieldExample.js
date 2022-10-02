import React from "react";
import styles from './TextFieldExample.module.css';

export default function TextFieldExample ({ text, textColor }) {
    return (
        <div className={styles["textfield-wrapper"]} 
             style={
                {color: textColor}
             } 
        >
            <h3 className={styles["textfield-text"]}>{text}</h3>
        </div>
    );
}