import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/components/auth/Auth.module.scss";
import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import FormControl from "../../components/auth/FormControl";
import axios from "../../context/customAxios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type values_type = {
  email: string;
  password: string;
  confirmPassword: string;
};
type errors_type = {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
};
type ObjectKey = keyof values_type;

type inputs_type = {
  id: number;
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  label: string;
  pattern: RegExp;
  required: boolean;
  autoComplete: string;
}[];

function Auth() {
  const [values, setValues] = useState<values_type>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<errors_type>({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const inputs: inputs_type = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Example@gmail.com",
      errorMessage: "آدرس ایمیل معتبر نمی باشد!",
      label: "ایمیل",
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      required: true,
      autoComplete: "off",
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
      autoComplete: "off",
    },
    {
      id: 3,
      name: "confirmPassword",
      type: "Password",
      placeholder: "تکرار رمز عبور خود را وارد کنید",
      errorMessage: "رمز عبور تطابق ندارد!",
      label: "تکرار رمز عبور",
      pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      required: true,
      autoComplete: "off",
    },
  ];

  const [loading, setloading] = useState(false);
  function handleSubmit(event: any) {
    event.preventDefault();
    const isOk = inputs.every((input) => {
      const regex = new RegExp(input.pattern);
      const value = values[input.name as ObjectKey];
      return regex.test(value);
    });
    if (isOk && values.password === values.confirmPassword) {
      setloading(true);
      (async () => {
        const response = await toast.promise(
          axios.post("auth/register", {
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          }),
          {
            pending: {
              render() {
                return <p>در حال بارگذاری</p>;
              },
            },
            success: {
              render({ data }) {
                setloading(false);
                if (data?.data.succeeded)
                  return <p>ثبت نام با موفقیت انجام شد</p>;
              },
            },
            error: {
              render({ data }) {
                setloading(false);

                if (
                  data.response.data.errors &&
                  data.response.data.errors.length
                ) {
                  return (
                    <ul>
                      {data.response.data.errors.map((item: any) => {
                        return <li key={item.code} style={{margin:'5px'}}>{item.description}</li>;
                      })}
                    </ul>
                  );
                } else {
                  return <p>عملیات با خطا مواجه شد</p>;
                }
              },
            },
          }
        );
      })();
    } else return;
  }
  const handleError = (e: any) => {
    if (e.target.name === "confirmPassword") {
      if (e.target.value === values.password)
        setErrors((prev) => ({ ...prev, [e.target.name]: false }));
      else setErrors((prev) => ({ ...prev, [e.target.name]: true }));
    } else {
      const regex = new RegExp(
        inputs.find((input) => input.name === e.target.name)?.pattern ?? ""
      );
      if (regex.test(e.target.value)) {
        setErrors((prev) => ({ ...prev, [e.target.name]: false }));
      } else {
        setErrors((prev) => ({ ...prev, [e.target.name]: true }));
      }
    }
  };

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  return (
    <div className="container py-2">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.content}>
          <h3>ساخت حساب</h3>
          {inputs.map((input) => (
            <FormControl
              key={input.id}
              {...input}
              value={values[input.name as ObjectKey]}
              onChange={onChange}
              onKeyUp={handleError}
              hasError={errors[input.name as ObjectKey]}
            />
          ))}
          <Button type="submit" className={styles.formBtn} disabled={loading}>
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
