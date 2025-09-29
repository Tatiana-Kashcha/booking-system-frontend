import styles from "./page.module.css";
import { AppointmentList } from "@/app/ui/components/AppointmentList/AppointmentList";

export default function AppointmentsPage() {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <AppointmentList />
        </div>
      </section>
    </main>
  );
}
