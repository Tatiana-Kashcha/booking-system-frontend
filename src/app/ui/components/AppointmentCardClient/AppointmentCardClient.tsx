import Image from "next/image";
import Link from "next/link";

import { AppointmentClientDto } from "../../types/appointments/dto/appointment-response.dto";
import { Appointment } from "../Appointment/Appointment";
import { AppointmensBtn } from "../AppointmensBtn/AppointmensBtn";
import styles from "./AppointmentCardClient.module.css";

export const AppointmentCardClient = ({
  item,
}: {
  item: AppointmentClientDto;
}) => {
  const { id, appointment_date, duration, status } = item;

  return (
    <div className={styles.business_div}>
      <div className={styles.descriptions_div}>
        <div className={styles.thumb}>
          <Image
            src="/images/avatar.png"
            alt="photo"
            className={styles.photo}
            width={100}
            height={100}
          />
        </div>
        <div>
          <Link href={`/business/${item.business.id}`}>
            <h3 className={styles.title}>{item.business.name}</h3>
          </Link>

          <div className={styles.descriptions}>
            <p>
              Email •{" "}
              <span className={styles.descriptions_span}>
                {item.business.email}
              </span>
            </p>
            <p>
              Profession •{" "}
              <span className={styles.descriptions_span}>
                {item.business.profession}
              </span>
            </p>
          </div>
        </div>
        <div>
          <AppointmensBtn id={id} />
          <Link
            href={`/business/${item.business.id}`}
            className={styles.button_appointments}
          >
            Edit
          </Link>
        </div>
      </div>
      <Appointment data={{ id, appointment_date, duration, status }} />
    </div>
  );
};
