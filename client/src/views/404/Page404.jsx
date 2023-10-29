import { Link } from "react-router-dom";

import style from "./Page404.module.scss";

const Page404 = () => {
  return (
    <div className={style.container}>
      <div className={style.infoContainer}>
        <h4 className={style.title}>Error - 404</h4>
        <div className={style.containerAnimation}>
          <div className={style.globeLoader}>
            <h5>
              <span>&gt;_</span> End of the road... <h2>🛣</h2>
            </h5>
            <Link className={style.link} to="/home">
              ✈ Go back home 🗺
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page404;
