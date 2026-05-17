import styles from "../../styles/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { UserAuth } from "../../context/AuthContext";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { signup, isLoggedOut, loading } = UserAuth();

  if (!loading && !isLoggedOut) {
    return <Navigate to="/" replace />;
  }

  function handleInputs(e) {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const validateForm = () => {
    if (!signupData.name.trim()) {
      setMsg("Name is required.");
      return false;
    }
    if (!signupData.email.trim()) {
      setMsg("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      setMsg("Please enter a valid email address.");
      return false;
    }
    if (!signupData.country.trim()) {
      setMsg("Please enter your country.");
      return false;
    }
    if (!signupData.phone.trim()) {
      setMsg("Please enter your phone number.");
      return false;
    }
    if (!signupData.password) {
      setMsg("Password is required.");
      return false;
    }
    if (signupData.password.length < 6) {
      setMsg("Password must be at least 6 characters long.");
      return false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setMsg("Password doesn't match the confirmation.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError(true);
      return;
    }

    setError(false);
    setMsg("");
    setSubmitting(true);

    try {
      await signup({
        name: signupData.name,
        email: signupData.email,
        country: signupData.country,
        phone: signupData.phone,
        password: signupData.password,
      });
      navigate("/", { replace: true });
    } catch (err) {
      setError(true);
      setMsg(err.message || "Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-[white] max-w-[700px] m-auto mt-10 mb-20 relative rounded-xl shadow-md">
      <h2 className="sm:text-[35px] text-[25px] pt-[20px] font-bold text-center">
        Sign Up
      </h2>
      <form
        className="sm:px-[50px] pt-5 px-[20px] pb-0"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col mb-8">
          <label className="font-bold text-[grey]" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            className={styles.inputStyle}
            type="text"
            name="name"
            placeholder="Type Your Name"
            value={signupData.name}
            onChange={handleInputs}
            maxLength="20"
          />
        </div>
        <div className="flex flex-col mb-8">
          <label className="font-bold text-[grey]" htmlFor="email">
            Email
          </label>
          <input
            className={styles.inputStyle}
            type="email"
            id="email"
            name="email"
            placeholder="Type Your Email"
            value={signupData.email}
            onChange={handleInputs}
            maxLength="40"
          />
        </div>
        <div className="flex flex-col my-5 mb-8">
          <label className="font-bold text-[grey]" htmlFor="country">
            Country
          </label>
          <input
            className={styles.inputStyle}
            type="text"
            id="country"
            name="country"
            placeholder="Your Country"
            value={signupData.country}
            onChange={handleInputs}
            maxLength="30"
          />
        </div>
        <div className="flex flex-col my-5 mb-8">
          <label className="font-bold text-[grey]" htmlFor="phone">
            Phone
          </label>
          <input
            className={styles.inputStyle}
            type="tel"
            id="phone"
            name="phone"
            placeholder="+(000) 000-00000"
            value={signupData.phone}
            onChange={handleInputs}
            maxLength="15"
          />
        </div>
        <div className="flex flex-col my-5 mb-8">
          <label className="font-bold text-[grey]" htmlFor="password">
            Password
          </label>
          <input
            className={styles.inputStyle}
            type="password"
            id="password"
            name="password"
            placeholder="Set Your Password"
            value={signupData.password}
            onChange={handleInputs}
            maxLength="50"
          />
        </div>
        <div className="flex flex-col my-5">
          <label className="font-bold text-[grey]" htmlFor="passcon">
            Confirm Password
          </label>
          <input
            className={styles.inputStyle}
            type="password"
            id="passcon"
            name="confirmPassword"
            placeholder="Confirm Your Password"
            value={signupData.confirmPassword}
            onChange={handleInputs}
            maxLength="50"
          />
        </div>
        {error && <Alert severity="error">{msg}</Alert>}
        <button
          type="submit"
          disabled={submitting}
          className={`${styles.buttonStyle} bg-dark-green w-full my-7`}
        >
          {submitting ? "CREATING ACCOUNT..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-[gray] mb-10">
        I am a member.{" "}
        <Link to="/login" className="font-bold text-light-green">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
