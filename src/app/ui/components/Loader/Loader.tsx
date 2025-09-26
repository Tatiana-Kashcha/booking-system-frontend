import { Vortex } from "react-loader-spinner";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={styles.div_loader}>
      <Vortex
        visible={true}
        height="200"
        width="200"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={[
          "#886fb6",
          "#6395f199",
          "#886fb6",
          "#6395f199",
          "#6395f199",
          "#886fb6",
        ]}
      />
    </div>
  );
};

export default Loader;
