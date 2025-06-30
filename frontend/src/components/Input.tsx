import { ChangeEvent, HTMLInputTypeAttribute, useId } from "react";

type InputProps = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  className: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  disabled?: boolean;
};

const Input = ({
  name,
  label,
  type,
  className,
  onChange,
  value,
  disabled = false,
}: InputProps) => {
  const id = useId();

  return (
    <>
      <label className="text-[#222823]" htmlFor={id}>
        {label}
      </label>

      <input
        type={type}
        name={name}
        id={id}
        className={`border-[1.5px] border-[#a7a2a9] focus:border-[#8c8c8c] rounded-md p-2 ${className}`}
        onChange={onChange}
        value={type === "file" ? undefined : value ?? ""}
        required
        disabled={disabled}
      />
    </>
  );
};

export default Input;
