import React from "react";
import { Link } from "react-router-dom";

const styles = require("./index.css");

function Home() {
  return (
    <div className={styles.main}>
      <Link to="/match" className={styles.button}>Match</Link>
    </div>
  );
}

export default Home;
