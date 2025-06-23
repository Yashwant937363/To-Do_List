import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { removeSuccessMsg } from "../../store/slices/msgSlice";
import { motion } from "motion/react";

const SuccessNotification: React.FC<{ successmsg: string; index: number }> = ({
  successmsg,
  index,
}) => {
  const dispatch = useAppDispatch();
  const handleRemoveNotificaiton = () => dispatch(removeSuccessMsg(index));
  useEffect(() => {
    setTimeout(() => {
      handleRemoveNotificaiton();
    }, 2000);
  }, [index, successmsg]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-green-500 dark:bg-green-600 rounded-md px-2 py-1 min-w-30 text-white font-light"
    >
      <div>{successmsg}</div>
    </motion.div>
  );
};

export default SuccessNotification;
