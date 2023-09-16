import style from "./StatusIndicator.module.css";
export default function StatusIndicator() {
    let statuses = [
        "OpenResponse is operational",
        "OpenResponse is experiencing degraded performance",
        "Active Incident",
    ];
    return <div class={style["status-indicator-wrapper"]}>test</div>;
    // TODO: Create styles for this status indicator - move position to bottom right according to figma doc
}
