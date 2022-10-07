import { useState } from "react";
const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  //kiem tra du lieu nhap vao co hop le hay khong
  const valueIsvalid = validateValue(enteredValue);
  const hasError = !valueIsvalid && isTouched;
  //ham lay value thay doi tu input
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  //ham blur
  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };
  //ham reset mac dinh
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };
  //tra ve ket qua
  return {
    value: enteredValue,
    hasError,
    isValid: valueIsvalid,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};
export default useInput;
