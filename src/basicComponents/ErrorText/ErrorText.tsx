import { getErrorMessage } from "../../utils";
import styles from "./ErrorText.module.css";

/**
 * The ErrorText component is responsible for displaying error messages.
 * It receives an error message as a prop and renders it in a styled text element.
 */

export default function ErrorText({ error }: { error: Error | null}) {

    return (
        <div className={styles["center-container"]}>
            <p className={styles["error-text"]}>{getErrorMessage(error)}</p>
        </div>
    );
}