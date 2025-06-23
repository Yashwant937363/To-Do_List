import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import SuccessNotification from "./SuccessNotification";
import ErrorNotification from "./ErrorNotification";

const NotificationContianer: React.FC = () => {
  const { errormsg, successmsg } = useAppSelector((state) => state.msg);
  return (
    <div className="fixed bottom-4 left-4 space-y-4 z-50">
      {successmsg.map((message, index) => (
        <SuccessNotification key={index} successmsg={message} index={index} />
      ))}
      {errormsg.map((message, index) => (
        <ErrorNotification key={index} errormsg={message} index={index} />
      ))}
    </div>
  );
};

export default NotificationContianer;
