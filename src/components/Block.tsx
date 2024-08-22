import React from "react";
import PropTypes from "prop-types";
import { Status } from "../types/StatusType";

interface Props {
  letter: string;
  status: Status;
}

const Block = ({ letter, status }: Props) => {
  const statusClasses = {
    [Status.Correct]: "bg-green-500 text-white",
    [Status.Present]: "bg-yellow-500 text-white",
    [Status.Absent]: "bg-gray-500 text-white",
    [Status.Default]: "bg-white text-black",
  };

  return (
    <div
      className={`${
        statusClasses[status] || statusClasses[Status.Default]
      } flex justify-center items-center border-2 border-gray-300 w-12 h-12`}
    >
      {letter}
    </div>
  );
};

Block.propTypes = {
  letter: PropTypes.string.isRequired,
  status: PropTypes.oneOf(Object.values(Status)),
};

export default Block;
