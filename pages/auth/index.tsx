import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import styles from "../../styles/components/auth/Auth.module.scss";

import Card from "../../components/UI/Card";
import Button from "../../components/UI/Button";
import FormControl from "../../components/auth/FormControl";
import { userContext } from "../../context/User";
import axios from "../../context/customAxios";
import { basketContext } from "../../context/Basket";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

type values_type = {
  email: string;
  password: string;
};
type errors_type = {
  email: boolean;
  password: boolean;
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
  });
  const [errors, setErrors] = useState<errors_type>({
    email: false,
    password: false,
  });
  const [loading, setloading] = useState(false);
  const router = useRouter();
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
      errorMessage: "رمز عبور را وارد کنید",
      label: "رمز عبور",
      pattern: /./,
      required: true,
      autoComplete: "off",
    },
  ];
  const { setUserData, userData } = useContext(userContext);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
    if (!ready) return;
    if (userData.isLoggedIn) router.push("/user");
  }, [userData.isLoggedIn, ready]);
  const { dispatch } = useContext(basketContext);
  function handleSubmit(event: any) {
    event.preventDefault();
    const isOk = inputs.every((input) => {
      const regex = new RegExp(input.pattern);
      const value = values[input.name as ObjectKey];
      return regex.test(value);
    });
    if (isOk) {
      setloading(true);
      (async () => {
        const response = await toast.promise(
          axios.post("auth/login", {
            email: values.email,
            password: values.password,
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
                if (data?.data.succeeded) {
                  setUserData({ email: data.data.email, isLoggedIn: true });
                  Cookies.set("token", data.data.token, { expires: 30 });
                  Cookies.set("email", data.data.email, { expires: 30 });
                  return <p>ورود انجام شد</p>;
                }
                return "";
              },
            },
            error: {
              render({ data }) {
                setloading(false);
                if (!data.response.data.succeeded) return <p>یوزر یافت نشد</p>;
              },
            },
          }
        );
        if (response?.data.succeeded) {
          router.push("/user");
        }
      })();
      // (async () => {
      //   const { data: payload } = await axios.get(
      //     `http://localhost:3001/basket`
      //   );
      //   Array.isArray(payload)
      //     ? dispatch({ type: "ADD_ALL", payload })
      //     : dispatch({ type: "ADD_ALL", payload: [] });
      // })();
    } else return;
  }
  const handleError = (e: any) => {
    const regex = new RegExp(
      inputs.filter((input) => input.name === e.target.name)[0].pattern
    );
    if (regex.test(e.target.value)) {
      setErrors((prev) => ({ ...prev, [e.target.name]: false }));
    } else {
      setErrors((prev) => ({ ...prev, [e.target.name]: true }));
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
          <h3>ورود</h3>
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
