import React from "react";
import style from "./Home.module.scss";
import { NavLink } from "react-router-dom";
import SideBar from "../../components/Aside/SideBar";
import Cards from "../../components/Cards/Cards";

// const Home = () => {
//   return (
//     <div>
//       <h1>Home</h1>
//       <p>Home page content</p>
//       <SideBar />
//       <Cards />
//       <NavLink>Return</NavLink>
//     </div>
//   );
// };
const Home = () => {
  return (
    <div className={style.container}>
      <SideBar />
      <Cards />
      {/* <NavLink>Return</NavLink> */}
    </div>
  );
};

export default Home;

// import style from './Home.module.css';
