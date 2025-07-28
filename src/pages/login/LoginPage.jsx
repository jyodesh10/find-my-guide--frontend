import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from "../../constants/constants";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setemail("devraj@gmail.com");
    setpassword("pinkalice10");
  }, []);

  const handleLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        baseUrl + "auth/guide-login",
        {
          email: email,
          password: password,
        },
        {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      );
      const fetcheddata = await response.data;
      setData(fetcheddata);
      if (response.status == 200) {
        localStorage.setItem("accessToken", fetcheddata["accesToken"]);
        localStorage.setItem("id", fetcheddata["id"]);
        navigate("dashboard");
      }
    } catch (error) {
      setloading(false);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div
        className="
          flex
          h-screen w-screen
          bg-gray-700
          items-center justify-center
        "
      >
        {/* container */}
        <div
          className="
            h-[50%] w-[80%]
            p-5
            bg-gray-100
            rounded-2xl
            shadow-gray-400 shadow-xl
            justify-items-center
            md:w-[400px]
            lg:w-[400px]
          "
        >
          <h1
            className="
              text-2xl font-medium text-gray-400
              justify-center
            "
          >
            LOGIN
          </h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="
              block
              w-full
              p-2.5 mb-5 mt-[15%]
              text-gray-900 text-sm
              bg-gray-50
              border border-gray-300 rounded-lg
              focus:outline-gray-400
              transition duration-150 ease-in-out
            "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="
              block
              w-full
              p-2.5
              text-gray-900 text-sm
              bg-gray-50
              border border-gray-300 rounded-lg
              focus:outline-gray-400
              transition duration-150 ease-in-out
            "
          />
          <button
            type="button"
            data-ripple-light="true"
            onClick={handleLogin}
            className="
              w-[200px]
              p-2 mt-[15%]
              text-white
              bg-blue-700
              rounded-2xl
              hover:bg-blue-800 focus:ring-4 focus:outline-none
            "
          >
            {loading ? <div>Logging in...</div> : <div>Login</div>}
          </button>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
