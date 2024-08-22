import React from "react";
import PropTypes from "prop-types";
import { Status } from "../types/StatusType";

interface Props {
  letter: string;
  status: Status;
}

const Block = ({ letter, status }: Props) => {
  const statusClasses = {
    correct: "bg-green-500 text-white",
    present: "bg-yellow-500 text-white",
    absent: "bg-gray-500 text-white",
    default: "bg-white text-black",
  };
  return (
    <div
      className={` ${
        statusClasses[status || "default"]
      } flex justify-center items-center border-2 border-gray-300 w-12 h-12`}
    >
      {letter}
    </div>
  );
};

Block.propTypes = {
  letter: PropTypes.string,
  status: PropTypes.oneOf(["correct", "present", "absent", "default"]),
};

export default Block;
