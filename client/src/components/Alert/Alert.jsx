import { useRef } from "react"; // useRef hook from React

import imgOK from "/img/ok_Icon.png"; // for the "success" type
import imgError from "/img/error_icon.png"; //  for the "error" type

import style from "./Alert.module.scss"; // import CSS module styles for the Alert component
import styleBackground from "../../views/ActivityForm/ActivityForm.module.scss"; // import CSS module styles for background (used in ActivityForm)

const Alert = ({ title, text, textBTN, background, type }) => {
  // define the Alert functional component with props: title, text, textBTN, background, and type
  const alert = useRef(); // create a ref for the alert element

  const handleOnClick = (e) => {
    // define a click event handler for the button
    e.preventDefault(); // prevent the default behavior of anchor tags (prevents page reload)

    background.current.classList.toggle(styleBackground.showVisibility); // toggle the visibility of the background element
    alert.current.classList.toggle(`${style.openPopUp}`); // toggle the open state of the alert popup
  };

  return (
    <div ref={alert} className={style.popup}>
      {/* render the alert popup with conditional content based on the "type" prop */}
      <img
        className={style.img}
        // display the icon based on the type prop
        src={type === "success" ? imgOK : imgError}
        alt={"Icon"}
      />
      {/* alert title */}
      <h3 className={style.title}>{title}</h3>
      {/*alert text */}
      <p>{text}</p>
      {/* button with custom text and a click event handler */}
      <button onClick={handleOnClick} className={style.btn} href="#">
        {textBTN}
      </button>{" "}
    </div>
  );
};

export default Alert;
