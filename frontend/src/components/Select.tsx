import React, { forwardRef, Ref, useId } from "react";

type SelectProps = {
  options: [];
  label: string;
  className: string;
};

const Select = (
  { options, label, className }: SelectProps,
  ref: Ref<HTMLSelectElement>
) => {
  const id = useId();
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select className={className} name={label} ref={ref} id={id}>
        {options?.map((option) => {
          return <option value={option}>{option}</option>;
        })}
      </select>
    </>
  );
};

export default forwardRef(Select);
