
import { RiTaskLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const Projects = () => {
    return (
    <>
            <div className="flex-col w-full">
      <div className="   bg-purple-800">
        <Link to={"addProjects"} className="text-xl flex flex-row  md:text-3xl  text-yellow-300">
          <RiTaskLine /> <span className="ml-2 text-lg">Add Project</span> 
        </Link>
        </div>
        <div>
            <h2>
            Client:-
            </h2>
            <h2>

            Personal:-
            </h2>
            <h2>

            Study:-
            </h2>
        </div>
        </div>
    </>
    );
};

export default Projects;