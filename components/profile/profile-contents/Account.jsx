import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import styles from "../../../styles/styles";
import { Alert } from "@mui/material";

const Account = () => {
  const [userData, setUserData] = useState({
    name: "",
    password: "",
  });
  const [isDirty, setIsDirty] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { user, logout, updateProfile } = UserAuth();

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        password: "",
      });
      setIsDirty(false);
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await updateProfile({
        name: userData.name,
        password: userData.password || undefined,
      });
      setUserData((prev) => ({ ...prev, password: "" }));
      setIsDirty(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  function handleInputs(e) {
    setUserData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    setIsDirty(true);
  }

  const isNameValid = userData.name.length >= 3 && userData.name.length <= 20;
  const isPasswordValid =
    userData.password.length === 0 ||
    (userData.password.length >= 6 && userData.password.length <= 50);
  const isSaveDisabled = !isNameValid || !isPasswordValid || !isDirty || saving;

  return (
    <div className="flex flex-col items-center w-full">
      {user?.email && (
        <p className="mb-4 text-[grey] w-full text-center">{user.email}</p>
      )}
      <form className="flex flex-col w-full" onSubmit={handleSave}>
        <label className="mb-2">Name</label>
        <input
          name="name"
          type="text"
          onChange={handleInputs}
          className="inpText"
          value={userData.name}
          minLength="3"
          maxLength="20"
        />
        <label className="mb-2 mt-4">New password (optional)</label>
        <input
          name="password"
          type="password"
          onChange={handleInputs}
          className="inpText"
          value={userData.password}
          maxLength="50"
          placeholder="Leave blank to keep current password"
        />
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <button
          type="submit"
          className={`${styles.buttonStyle} mb-5 mt-5 bg-light-green hover:drop-shadow-lg transition-all`}
          disabled={isSaveDisabled}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
      <button
        type="button"
        className={`${styles.buttonStyle} transition-all bg-second-color hover:drop-shadow-2xl`}
        onClick={handleLogout}
      >
        Sign out
      </button>
    </div>
  );
};

export default Account;
