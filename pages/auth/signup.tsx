import { useState } from "react";
import Link from "next/link";

import styles from "../../styles/components/auth/Auth.module.scss";

import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import FormControl from "../../components/auth/FormControl";

function Auth() {
  const [values, setValues] = useState<any>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<any>({
    email: false,
    password: false,
    confirmPassword : false
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Example@gmail.com",
      errorMessage: "آدرس ایمیل معتبر نمی باشد!",
      label: "ایمیل",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      required: true,
      autoComplete : 'off'
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "رمز عبور خود را وارد کنید",
      errorMessage:
        "رمز عبور باید حداقل شامل  یک عدد  و یک حرف و بیشتر از 8 کاراکتر باشد!",
      label: "رمز عبور",
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      required: true,
      autoComplete : 'off'

    },
    {
      id: 3,
      name: "confirmPassword",
      type: "Password",
      placeholder: "تکرار رمز عبور خود را وارد کنید",
      errorMessage:
        "رمز عبور تطابق ندارد!",
      label: "تکرار رمز عبور",
      pattern: values.password,
      required: true,
      autoComplete : 'off'

    },
  ];
  function handleSubmit(event: any) {
    event.preventDefault();
    const isOk = inputs.every((input) => {
      const regex = new RegExp(input.pattern);
      const value = values[input.name];
      return regex.test(value);
    });
    if (isOk && values.password === values.confirmPassword) alert("log in");
    else return;
  }
  const handleError = (e: any) => {
    if(e.target.name === "confirmPassword"){
      if(e.target.value === values.password) setErrors((prev: any) => ({ ...prev, [e.target.name]: false }));
      else setErrors((prev: any) => ({ ...prev, [e.target.name]: true }));
    }else{
      const regex = new RegExp(
        inputs.filter((input: any) => input.name === e.target.name)[0].pattern
      );
      if (regex.test(e.target.value)) {
        setErrors((prev: any) => ({ ...prev, [e.target.name]: false }));
      } else {
        setErrors((prev: any) => ({ ...prev, [e.target.name]: true }));
      }
    }
   
  };


  function onChange(event: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  return (
    <div className="container py-2">
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.content}>
          <h3>ساخت حساب</h3>
          {inputs.map((input) => (
            <FormControl
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
            onKeyUp={handleError}
            hasError={errors[input.name]}
            />
          ))}
          <Button type="submit" className={styles.formBtn}>
            ساخت حساب
          </Button>
          <div className={styles.signup}>
            <span>حساب دارید؟</span>
            <Link href="/auth">
              <a>
                <h6>ورود</h6>
              </a>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default Auth;
