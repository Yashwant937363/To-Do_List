import "./SuccessMsgBar.css";

export default function SuccessMsgBar(props){
    return(
        <div className="successmsgbar">
            <span>{props.msg}</span>
        </div>
    )
}