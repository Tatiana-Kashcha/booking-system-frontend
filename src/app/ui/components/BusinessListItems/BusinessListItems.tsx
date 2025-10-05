import Image from "next/image";
import Link from "next/link";
import { UserData } from "../../types/users/dto/user-response.dto";
import styles from "./BusinessListItems.module.css";

type BusinessListItemsProps = {
  userBusiness: UserData;
  currentUserId?: number;
};

export const BusinessListItems = ({
  userBusiness,
  currentUserId,
}: BusinessListItemsProps) => {
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
          {userBusiness.id === currentUserId ? (
            <h3 className={styles.title_current}>{userBusiness.name}</h3>
          ) : (
            <Link href={`/business/${userBusiness.id}`}>
              <h3 className={styles.title}>{userBusiness.name}</h3>
            </Link>
          )}

          <div className={styles.descriptions}>
            <p>
              Email •{" "}
              <span className={styles.descriptions_span}>
                {userBusiness.email}
              </span>
            </p>
            <p>
              Profession •{" "}
              <span className={styles.descriptions_span}>
                {userBusiness.profession ? userBusiness.profession : ""}
              </span>
            </p>
          </div>
        </div>
        {userBusiness.id === currentUserId ? (
          <p className={styles.button_current}>Visit</p>
        ) : (
          <Link
            href={`/business/${userBusiness.id}`}
            className={styles.button_appointments}
          >
            Visit
          </Link>
        )}
      </div>
      <p className={styles.p_profession}>
        {userBusiness.description ? userBusiness.description : ""}
      </p>
    </div>
  );
};
