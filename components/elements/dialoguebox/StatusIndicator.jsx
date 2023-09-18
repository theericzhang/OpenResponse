import style from "./StatusIndicator.module.css";
export default function StatusIndicator() {
    let statuses = [
        "OpenResponse is operational",
        "OpenResponse is experiencing degraded performance",
        "Active Incident",
    ];
    let fillColors = {
        operational: "#67CE67",
        degraded: "#CF7914",
        incedent: "#FF3131",
    };
    return (
        <div class={style["status-indicator-wrapper"]}>
            <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class={style["status-indicator-dot"]}
            >
                <circle cx="4" cy="4" r="4" fill={fillColors["operational"]} />
                {/* TODO: watch fillColors and change colors accordingly to status of API. */}
            </svg>
        </div>
    );
    // TODO: Create styles for this status indicator - move position to bottom right according to figma doc
}
