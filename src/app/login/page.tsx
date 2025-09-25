import Link from "next/link";

import styles from "./page.module.css";
import { LoginForm } from "../ui/components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.div_button}>
            <Link href="/" className={styles.button_back}>
              {"<<"}
            </Link>
          </div>
          <h2 className={styles.title}>Please login</h2>
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
