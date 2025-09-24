import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.thumb}>
            <Image
              src="/images/Booking.png"
              alt="photo"
              className={styles.photo}
              width={300}
              height={300}
              priority
            />
          </div>
          <h1 className={styles.title}>Welcome to Booking System !</h1>
          <div className={styles.buttons}>
            <Link href="/register" className={styles.button}>
              Register
            </Link>
            <Link href="/login" className={styles.button}>
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
