import styles from "../../styles/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { UserAuth } from "../../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { login, isLoggedOut, loading } = UserAuth();

  if (!loading && !isLoggedOut) {
    return <Navigate to="/" replace />;
  }

  function handleInputs(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  const validateInputs = () => {
    if (!formData.email) {
      setMsg("Email is required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMsg("Please enter a valid email address.");
      return false;
    }
    if (!formData.password) {
      setMsg("Password is required.");
      return false;
    }
    if (formData.password.length < 6) {
      setMsg("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      setError(true);
      return;
    }

    setError(false);
    setMsg("");
    setSubmitting(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (err) {
      setError(true);
      setMsg(err.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-[white] sm:w-[700px] w-[400] m-auto mt-10 relative rounded-xl shadow-md">
      <h2 className="sm:text-[35px] text-[25px] pt-[20px] font-bold text-center">
        Login
      </h2>
      <form className="sm:p-[50px] p-[20px]" onSubmit={handleSubmit}>
        <div className="flex flex-col mb-10">
          <label className="font-bold text-[grey]" htmlFor="emailInp">
            Email
          </label>
          <input
            className={styles.inputStyle}
            type="email"
            placeholder="Type Your Email"
            id="emailInp"
            name="email"
            value={formData.email}
            onChange={handleInputs}
            autoComplete="email"
          />
        </div>

        <div className="flex flex-col my-5">
          <label className="font-bold text-[grey]" htmlFor="passInp">
            Password
          </label>
          <input
            className={styles.inputStyle}
            type="password"
            placeholder="Type Your Password"
            id="passInp"
            name="password"
            value={formData.password}
            onChange={handleInputs}
            autoComplete="current-password"
          />
        </div>
        {error && <Alert severity="error">{msg}</Alert>}
        <button
          type="submit"
          disabled={submitting}
          className={`${styles.buttonStyle} bg-dark-green w-full my-7`}
        >
          {submitting ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
      <p className="text-center text-[gray] mb-10">
        Not a member?{" "}
        <Link to="/signup" className="font-bold text-main-color">
          Sign up now
        </Link>
      </p>
    </div>
  );
};

export default Login;
