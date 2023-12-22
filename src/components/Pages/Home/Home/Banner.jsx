import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/N6Rmtg0/tablet-writing-dark-background-generative-ai-169016-33792.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-0"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl text-yellow-300 font-bold"> Welcome<span className="text-blue-400">, Developers!</span></h1>
          <p className="mb-5 text-blue-400 font-semibold">
            Enhance Your Workflow with our Task Management Platform. Streamline
            Your Projects, Optimize Productivity! Create, Organize, and Manage
            Tasks Effortlessly. Join Us Today for Seamless Task Handling! Let's
            Elevate Your Development Journey Together.
          </p>
          <Link to={"/dashboard"} className="btn btn-primary">Let's Explore</Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
