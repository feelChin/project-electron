import { useEffect, useRef, useState } from "react";

const useMyState = (initState) => {
  const [state, setState] = useState(initState);
  const isUpdate = useRef();

  const setUpdateState = (state, cb) => {
    isUpdate.current = cb;
    setState(state);
  };

  useEffect(() => {
    if (isUpdate.current) {
      isUpdate.current();
      isUpdate.current = null;
    }
  }, [state]);

  return [state, setUpdateState];
};

export default useMyState;
