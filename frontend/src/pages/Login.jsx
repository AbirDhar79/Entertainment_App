import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, auth, useAuth, forgotPassword, GoogleLogin } from "../firebase-config";
import moviesLogo from "../assets/MovieLogo.svg";
import githubLogo from "../assets/GithubLogo.svg";
import googleLogo from "../assets/GoogleLogo.svg";

const Login = () => {
  const navigate = useNavigate();
  const currentUser = useAuth();

  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await GoogleLogin();
      navigate("/");
    } catch (error) {
      alert(error.message);

    }

  };
  async function handleLogin(e) {
    e.preventDefault();

    // check if email and password are empty
    if (emailRef.current.value === "" || passwordRef.current.value === "") {
      toast.error("Missing credentials!", {
        pauseOnHover: false,
      });
      return;
    }

    setLoading(true);
    try {
      await login(emailRef.current.value, passwordRef.current.value);
      // Toast Notification
      toast.success("Login Successful!", {
        pauseOnHover: false,
      });

      navigate("/");
    } catch (error) {
      // Toast Notification
      toast.error("Login Unsuccessful", {
        pauseOnHover: false,
      });
      console.error(error);
    }
    setLoading(false);
  }

  async function handleForgotPassword() {
    const email = emailRef.current.value;
    try {
      await forgotPassword(email)
      toast.success("Password reset email sent!", {
        pauseOnHover: false,
      });
    } catch (error) {
      toast.error("Failed to send password reset email!", {
        pauseOnHover: false,
      });
      console.error(error);
    }
  }

  return (
    <section className="flex flex-col justify-center items-center w-full h-screen px-6 font-light">
      <img
        src={moviesLogo}
        alt="Entertainment Webapp Logo"
        className="mb-[58px]"
      />
      <form
        onSubmit={handleLogin}
        className="bg-darkBlue flex flex-col w-full  p-6 rounded-[10px] text-[15px] md:max-w-[400px] md:p-8"
      >
        <h1 className=" mb-[40px] text-[32px] font">Login</h1>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email address"
          className="outline-none  border-b border-b-[#5A698F]  pl-4 pb-4 mb-6 bg-transparent"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="
            outline-none  border-b border-b-[#5A698F] pl-4 pb-4 mb-[40px] bg-transparent"
        />
        <button
          disabled={loading}
          className={
            loading
              ? `bg-redColor rounded-[6px] mb-6 py-4 cursor-not-allowed opacity-50`
              : "bg-redColor rounded-[6px] mb-6 py-4 cursor-pointer duration-500 hover:bg-primaryColor hover:text-darkBlue"
          }
        >
          Login to your account
        </button>
        <p className="text-center">Or  LogIn Using</p>
        <div className="flex flex-row max-w-sm gap-2 m-4">
          <button type="button" className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg " onClick={handleGoogleSignIn}>
            <img src={googleLogo} alt="googlelogo" className="mr-2" />
            Google
          </button>

          <button type="button" className="py-2 px-4 flex justify-center items-center  bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
            <img src={githubLogo} alt="githublogo" className="mr-2" />
            GitHub
          </button>

        </div>
        <div className="flex gap-x-2 text-[15px] self-center">
          <p className="">Don’t have an account?</p>
          <Link to="/signup" className="text-redColor ">
            Sign Up
          </Link>
        </div>
        <div className="flex gap-x-2 text-[15px] self-center mt-4">
          <p className="">Forgot your password?</p>
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-redColor cursor-pointer"
          >
            Reset Password
          </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default Login;
