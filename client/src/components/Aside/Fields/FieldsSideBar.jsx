import style from "./FieldsSideBar.module.scss";

// define a functional component called FieldSideBar with props: id, text, and children
const FieldSideBar = ({ id, text, children }) => {
  return (
    <div className={style.filterContainer}>
      {/* render a label element associated with an input field using the 'for' attribute */}
      <label htmlFor={id}>{text}</label>
      {/* render child components or elements passed to this component */}
      {children} 
    </div>
  );
};

export default FieldSideBar; // export the FieldSideBar component as the default export of this module

// props:

// id: unique identifier for the filter section
// text: text label for the filter section
// children: the children components, which are typically dropdowns or select elements
// Render Method: the component renders a label for the filter section and includes its children components (usually dropdowns or select elements)
