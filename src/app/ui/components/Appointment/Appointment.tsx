import { AppointmentBaseDto } from "../../types/appointments/dto/appointment-response.dto";

import styles from "./Appointment.module.css";

export const Appointment = ({ data }: { data: AppointmentBaseDto }) => {
  return (
    <div className={styles.apointments_div}>
      <p>
        Appointment date •{" "}
        <span className={styles.descriptions_span}>
          {
            new Date(data.appointment_date)
              .toISOString()
              .replace("T", " ")
              .split(".")[0]
          }
        </span>
      </p>

      <p>
        Duration •{" "}
        <span className={styles.descriptions_span}>{data.duration} min</span>
      </p>
      <p>
        Status •{" "}
        <span className={styles.descriptions_status}>{data.status}</span>
      </p>
    </div>
  );
};
