import React, { useState } from "react";

function Body() {
  const [todo, setTodo] = useState([
    "Study OS for 2 Hours",
    "Play Games for 2 Hours",
  ]);
  const [newTodo, setNewTodo] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() !== "") {
      setTodo([...todo, newTodo]);
      setNewTodo("");
    }
  };
  let done = (index) => {
    let rowName = `#row${index + 1}`;
    var row = document.querySelector(rowName);
    row.classList.add("green-row");
  };

  const deleteing = (index) => {
    setTodo((prevTodo) => prevTodo.filter((_, i) => i !== index));
  };
  return (
    <section className="body">
      <style>
        {`
          .body{
            display:grid;
            justify-items: center;
            grid-gap:50px;
            padding:50px;
          }
          @media (max-width: 500px){
            .body{
              padding:50px 5px;
            }
            .todo .submit{
              display:block;
              width:100%;
              margin-top:10px;
            }
          }
          .todo{
            padding:10px;
            border-radius:23px;
            background-color:#f7e7ce;
            color: black;
          }
          .todo .input{
            width:250px;
            border:0px;
            border-radius:5px;
            padding:5px;
            background-color:#f7e7ce;
            border-bottom:1px solid #F5DEB3;
          }
          .input:focus{
            outline: none;
            border: 1px solid transparent;
          }
          .todo .submit{
            padding:10px;
            background-color:#C4B18F;
            border:0px;
            border-radius:15px;
          }
          .row{
            height:30px;
            padding:30px;
            overflow: hidden;

          }
          .green-row{
            background-color:rgba(78, 233, 173,0.5);
            border-radius:23px;
          }
          .row :nth-child(1){
            border-left:0px solid black;
            text-align:center;
          }
          td,th{
            padding:10px;
            border-left:1px solid black;
          }
          .button{
            border:0px;
            color:white;
            border-radius:5px;
            padding:10px;
            transition: transform 0.3s ease-in-out;
          }
          .button:hover {
            transform: scale(1.2);
          }
          .done{
            background-color:#50C878;
            position:relative;
            left:1px;
          }
          .delete{
            background-color:#FF0800;
          }
        `}
      </style>
      <form className="todo" onSubmit={handleFormSubmit}>
        To-Do :{" "}
        <input
          type="text"
          value={newTodo}
          className="input"
          placeholder="Enter List Item"
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <input type="submit" className="button submit" value="Add" />
      </form>
      {todo.length !== 0 ? ( // Use the ternary operator to conditionally render the table
        <table className="list">
          <thead>
            <tr className="row">
              <th>Sr No</th>
              <th>To-DO</th>
              <th>Done</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((item, index) => (
              <tr className="row" key={index} id={`row${index + 1}`}>
                <td>{index + 1}</td>
                <td>{item}</td>
                <td>
                  <button onClick={() => done(index)} className="button done">
                    Done
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteing(index)}
                    className="button delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </section>
  );
}

export default Body;
