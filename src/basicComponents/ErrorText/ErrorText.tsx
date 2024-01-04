import { getErrorMessage } from "../../utils";
import "./ErrorText.css";

export default function ErrorText({ error }: { error: Error | null}) {

    return (
        <div className="center-container">
            <p className="error-text">{getErrorMessage(error)}</p>
        </div>
    );
}