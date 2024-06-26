import { Field } from "formik";

type Props = {
  label?: string;
  className?: string;
  name: string;
  isError: boolean;
  type?: string;
  autoComplete?: string;
  min?: string;
  error?: string | null | undefined;
  placeholder?: string;
  onClick?: () => void;
};

function TextInput({
  name,
  isError,
  label,
  placeholder,
  className,
  error,
  ...props
}: Props) {
  return (
    <label className={`form-control text-white relative ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text font-semibold prose-sm text-white">
            {label}
          </span>
        </div>
      )}
      <Field
        {...props}
        name={name}
        className={`input input-bordered bg-main-bg text-white rounded-2xl  text-md ${
          isError ? "border-red" : "border-blue "
        } w-full text-md`}
        placeholder={placeholder ? placeholder : label}
      />
      <span className="prose-sm absolute -bottom-6 left-0 text-red-500 text-start">
        {isError && error ? error : ""}
      </span>
    </label>
  );
}

export default TextInput;
