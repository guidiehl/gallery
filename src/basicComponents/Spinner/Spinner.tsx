import styles from './Spinner.module.css';

/**
 * The Spinner component is responsible for displaying a loading spinner.
 * The Spinner component renders an animated graphic that gives the visual feedback of a spinning wheel.
 */

export default function Spinner() {

return (
    <div className={"center-container"}>
        <span data-testid='spinner' className={styles["loader"]}></span>
    </div>
);

}