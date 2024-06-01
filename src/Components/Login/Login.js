import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userAdminLoginThunk } from "../../redux/slices/userAdminSlice"
function Signin() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  let { isPending, currentUser, loginUserStatus, errorOccurred, errMsg } =
  useSelector((state) => state.userAdminLoginReducer);
let dispatch = useDispatch();
let navigate=useNavigate();
  
   function onSigninFormSubmit(userCred) {
    dispatch(userAdminLoginThunk(userCred));
  }

  useEffect(() => {
    if (loginUserStatus) {
      if (currentUser.userType === "user") {
        navigate("/user-dashboard");
      }
      if (currentUser.userType === "admin") {
        navigate("/admin-dashboard");
      }
    }
  }, [loginUserStatus]);



  return (
    <div className="body">
      <h1 className=" text-center display-5">Form</h1>
      {errorOccurred === true && (
                <p className="text-center" style={{ color: "var(--crimson)" }}>
                  {errMsg}
                </p>
              )}
      <form className="mt-5" onSubmit={handleSubmit(onSigninFormSubmit)}>
        <h2 className="signup">Sign in</h2>
        <div>
          <label  htmlFor="author" className="registerlabel">
        Register as
                  </label>
                  <div className="form-check form-check-inline  m-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="admin"
                      value="admin"
                      {...register("userType")}
                    />
                    <label
                    >
                      Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline  m-2">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="user"
                      value="user"
                      {...register("userType")}
                    />
                    <label
                     htmlFor="user"
                    >
                      User
                    </label>
                  </div>
                </div>
        <div className="container gap-5">
          <div className="input">
            <div className="mb-3">
              <input
                type="text"
                id="username"
                placeholder="Faculty ID"
                className="form-control"
                {...register("username", {
                  required: true,
                  minLength: 6,
                  maxLength: 25,
                })}
              />
            </div>
            {errors.username?.type === "required" && (
              <p className="form-error">Username is mandatory</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="form-error">
                Username should be atleast 6 characters
              </p>
            )}
            {errors.username?.type === "maxLength" && (
              <p className="form-error">
                Username should be atmost 25 characters
              </p>
            )}
           
            <div className="mb-3">
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="form-control"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password?.type === "required" && (
              <p className="form-error">Password is mandatory</p>
            )}
          </div>
       
          <button className="btn submit" type="submit">
            Sign in
          </button>
          <p className="text">
            Dont have an account?<Link to="/signup">Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signin;