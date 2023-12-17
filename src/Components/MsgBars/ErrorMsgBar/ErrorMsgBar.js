import "./ErrorMsgBar.css";

export default function ErrorMsgBar(props){
    return(
        <div className="msgbar">
            <span>{props.msg}</span>
        </div>
    )
}