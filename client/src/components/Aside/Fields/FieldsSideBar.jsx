import style from "./FieldsSideBar.module.scss";

const FieldSideBar = ({ id, text, children }) => {
  return (
    <div className={style.filterContainer}>
      <label htmlFor={id}>{text}</label>
      {children}
    </div>
  );
};

export default FieldSideBar;

// Props:

// id: Unique identifier for the filter section.
// text: Text label for the filter section.
// children: The children components, which are typically dropdowns or select elements.
// Render Method:

// The component renders a label for the filter section and includes its children components (usually dropdowns or select elements).
