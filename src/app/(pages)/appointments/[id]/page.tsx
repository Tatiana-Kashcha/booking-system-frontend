import styles from "./page.module.css";

export default function Appointment({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);

  return (
    <main>
      <section>
        <div className={styles.container}>
          <h2>This appointment cart {id}</h2>
        </div>
      </section>
    </main>
  );
}
