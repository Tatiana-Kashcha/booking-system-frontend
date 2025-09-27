import styles from "./page.module.css";
import { BusinessList } from "@/app/ui/components/BusinessList/BusinessList";

export default async function BusinessPage() {
  return (
    <main>
      <section>
        <div className={styles.container}>
          <BusinessList />
        </div>
      </section>
    </main>
  );
}
