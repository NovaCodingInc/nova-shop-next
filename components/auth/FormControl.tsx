import styles from "../../styles/components/auth/Formcontrol.module.scss";
import Input from "../UI/Input";

function FormControl(props: any) {
  const {
    pattern,
    label,
    errorMessage,
    onChange,
    id,
   hasError,
    ...inputProps
  } = props;
  return (
    <div className={styles.formControl}>
      <label>{label}</label>
      <Input {...inputProps} onChange={onChange} />
      {hasError && <span>{errorMessage}</span>}
    </div>
  );
}
export default FormControl;
