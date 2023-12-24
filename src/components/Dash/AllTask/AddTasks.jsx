import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";

// import { FaUtensils } from "react-icons/fa";

const AddTasks = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth();
  const onSubmit = async (data) => {
    console.log(data);
    const newTask = {
      email: user.email,
      deadline: data.deadline,
      description: data.description,
      project: data.project,
      projectName: data.projectName,
      project_description: data.project_description,
      status: data.status,
      title: data.title,
      urgency: data.urgency,
      status: "To-Do",
    };
    const menuRes = await axiosPublic.post("/task", newTask);
    console.log(menuRes.data);
    if (menuRes.data.insertedId) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `You have a task To-Do`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className=" w-full bg-slate-200">
      <div className="p-6 w-4/5 mx-auto mb-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-6">
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text font-bold">Title*</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                {...register("title")}
                required
                className="input input-bordered w-full max-full "
              />
            </div>
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text font-bold">Project Name</span>
              </label>
              <input
                type="text"
                placeholder="Project Name (Optional)"
                {...register("projectName")}
                required
                className="input input-bordered w-full max-full "
              />
            </div>
          </div>
          <div className="flex gap-6">
            {/* category */}
            <div className="flex gap-3 w-full">
              <div className="form-control w-full my-2">
                <label className="label">
                  <span className="label-text font-bold">Task Urgency*</span>
                </label>
                <select
                  {...register("urgency")}
                  required
                  defaultValue="def"
                  className="select select-bordered w-full "
                >
                  <option disabled value="def">
                    Select Urgency
                  </option>
                  <option>High</option>
                  <option>Moderate</option>
                  <option>Low</option>
                </select>
              </div>
              <div className="form-control w-full my-2">
                <label className="label">
                  <span className="label-text font-bold">
                    Project Category*
                  </span>
                </label>
                <select
                  {...register("category")}
                  required
                  defaultValue="def"
                  className="select select-bordered w-full "
                >
                  <option disabled value="def">
                    Select Project Category
                  </option>
                  <option>None</option>
                  <option>Personal</option>
                  <option>Client</option>
                  <option>Study</option>
                </select>
              </div>
            </div>
            {/* Deadline */}
            <div className="form-control w-full my-2">
              <label className="label">
                <span className="label-text font-bold">Deadline*</span>
              </label>
              <input
                type="date"
                {...register("deadline")}
                required
                className="input input-bordered w-full max-full "
              />
            </div>
          </div>
          {/* details */}
          <div className="flex gap-6">
            {/* Project description */}
            <div className=" w-full form-control">
              <label className="label">
                <span className="label-text font-bold">Description</span>
              </label>
              <textarea
                {...register("details")}
                required
                className="textarea textarea-bordered h-24"
                placeholder="Description"
              ></textarea>
            </div>
            {/* description */}
            <div className=" w-full form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Project Description
                </span>
              </label>
              <textarea
                {...register("project_description")}
                className="textarea textarea-bordered h-24"
                placeholder="Project Description (Optional)"
              ></textarea>
            </div>
          </div>
          <button className="btn text-blue-400 mt-2 text-center rounded-none bg-yellow-300 ">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTasks;
