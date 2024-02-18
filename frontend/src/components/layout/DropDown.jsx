import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
const DropDown = ({ data, setDropDown, title }) => {
  const navigate = useNavigate();
  const submitHandle = (i) => {
    navigate(`/products?${title.toLowerCase()}=${i.name}`);
    setDropDown(false);
    window.location.reload();
  };
  return (
    <div className="pb-4 w-[200px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {console.log(data)}
      {data &&
        data.map((i, index) => (
          <div
            key={index}
            className={`${styles.noramlFlex}`}
            onClick={() => submitHandle(i)}
          >
            {/* <img
              src={i?.images[0]?.link}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            /> */}
            <h3 className="m-3 cursor-pointer select-none">{i?.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;
