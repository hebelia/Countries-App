import { useRef } from "react"; // useRef hook from React.

import imgOK from "/img/ok_Icon.png"; // for the "success" type.
import imgError from "/img/error_icon.png"; //  for the "error" type.

import style from "./Alert.module.scss"; // Import CSS module styles for the Alert component.
import styleBackground from "../../views/ActivityForm/ActivityForm.module.scss"; // Import CSS module styles for background (used in ActivityForm).

const Alert = ({ title, text, textBTN, background, type }) => {
  // Define the Alert functional component with props: title, text, textBTN, background, and type.
  const alert = useRef(); // Create a ref for the alert element.

  const handleOnClick = (e) => {
    // Define a click event handler for the button.
    e.preventDefault(); // Prevent the default behavior of anchor tags (prevents page reload).

    background.current.classList.toggle(styleBackground.showVisibility); // Toggle the visibility of the background element.
    alert.current.classList.toggle(`${style.openPopUp}`); // Toggle the open state of the alert popup.
  };

  return (
    <div ref={alert} className={style.popup}>
      {/* Render the alert popup with conditional content based on the "type" prop. */}
      <img
        className={style.img}
        src={type === "success" ? imgOK : imgError} // Display the appropriate icon based on the "type" prop.
        alt={"Icon"}
      />
      <h3 className={style.title}>{title}</h3> {/* Render the alert title. */}
      <p>{text}</p> {/* Render the alert text. */}
      <button onClick={handleOnClick} className={style.btn} href="#">
        {textBTN}
      </button>{" "}
      {/* Render a button with custom text and a click event handler. */}
    </div>
  );
};

export default Alert; // Export the Alert component for use in other parts of the application.
