import React, { useEffect, useRef } from "react";

function EditInput(props) {
  const { value, callback } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <input
      defaultValue={value}
      onBlur={(e) => {
        callback(e.target.value);
      }}
      ref={inputRef}
    />
  );
}

export default EditInput;
