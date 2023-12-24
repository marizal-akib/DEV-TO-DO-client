import { MdOutlineAddTask } from "react-icons/md";
import { Link } from "react-router-dom";
// import useTask from "../../../Hooks/useTask";
// import { useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "react-query";
import useAuth from "../../../Hooks/useAuth";

const AllTask = () => {
  const axiosPublic = useAxiosPublic();
  const {user} = useAuth()
  const {
    data: tasks = [],
    isPending: loading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/task/${user?.email}`);
      return res.data;
    },
  });
  console.log(tasks);

  const toDo = tasks.filter((task) => task.status === "To-Do");
  const doing = tasks.filter((task) => task.status === "Doing");
  const done = tasks.filter((task) => task.status === "Done");
  const onDone = async (id, data) => {
    console.log(id, data);
    const task = tasks.filter((task) => task._id === `${id}`);
    console.log(task[0].description);
    const newTask = {
      deadline: task[0].deadline,
      description: task[0].description,
      project: task[0].project,
      projectName: task[0].projectName,
      project_description: task[0].project_description,
      status: data,
      title: task[0].title,
      urgency: task[0].urgency,
    };
    const res = await axiosPublic.patch(`/tasks/${id}`, newTask);
    console.log(res.data);
    if (res.data.modifiedCount >= 1) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Well done`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const onDoing = async (id, status) => {
    console.log(id, status);
    const task = tasks.filter((task) => task._id === `${id}`);
    console.log(task[0].deadline);
    const newTask = {
      deadline: task[0].deadline,
      description: task[0].description,
      project: task[0].project,
      projectName: task[0].projectName,
      project_description: task[0].project_description,
      status: status,
      title: task[0].title,
      urgency: task[0].urgency,
    };
    const res = await axiosPublic.patch(`/tasks/${id}`, newTask);
    console.log(res.data);
    if (res.data.modifiedCount >= 1) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: `All the best for the task`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/task/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div className="flex-col w-full">
      <div className="  bg-purple-800">
        <Link
          to={"addTasks"}
          className="flex flex-row  text-xl md:text-3xl text-yellow-300"
        >
          <MdOutlineAddTask /> <span className="ml-2 text-lg">Add Tasks</span>
        </Link>
      </div>
      <section className="grid grid-flow-col gap-2 mt-6 m-2">
        <div className=" min-h-96 pb-2 bg-gray-400">
          <h2 className="text-center underline text-xl mt-4 font-bold">
            TO-DO
          </h2>

          {toDo.map((task) => (
            <div
              key={task._id}
              className="card rounded-none w-11/12 mx-auto mt-2 bg-base-100 shadow-xl"
            >
              <div className="card-body flex flex-row ">
                <p className="">
                  {task.title}{" "}
                  <span className="font-thin "> {task?.project}</span>
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-md bg-transparent border-none btn-square text-xs"
                    onClick={() => onDoing(`${task._id}`, "Doing")}
                  >
                    Doing
                  </button>{" "}
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-md bg-transparent border-none btn-square text-xs"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    Details...
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{task.description}</h3>
                      <div className="py-4">
                        <p>{task.deadline}</p>
                        <p>Urgency {task.urgency}</p>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <Link className="btn mr-2" to={`/update/${task._id}`}>
                            Update
                          </Link>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn border-none bg-transparent"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" min-h-96 pb-2 bg-yellow-300">
          <h2 className="text-center underline text-xl mt-4 font-bold">
            Doing
          </h2>
          {doing.map((task) => (
            <div
              key={task._id}
              className="card rounded-none w-11/12 mx-auto mt-2 bg-base-100 shadow-xl"
            >
              <div className="card-body flex flex-row ">
                <p className="">
                  {task.title}{" "}
                  <span className="font-thin "> {task?.project}</span>
                </p>

                <div className="card-actions justify-end">
                  <button
                    className="btn btn-md bg-transparent border-none btn-square text-xs"
                    onClick={() => onDone(`${task._id}`, "Done")}
                  >
                    Done
                  </button>{" "}
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-md bg-transparent border-none btn-square text-xs"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    Details...
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{task.description}</h3>
                      <div className="py-4">
                        <p>{task.deadline}</p>
                        <p>Urgency {task.urgency}</p>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <Link className="btn mr-2" to={`/update/${task._id}`}>
                            Update
                          </Link>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn border-none bg-transparent"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" min-h-96 pb-2 bg-blue-300">
          <h2 className="text-center underline text-xl mt-4 font-bold">Done</h2>
          {done.map((task) => (
            <div
              key={task._id}
              className="card rounded-none w-11/12 mx-auto mt-2 bg-base-100 shadow-xl"
            >
              <div className="card-body flex flex-row ">
                <p className="">
                  {task.title}{" "}
                  <span className="font-thin "> {task?.project}</span>
                </p>

                <div className="card-actions justify-end">
                  {" "}
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn btn-md bg-transparent border-none btn-square text-xs"
                    onClick={() =>
                      document.getElementById("my_modal_5").showModal()
                    }
                  >
                    Details...
                  </button>
                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{task.description}</h3>
                      <div className="py-4">
                        <p>{task.deadline}</p>
                        <p>Urgency {task.urgency}</p>
                      </div>
                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <Link className="btn mr-2" to={`/update/${task._id}`}>
                            Update
                          </Link>
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn border-none bg-transparent"
                  >
                    X
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AllTask;
