import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
// import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SignUp = () => {
    // const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || "/dashboard";
    
      const { createUser, updateUserProfile, createUserWithGoogle,  } = useAuth();
    
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
            navigate(from, { replace: true });
            toast(`{Welcome }`);
          })
          .catch((error) => console.log("error", error));
      };

      const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        if (res.data.success) {
          createUser(data.email, data.password).then((result) => {
            const loggedUser = result.user;
            console.log(loggedUser);
            updateUserProfile(data.name, res.data.data.display_url)
              .then(() => {
                console.log("Updated");
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  role : "member",
                  profilePic : res.data.data.display_url
                };
                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    console.log("user added to the database");
                    reset();
                    Swal.fire({
                      position: "top-center",
                      icon: "success",
                      title: "User has been created",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    navigate(from);
                  }
                });
              })
              .catch((error) => console.error(error));
          });
        }
      };
  return (
    <>
      <Helmet>
        <title>DEV TO-DO | Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-black">
        <div className="card my-10 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className=" card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="name"
                placeholder="name"
                className="input input-bordered"
              />
              {errors.name && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  Name field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  This field is required
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  pattern:
                    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[0-9])/,
                })}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  Password is required
                </span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  Password must be 6 character.
                </span>
              )}
              {errors.password?.type === "maxLength" && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  Password must be in between 20 character.
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  Password requires at least one uppercase letter, one lowercase
                  letter, one number, one special character.
                </span>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <input
                {...register("image")}
                required
                type="file"
                className="file-input w-full max-w-xs"
              />
              {errors.photo && (
                <span className="mt-2 text-red-600 font-semibold text-xs">
                  Photo URL field is required
                </span>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-primary"
                type="submit"
                value="Sign-Up"
              />
            </div>
            <div className="text-center">
              <div className="ml-12  w-2/3 divider">OR</div>
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
            </div>
            <p className="mt-8">
              <small>
                Already Have An Account?{" "}
                <Link to="/login" className="hover:underline">
                  Please Login.
                </Link>
              </small>
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
