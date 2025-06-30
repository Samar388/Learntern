type ButtonProps = {
  value: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled: boolean;
  className: string;
};

const Button = ({ value, type, disabled = false, className }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} cursor-pointer rounded-md disabled:text-slate-600 bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg   hover:bg-slate-700 `}
    >
      {value}
    </button>
  );
};
export default Button;
