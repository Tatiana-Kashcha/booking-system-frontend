import Link from "next/link";

import styles from "./page.module.css";
import { RegisterForm } from "../ui/components/RegisterForm/RegisterForm";

export default function RegisterPage() {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.div_button}>
            <Link href="/" className={styles.button_back}>
              {"<<"}
            </Link>
          </div>
          <h2 className={styles.title}>Please register</h2>
          <span className={styles.span}>
            {"("} Client or Business {")"}
          </span>
          <RegisterForm />
        </div>
      </section>
    </main>
  );
}
