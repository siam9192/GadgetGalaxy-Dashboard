import React, { useEffect, useState } from "react";
import { start } from "repl";
interface IProps {
  start: number;
  end: number;
  duration?: number;
}
const useCounter = ({ start, end, duration = 1 }: IProps) => {
  const [value, setValue] = useState(start);
  useEffect(() => {
    const dif = start - end;
  }, [value]);
  return value;
};

export default useCounter;
