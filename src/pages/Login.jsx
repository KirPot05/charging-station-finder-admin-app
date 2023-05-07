import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login as saveUserCreds, selectUser } from "../features/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector(selectUser);

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await login(email, password);

      dispatch(
        saveUserCreds({
          displayName: user.displayName,
          email: user.email,
          // photoUrl: user.photoURL,
          userId: user.uid,
        })
      );

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("User not found");
    }
  };

  useEffect(() => {
    if (user !== null) navigate("/");
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center shadow-md bg-cover bg-gray-400">
      <form
        className="bg-white flex flex-col w-1/3 space-y-10 p-5 border-t-4 border-[#0195FF] rounded"
        onSubmit={handleSubmit}
      >
        <h3 className="text-3xl font-semibold text-center">
          Welcome to Macula!
        </h3>
        <input
          type="text"
          className="p-2 border rounded-md"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="p-2 border rounded-md"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#0195FF] text-white p-2 rounded-lg"
        >
          {" "}
          Login{" "}
        </button>
      </form>
    </div>
  );
}

export default Login;
