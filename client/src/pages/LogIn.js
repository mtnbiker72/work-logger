import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { LOGIN } from "../utils/mutations";
import { useState } from "react";

const Login = (props) => {
  let navigate = useNavigate();
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      const loggedIn = Auth.login(data.login.token);
      if (!loggedIn) {
        navigate("/login");
      } else {
        navigate("/profile");
      }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header text-center">
        <h1>Please Log In</h1>
      </div>
      <div className="card-body m-5">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="p-2">Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email here"
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="p-2">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password here"
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" className="btn btn-danger m-1">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
