import { NavigationList } from "../NavigationList/NavigationList";
import { LogoutBtn } from "../LogoutBtn/LogoutBtn";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavigationList />

        <LogoutBtn />
      </div>
    </header>
  );
};
