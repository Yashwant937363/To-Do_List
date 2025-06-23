import type React from "react";

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-orange-400 mb-4">
          About the To-Do List App Project
        </h2>
        <p className="text-base leading-relaxed ">
          The To-Do List App is a beginner-friendly project designed to
          introduce you to fundamental concepts of web development using React.
          In this project, you will create a simple yet functional to-do list
          application that empowers users to manage their tasks efficiently.
          Through this hands-on experience, you will gain insights into React
          components, state management, and user interactions.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-3">
          Project Overview:
        </h3>
        <p className="text-base leading-relaxed  mb-2">
          In this project, you will build a single-page web application that
          enables users to:
        </p>
        <ul className="list-disc pl-6 text-base leading-relaxed  space-y-2">
          <li>
            <strong>Add Tasks:</strong> Users can input new tasks they need to
            accomplish. When they press the "Add" button or hit Enter, the task
            is added to the list.
          </li>
          <li>
            <strong>Mark Tasks as Completed:</strong> Each task on the list will
            have a checkbox next to it. Users can mark tasks as completed by
            checking the box. A visual indicator will distinguish completed
            tasks from those that are not completed.
          </li>
          <li>
            <strong>Delete Tasks:</strong> Users can remove tasks from the list
            once they are completed or no longer needed. Deleting a task will
            remove it from the list entirely.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-3">
          Key Learning Objectives:
        </h3>
        <p className="text-base leading-relaxed  mb-2">
          Through the development of this To-Do List App, you will learn:
        </p>
        <ul className="list-disc pl-6 text-base leading-relaxed  space-y-2">
          <li>
            <strong>React Components:</strong> Gain a solid understanding of
            React components and their role in building modular user interfaces.
            You will create components for the overall application, the task
            list, individual tasks, and the input form.
          </li>
          <li>
            <strong>State Management:</strong> Explore the concept of state
            within a React application. You will manage the state of tasks,
            their completion status, and handle updates effectively.
          </li>
          <li>
            <strong>User Interaction:</strong> Learn how to capture user
            interactions, such as button clicks and checkbox changes, and
            respond to them appropriately by updating the component state.
          </li>
          <li>
            <strong>Conditional Rendering:</strong> Implement conditional
            rendering to display different UI elements based on the state of
            tasks, such as showing completed tasks differently.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-3">
          Why This Project Matters:
        </h3>
        <ul className="list-disc pl-6 text-base leading-relaxed  space-y-2">
          <li>
            <strong>Hands-On Experience:</strong> This project provides a
            practical introduction to core React concepts. By building a
            real-world application, you will deepen your understanding of these
            concepts.
          </li>
          <li>
            <strong>Foundational Skills:</strong> The skills acquired in this
            project will serve as a solid foundation for more complex React
            applications and help you grasp more advanced topics.
          </li>
          <li>
            <strong>Portfolio Building:</strong> Upon completion, you will have
            a tangible project to showcase in your portfolio, demonstrating your
            ability to create functional and interactive web applications.
          </li>
          <li>
            <strong>Confidence Boost:</strong> Successfully completing this
            project will boost your confidence as a developer, empowering you to
            take on more challenging projects in the future.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold text-orange-400 mb-3">
          Prerequisites:
        </h3>
        <p className="text-base leading-relaxed  mb-2">
          This project assumes basic knowledge of HTML, CSS, and JavaScript.
          Familiarity with the React library is helpful but not required, as
          this project will guide you through the necessary concepts step by
          step.
        </p>
        <p className="text-base leading-relaxed ">
          Get ready to embark on an exciting journey into the world of React
          development as you create a To-Do List App that showcases your skills
          and sets you on the path to becoming a proficient web developer.
        </p>
      </section>
    </div>
  );
};

export default About;
