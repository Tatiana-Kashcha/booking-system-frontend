import { EditForm } from "@/app/ui/components/EditForm/EditForm";
import styles from "./page.module.css";

export default function ProfilePage() {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.profile_div}>
            <h2 className={styles.title}>My profile card</h2>
            <EditForm />
            
          </div>
        </div>
      </section>
    </main>
  );
}
