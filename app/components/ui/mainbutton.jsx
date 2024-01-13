import styles from "./Buttons.module.css";

export default function MainButton({ callback, label, note, children }) {
  return (
    <div>
      {note && (
        <button
          type="button"
          aria-label={label}
          className={styles["main-button"]}
          onClick={callback}
        >
          <div className={styles["inner-button-wrapper"]}>
            <span>{children}</span>
            <span className={styles["button-note"]}>{note}</span>
          </div>
        </button>
      )}
    </div>
  );
}