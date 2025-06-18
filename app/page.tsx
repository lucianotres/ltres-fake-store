import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <a href="produtos" className={styles.link}>
          <h3 className={styles.title}>Fake Store Products</h3>
        </a>
      </main>
    </div>
  );
}
