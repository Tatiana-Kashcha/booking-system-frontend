import { BusinessCard } from "@/app/ui/components/BusinessCard/BusinessCard";
import styles from "./page.module.css";

export default function Business({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  return (
    <main>
      <section>
        <div className={styles.container}>
          <div className={styles.business_div}>
            <h2 className={styles.title}>This business user!</h2>
            <BusinessCard id={id} />
          </div>
        </div>
      </section>
    </main>
  );
}
