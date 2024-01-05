import "./Login.css";

import LoginAnimation from "../../assets/Lottie_Animations/loginAnimation.json";
import Lottie from "lottie-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup } from "../../features/Users/UserSlice";

// Toast
import { toast } from "react-toastify";

export const Login = () => {
  // Dispatch
  const dispatch = useDispatch();

  // user information
  // const users = useSelector((state) => state.users);

  // Which form should be shown?
  const [searchParams, setSearchParams] = useSearchParams({ signup: false });
  const showSignup = searchParams.get("signup") === "true";

  // Storing data for sign up form
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    mobileNumber: 0,
  });

  const signupButtonHandler = () => {
    const {
      email,
      userName,
      firstName,
      lastName,
      password,
      confirmPassword,
      mobileNumber,
    } = signUpForm;
    if (
      email.trim() &&
      userName.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      lastName.trim() &&
      firstName.trim() &&
      mobileNumber > 0
    ) {
      if (password === confirmPassword) {
        dispatch(signup(signUpForm));

        setSignUpForm({
          email: "",
          userName: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
          mobileNumber: 0,
        });

        setSearchParams((prev) => {
          prev.set("signup", false);
          return prev;
        });
      } else {
        toast.error("Passwords dont match");
      }
    } else {
      toast.error("Fill all details");
    }
  };

  // Login
  // Storing login data
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const loginButtonHandler = () => {
    const { email, password } = loginForm;

    if (email.trim() && password.trim()) {
      dispatch(login(loginForm));

      setLoginForm({
        email: "",
        password: "",
      });
    } else {
      toast.error("Fill your login details");
    }
  };

  // UI
  return (
    <div>
      {/* Login */}
      <div className="login-container">
        <div className="flex-row mobile-login-container">
          {/* Left container */}
          <div className="image-container flex-column space-between">
            {/* Data */}
            <div className="padding-right-25px">
              <h2>Where are we?</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>

            {/* Image icon */}
            <Lottie animationData={LoginAnimation} />
          </div>

          {/* Right container */}

          {!showSignup && (
            <div className="info-container flex-column space-between">
              {/* Data */}
              <div className="flex-column align-start gap-10px">
                <h2>Log in</h2>

                <input
                  onChange={(e) =>
                    setLoginForm({
                      ...loginForm,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter registered mail id"
                />

                <input
                  type="password"
                  onChange={(e) =>
                    setLoginForm({
                      ...loginForm,
                      password: e.target.value,
                    })
                  }
                  placeholder="Password"
                />

                <button
                  onClick={loginButtonHandler}
                  className="button-style cursor"
                >
                  Login
                </button>
              </div>

              {/* Register */}

              <p
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("signup", true);
                    return prev;
                  })
                }
                className="login-link-style cursor"
              >
                New here? Create an account
              </p>
            </div>
          )}

          {showSignup && (
            <div className="info-container flex-column space-between">
              {/* Data */}
              <div className="flex-column align-start gap-10px">
                <h2>Sign up</h2>

                <div className="flex-row gap-10px name-div">
                  <input
                    placeholder="First Name"
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        firstName: e.target.value,
                      })
                    }
                  />

                  <input
                    placeholder="Last Name"
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>

                <input
                  placeholder="Email id"
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      email: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Password"
                  type="password"
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      password: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Confirm password"
                  type="password"
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      confirmPassword: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Username"
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      userName: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Mobile number"
                  type="Number"
                  onChange={(e) =>
                    setSignUpForm({
                      ...signUpForm,
                      mobileNumber: e.target.value,
                    })
                  }
                />

                <button
                  className="button-style cursor width-250px"
                  onClick={signupButtonHandler}
                >
                  Create a new account
                </button>
              </div>

              {/* Register */}

              <p
                onClick={() =>
                  setSearchParams((prev) => {
                    prev.set("signup", false);
                    return prev;
                  })
                }
                className="login-link-style cursor"
              >
                Already have an account? Proceed to log in
              </p>
            </div>
          )}
        </div>

        {/* Login End */}
      </div>
      ){/* End */}
    </div>
  );
};
