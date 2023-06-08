import { Page } from "@components";
import { ILoginErrors } from "@interfaces";
import { useAppDispatch } from "@store";
import { authorizeUserOld } from "@store/slice";
import React from "react";

const initialErrors: ILoginErrors = {
  email: "",
  password: "",
};

export const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errors, setErrors] = React.useState<ILoginErrors>(initialErrors);

  const checkValidations = (): boolean => {
    if (email.trim().length === 0) {
      setErrors({ ...initialErrors, email: "Please write your email" });
      return false;
    } else if (password.trim().length === 0) {
      setErrors({ ...initialErrors, password: "Вы не ввели Password" });
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    const validResult: boolean = checkValidations();
    if (!validResult) return;
    dispatch(authorizeUserOld(email, password));
  };

  return (
    <Page title="Вход">
      <div className="login">
        <div className="login__form form">
          <div className="login__title form__title title">Log In</div>
          <label className="form__label label">
            <p className="form__label-name">Email</p>
            <div className="login__input form__label-input">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="name@company.example"
              />
            </div>
            {errors.email !== "" && (
              <div className="form__error">{errors.email}</div>
            )}
          </label>
          <label className="form__label label">
            <p className="form__label-name">Password</p>
            <div className="login__input form__label-input">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="************"
              />
            </div>
            {errors.password !== "" && (
              <div className="form__error">{errors.password}</div>
            )}
            {/* <div className='login__forget-password'>
              Забыли Password?
            </div> */}
          </label>
          <button className="login__submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </div>
    </Page>
  );
};
