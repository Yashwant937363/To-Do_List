import { useSelector } from "react-redux";
import "./ToDoList.css";


export default function ToDoList(props) {
   const { handleNoteOpen } = props;
   const notes = useSelector((state) => state.notes.notes);

   const getDate = (date) => {
      let dateObject = new Date(date);
      let formattedDate = dateObject.toLocaleDateString('en-US', {
         day: 'numeric',
         month: 'short',
         year: '2-digit',
      });
      return formattedDate;
   };
   return (
      <>
         {notes.length !== 0 ? (
            <div className="list">
               <div className="row header">
                  <span>Sr No</span>
                  <span>Title</span>
                  <span className="date">Created</span>
                  <span className="date">Modified</span>
               </div>
               {notes.map((item, index) => (
                  <div key={index} className="row data" id={`row${index + 1}`} onClick={() => handleNoteOpen(index)}>
                     <span>{index + 1}</span>
                     <span className="tabletitle">
                        <div id="title">
                           <h4>{item.title}</h4><span className="tag">{item.tag}</span>
                        </div>
                        <div id="body">
                           {item.body}
                        </div>
                     </span>
                     <span className="date">
                        {getDate(item.createdAt)}
                     </span>
                     <span className="date">
                        {getDate(item.updatedAt)}
                     </span>
                  </div>
               ))}
            </div>
         ) : (
            <div>
               Nothing Inside To-DO List
            </div>
         )
         }
      </>
   )
}