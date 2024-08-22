import React from "react";
import Block from "./Block";
import { Status } from "../types/StatusType";

interface Props {
  letters: string[];
  statuses: Status[];
}

const Row = ({ letters, statuses }: Props) => {
  return (
    <div className="flex gap-1">
      {letters.map((letter, index) => (
        <Block key={index} letter={letter} status={statuses[index]} />
      ))}
    </div>
  );
};

export default Row;
