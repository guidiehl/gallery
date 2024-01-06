import styles from './Spinner.module.css';

/**
 * The Spinner component is responsible for displaying a loading spinner.
 * The Spinner component renders an animated graphic that gives the visual feedback of a spinning wheel.
 */

export default function Spinner() {

return (
    <div className={styles["center-container"]}>
        <span className={styles["loader"]}></span>
    </div>
);

}