import React, { useCallback, useState } from "react";
import { loginStateTypes } from "../types";
import { validateEmail, validatePassword } from "modules/validators";
import { loginActions as loginReduxActions } from "redux/login";
import { useDispatch } from "react-redux";
import { useEventCallback } from "modules/common/hooks";

const initialState = {
  email: {
    value: "",
    isValid: false,
    showError: false,
  },
  password: {
    value: "",
    isValid: false,
    showError: false,
  },
};

const useLogin = () => {
  // hooks
  const [state, setState] = useState<loginStateTypes>(initialState);
  const dispatch = useDispatch();

  /*
     =================================================================
     --------------------- login Methods start -----------------------
     =================================================================
  */

  const handleInputValueChange = useEventCallback(
    (key: keyof loginStateTypes, value: string) => {
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    }
  );

  const handleInputValidationOnBlur = useEventCallback(
    (field: keyof loginStateTypes, value: string) => {
      let isValid = false;
      switch (field) {
        case "email":
          isValid = validateEmail(value);
          setState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
          break;

        case "password":
          isValid = validatePassword(value);
          setState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
          break;

        default:
          break;
      }
    }
  );

  const handleLogin = useEventCallback(() => {
    dispatch(loginReduxActions.processUserLogin());
  });

  /*
     =================================================================
     --------------------- login Methods End -------------------------
     =================================================================
  */

  const loginActions = {
    handleLogin,
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    state,
    loginActions,
  };
};

export default useLogin;
