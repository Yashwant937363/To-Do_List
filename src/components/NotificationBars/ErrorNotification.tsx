import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { removeErrorMsg } from "../../store/slices/msgSlice";
import { motion } from "motion/react";

const ErrorNotification: React.FC<{ errormsg: string; index: number }> = ({
  errormsg,
  index,
}) => {
  const dispatch = useAppDispatch();
  const handleRemoveNotificaiton = () => dispatch(removeErrorMsg(index));
  useEffect(() => {
    setTimeout(() => {
      handleRemoveNotificaiton();
    }, 3000);
  }, [index, errormsg]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-red-500 dark:bg-red-600 rounded-md px-2 py-1 min-w-30 text-white font-light"
    >
      <div>{errormsg}</div>
    </motion.div>
  );
};

export default ErrorNotification;
