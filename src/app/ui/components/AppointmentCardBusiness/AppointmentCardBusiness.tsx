import Image from "next/image";

import { AppointmentBusinessDto } from "../../types/appointments/dto/appointment-response.dto";
import { Appointment } from "../Appointment/Appointment";
import { AppointmensBtn } from "../AppointmensBtn/AppointmensBtn";
import styles from "./AppointmentCardBusiness.module.css";

export const AppointmentCardBusiness = ({
  item,
}: {
  item: AppointmentBusinessDto;
}) => {
  const { id, appointment_date, duration, status } = item;

  return (
    <div className={styles.client_div}>
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
          <h3 className={styles.title}>{item.client.name}</h3>

          <div className={styles.descriptions}>
            <p>
              Email •{" "}
              <span className={styles.descriptions_span}>
                {item.client.email}
              </span>
            </p>
          </div>
        </div>
        <AppointmensBtn id={id} showConfirm={true} />
      </div>
      <Appointment data={{ id, appointment_date, duration, status }} />
    </div>
  );
};
