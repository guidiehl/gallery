import { getErrorMessage } from "../../utils";
import "./ErrorText.css";

/**
 * The ErrorText component is responsible for displaying error messages.
 * It receives an error message as a prop and renders it in a styled text element.
 */

export default function ErrorText({ error }: { error: Error | null}) {

    return (
        <div className="center-container">
            <p className="error-text">{getErrorMessage(error)}</p>
        </div>
    );
}