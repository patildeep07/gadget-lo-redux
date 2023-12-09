import "./Login.css";

import LoginAnimation from "../../assets/Lottie_Animations/loginAnimation.json";
import Lottie from "lottie-react";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const Login = () => {
  // Which form should be shown?
  const [searchParams, setSearchParams] = useSearchParams({ signup: false });
  const showSignup = searchParams.get("signup") === "true";

  // Storing data for sign up form
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
    mobileNumber: 0,
  });

  const signupButtonHandler = () => {
    const { email, userName, password, confirmPassword, mobileNumber } =
      signUpForm;
    if (
      email.trim() &&
      userName.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      mobileNumber > 0
    ) {
      if (password === confirmPassword) {
        console.log({ signUpForm });
      } else {
        alert("Passwords dont match");
      }
    } else {
      alert("Enter all details");
    }
  };

  // UI
  return (
    <div>
      {/* Login */}(
      <div className="login-container">
        <div className="flex-row">
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

                <input placeholder="Enter registered mail id" />

                <input placeholder="Password" />

                <button className="button-style cursor">Login</button>
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