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
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Example@gmail.com",
      errorMessage: "آدرس ایمیل معتبر نمی باشد!",
      label: "ایمیل",
      pattern: `^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$`,
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "رمز عبور خود را وارد کنید",
      errorMessage:
        "رمز عبور باید حداقل شامل یک حرف، یک عدد و بیشتر از 8 کاراکتر باشد!",
      label: "رمز عبور",
      pattern: `^(?=.*\d).{8,}$`,
      required: true,
    },
  ];
  function handleSubmit(event: any) {
    event.preventDefault();
  }

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