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
  });
  const [errors, setErrors] = useState<any>({
    email: false,
    password: false,
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
      autoComplete : "off"
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
      autoComplete : "off"
    },
  ];
  function handleSubmit(event: any) {
    event.preventDefault();
    const isOk = inputs.every((input) => {
      const regex = new RegExp(input.pattern);
      const value = values[input.name];
      return regex.test(value);
    });
    if (isOk) alert("log in");
    else return;
  }
  const handleError = (e: any) => {
    const regex = new RegExp(
      inputs.filter((input: any) => input.name === e.target.name)[0].pattern
    );
    if (regex.test(e.target.value)) {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: false }));
    } else {
      setErrors((prev: any) => ({ ...prev, [e.target.name]: true }));
    }
  };

  function onChange(event: any) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  return (
    <div className="container py-2">
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.content}>
          <h3>ورود</h3>
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
            ورود
          </Button>
          <div className={styles.signup}>
            <span>حساب ندارید؟</span>
            <Link href="/auth/signup">
              <a>
                <h6>ثبت نام</h6>
              </a>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default Auth;
