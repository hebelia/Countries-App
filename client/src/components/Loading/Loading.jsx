import style from "./Loading.module.scss";
import logo from "/img/logo2.png";

const Loading = () => {
  return (
    <div className={style.background}>
      <div className={style.containerLoading}>
        <div className={style.globeLoader}>
          <img className={style.img} src={logo} alt="Logo" />
          <h4>Loading... well this is embarrassing...</h4>
        </div>
        {/* <div class={style.loading}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div> */}
      </div>
    </div>
  );
};
export default Loading;
