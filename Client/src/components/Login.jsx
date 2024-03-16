import { useState } from "react";
import  serverRequest from "../utils/axios";
import toast from "../utils/toast"
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { Link } from "react-router-dom";
import showToast from "../utils/toast";
import { useEffect } from "react";
export default function Login() {
  const navigate = useNavigate();
  const [ userData, setUserData ] = useState({
    email: "",
    password: "",
});

const handleChangeInput = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    setUserData({
        ...userData,
        [key]: value
    })
}
const handleSubmit = async (event) => {
    event.preventDefault();

   try {
    let { data } = await serverRequest({
       url: "/login",
       method: "POST",
       data: userData, 
    });
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("userId", data.userId);
    navigate("/products");
   } catch (error) {
    console.log(error)
    toast(error.response?.data?.message || error.message, "error")
   }
}

const handleCredentialResponse = async ({ credential }) => {
  const { data } = await serverRequest.post("/google-login", {
    googleToken: credential,
  });
  localStorage.setItem("token", data.access_token);
  showToast(data.message);
  navigate("/products/product");
};

useEffect(() => {
  
  // eslint-disable-next-line no-undef
  google.accounts.id.initialize({
    client_id: "888996035254-qqqrffv50i0tk2i45ja7j75g1ii9nlkg.apps.googleusercontent.com",
    callback: handleCredentialResponse,
  });
  // eslint-disable-next-line no-undef
  google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
    theme: "outline",
    size: "large",
  });
  
}, []);

    return (
      <section
        onSubmit={handleSubmit}
        className="container-2" id="login-section">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="mb-3 mt-5">Login Options</h1>
            <span>
              Log in with your personal data, or signup to enjoy all the benefits
            </span>
          </div>
          <div className="col-12 col-lg-8 offset-lg-2 my-5">
            <Button
            name={"Back"}
            buttonType={"submit"}
            buttonClass={"bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"}
            onClick={() => navigate("/")}>

            </Button>
            <div className="row">
              <div className="col-12 col-md-6 border-end p-5 text-left">
                <img
                  src="https://cdn2.f-cdn.com/contestentries/1472666/30841991/5c644ce550841_thumb900.jpg"
                  width="500px"
                  alt="medshop"
                />
              </div>
              <div className="col-12 col-md-6 p-5 text-left">
                <div className="form-signin m-auto">
                  <form id="login-form">
                    <h3 className="h3 mb-3 display-4">Log in to your account</h3>
                    <span>Log in on your profile</span>
                    <div className="mb-3 mt-3">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-email">Email</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="email"
                        className="form-control"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        name="email"
                        value={userData.email}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between">
                        <label htmlFor="login-password">Password</label>
                        <label className="text-danger text-end fw-bold">*</label>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        name="password"
                        value={userData.password}
                        onChange={handleChangeInput}
                      />
                    </div>
                    <div className="checkbox mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          defaultValue=""
                          id="login-remember"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="login-remember"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="d-grid">
                    <Button
                    name={"Login"}
                    buttonClass={"bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm"}
                    buttonType={"submit"}
                    onClick={() => navigate("/products")}
                    >
                    </Button>
                        </div>
                        <p className="mt-3 text-center text-red-500 mb-4">
                            Dont Have an Account? <Link to={"/register"}>Register</Link>
                        </p>
                  </form>
                </div>
                <div className="d-flex justify-content-center mb-4">- or -</div>
        <div className="d-flex justify-content-center">
          <div id="buttonDiv"></div>
        </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
