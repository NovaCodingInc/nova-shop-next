import { useState } from "react";
import styles from "../../styles/components/auth/Formcontrol.module.scss";
import Input from "../UI/Input";

function FormControl(props: any) {
  const [focused, setFocused] = useState(false);
  const { pattern, label, errorMessage, onChange, id, ...inputProps } = props;
  const handleFocus = (e: any) => {
    setFocused(true);
  };
  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <Input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
}
export default FormControl;
