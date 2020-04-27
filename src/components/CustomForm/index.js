import React, {useState} from "react";
import {FcExpand} from "react-icons/fc";

import CustomDropDown from "../CutomDropDown";
import WarningDropDownMessage from "../WarningDropDownMessage";

const CustomForm = (props) => {
  const {id, typeOfAction, onSubmit, placeholder, showForm} = props;
  const idOrNull = id ? id : null;
  const [inputValue, setInputValue] = useState("");

  const strechInOrOutClass = showForm ? "show_custom_form" : "hide_custom_form";

  const setValue = (e) => {
    const {value} = e.target;
    setInputValue(value);
    //setShowWarning(false);
  };

  return (
    <form className={strechInOrOutClass} /* onSubmit={submitName} */>
      {showForm && (
        <div className={strechInOrOutClass}>
          <input
            name='description'
            type='text'
            placeholder={placeholder}
            value={inputValue}
            onChange={setValue}
            className={
              inputValue === "" ? "question_label" : "question_lable_active"
            }
          />

          <img
            src={require("../../assets/icons/arrow.png")}
            className={
              inputValue === "" ? "question_arrow" : "question_arrow_active"
            }
            alt='React Bootstrap logo'
            onClick={() => onSubmit(idOrNull, inputValue, typeOfAction)}
          />
        </div>
      )}
    </form>
  );
};

export default CustomForm;
