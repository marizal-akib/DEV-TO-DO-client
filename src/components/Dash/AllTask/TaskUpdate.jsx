import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

import useAxiosPublic from "../../../Hooks/useAxiosPublic";

import { useLoaderData } from "react-router-dom";

const TaskUpdate = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const task = useLoaderData();
  const {
    _id,
    deadline,
    description,
    project,
    projectName,
    project_description,
    status,
    title,
    urgency,
  } = task;

 
  const onSubmit = async (data) => {
    console.log(data);
    const newTask = {
      deadline: data.deadline,
      description: data.description,
      project: data.project,
      projectName: data.projectName,
      project_description: data.project_description,
      status: status,
      title: data.title,
      urgency: data.urgency,
      
    };
    const res = await axiosPublic.patch(`/tasks/${_id}`, newTask);
    console.log(res.data);
    if (res.data.modifiedCount >= 1 ) {
      reset();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Your task has been updated`,
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
                defaultValue={`${title}`}
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
                defaultValue={`${projectName}`}
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
                  defaultValue={`${urgency}`}
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
                  {...register("project")}
                  required
                  defaultValue={`${project}`}
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
                defaultValue={`${deadline}`}
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
                {...register("description")}
                required
                className="textarea textarea-bordered h-24"
                defaultValue={`${description}`}
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
                defaultValue={`${project_description}`}
              ></textarea>
            </div>
          </div>
          <button className="btn text-blue-400 mt-2 text-center rounded-none bg-yellow-300 ">
            Update Task
          </button>
        </form>
      </div>
    </div>
  ); 
};

export default TaskUpdate;
