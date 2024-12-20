import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Loader = ({ loading, color = "#1352f3", size = 150 }) => {
  return (
    <div style={styles.container}>
      <FadeLoader color={color} loading={loading} size={size} />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
  },
};

export default Loader;
