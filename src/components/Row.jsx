import PropTypes from "prop-types";
import Block from "./Block";

const Row = ({ letters, statuses }) => {
  return (
    <div className="flex gap-1">
      {letters.map((letter, index) => (
        <Block key={index} letter={letter} status={statuses[index]} />
      ))}
    </div>
  );
};

Row.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired,
  statuses: PropTypes.arrayOf(
    PropTypes.oneOf(["correct", "present", "absent", "default"])
  ).isRequired,
};

export default Row;
