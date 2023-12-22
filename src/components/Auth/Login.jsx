import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";

const Login = () => {
  const { createUserWithGoogle, signIn } = useAuth();
  //   const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleGoogleLogin = () => {
    createUserWithGoogle()
      .then((res) => {
        console.log(res.user);
        // const userInfo = {
        //   email: res.user?.email,
        //   name: res.user?.displayName,

        // };

        // axiosPublic
        //   .post("/users", userInfo)
        //   .then((res) => console.log(res.data));
        toast(`{Welcome }`);
        navigate(from, { replace: true });
      })
      .catch((error) => console.log("error", error));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const role2 = member;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        console.log(result.user);
        toast(`{Welcome }`);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        console.error(error);
        toast("Email / Password doesn't match");
      });
  };

  return (
    <>
      <Helmet>
        <title>DEV TO-DO | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-black">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left space-y-3">
            <h1 className="text-5xl  lg:ml-24 text-blue-400 font-bold">
              Let's Login{" "}
            </h1>
            <img
              className="lg:w-2/3"
              src="https://i.pinimg.com/originals/81/17/8b/81178b47a8598f0c81c4799f2cdd4057.gif"
              alt=""
            />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="text-center mt-5">
              <button
                onClick={handleGoogleLogin}
                className="btn text-center text-xs font-semibold py-2 "
              >
                <span className="text-lg">
                  <FcGoogle />
                </span>{" "}
                Google
              </button>
            </div>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <p className="mt-8">
                    <small>
                      Don't Have An Account?{" "}
                      <Link to="/signUp" className="hover:underline">
                        Please Sign-Up.
                      </Link>
                    </small>
                  </p>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Login;
