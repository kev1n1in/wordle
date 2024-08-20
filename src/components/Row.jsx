import PropTypes from "prop-types";
import Block from "./Block";

const Row = ({ letters, status }) => {
    return (
      <div className="row">
        {letters.map((letter, index) => (
          <Block
            key={index}
            letter={letter}
            status={status} // 傳遞status來控制Block的顏色
            className={`tile ${letter ? "filled-box" : ""}`}
          />
        ))}
      </div>
    );
  };

Row.propTypes = {
  letters: PropTypes.arrayOf(PropTypes.string).isRequired, 
  status: PropTypes.oneOf(["correct", "present", "absent", "default"]),
};

export default Row;
