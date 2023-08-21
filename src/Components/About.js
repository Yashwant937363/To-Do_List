import React from 'react';

const About = () => {
  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const sectionStyle = {
    marginBottom: '20px',
  };

  const headingStyle = {
    fontSize: '24px',
    marginBottom: '10px',
    color: 'wheat',
  };

  const paragraphStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: 'white',
  };

  const listStyle = {
    fontSize: '16px',
    lineHeight: '1.6',
    paddingLeft: '20px',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>About the To-Do List App Project</h2>
        <p style={paragraphStyle}>
          The To-Do List App is a beginner-friendly project designed to introduce you to fundamental concepts of web development using React. In this project, you will create a simple yet functional to-do list application that empowers users to manage their tasks efficiently. Through this hands-on experience, you will gain insights into React components, state management, and user interactions.
        </p>
      </div>
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Project Overview:</h3>
        <p style={paragraphStyle}>
          In this project, you will build a single-page web application that enables users to:
        </p>
        <ul style={listStyle}>
          <li>Add Tasks: Users can input new tasks they need to accomplish. When they press the "Add" button or hit Enter, the task is added to the list.</li>
          <li>Mark Tasks as Completed: Each task on the list will have a checkbox next to it. Users can mark tasks as completed by checking the box. A visual indicator will distinguish completed tasks from those that are not completed.</li>
          <li>Delete Tasks: Users can remove tasks from the list once they are completed or no longer needed. Deleting a task will remove it from the list entirely.</li>
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Key Learning Objectives:</h3>
        <p style={paragraphStyle}>
          Through the development of this To-Do List App, you will learn:
        </p>
        <ul style={listStyle}>
          <li>React Components: Gain a solid understanding of React components and their role in building modular user interfaces. You will create components for the overall application, the task list, individual tasks, and the input form.</li>
          <li>State Management: Explore the concept of state within a React application. You will manage the state of tasks, their completion status, and handle updates effectively.</li>
          <li>User Interaction: Learn how to capture user interactions, such as button clicks and checkbox changes, and respond to them appropriately by updating the component state.</li>
          <li>Conditional Rendering: Implement conditional rendering to display different UI elements based on the state of tasks, such as showing completed tasks differently.</li>
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Why This Project Matters:</h3>
        <ul style={listStyle}>
          <li>Hands-On Experience: This project provides a practical introduction to core React concepts. By building a real-world application, you will deepen your understanding of these concepts.</li>
          <li>Foundational Skills: The skills acquired in this project will serve as a solid foundation for more complex React applications and help you grasp more advanced topics.</li>
          <li>Portfolio Building: Upon completion, you will have a tangible project to showcase in your portfolio, demonstrating your ability to create functional and interactive web applications.</li>
          <li>Confidence Boost: Successfully completing this project will boost your confidence as a developer, empowering you to take on more challenging projects in the future.</li>
        </ul>
      </div>
      <div style={sectionStyle}>
        <h3 style={headingStyle}>Prerequisites:</h3>
        <p style={paragraphStyle}>
          This project assumes basic knowledge of HTML, CSS, and JavaScript. Familiarity with the React library is helpful but not required, as this project will guide you through the necessary concepts step by step.
        </p>
        <p style={paragraphStyle}>Get ready to embark on an exciting journey into the world of React development as you create a To-Do List App that showcases your skills and sets you on the path to becoming a proficient web developer.</p>
      </div>
    </div>
  );
};
export default About;
