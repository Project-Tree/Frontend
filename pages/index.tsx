import type { NextPage } from "next";
import Header from "../components/Main/Header";
import useIPFS from "../hooks/useIPFS";
import style from "./index.module.css";

const Home: NextPage = () => {
  return (
    <div className={style.template}>
      <Header></Header>
      <div className={style.bodyTemplate}>
        <div className={style.body}>
          맘편한 <br /> 외식을 위해, <br /> 더 나은 외식
        </div>
      </div>
    </div>
  );
};

export default Home;
