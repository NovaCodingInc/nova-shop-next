import { useState } from "react";
import styles from "../../styles/components/auth/Formcontrol.module.scss";
import Input from "../UI/Input";

function FormControl(props: any) {
  const { pattern, label, errorMessage, onChange, id, ...inputProps } = props;
  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <Input {...inputProps} onChange={onChange} />
      {/* <span>{errorMessage}</span> */}
    </div>
  );
}
export default FormControl;
