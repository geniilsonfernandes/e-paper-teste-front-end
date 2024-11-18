import { forwardRef, InputHTMLAttributes } from "react";
import { NumericFormat } from "react-number-format";
import { Input } from "../ui/input";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="text-sm font-bold">
          {label}
        </label>

        <Input id={name} name={name} ref={ref} {...rest} />
      </div>
    );
  }
);
export const NumericField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="text-sm font-bold">
          {label}
        </label>
        <NumericFormat
          decimalSeparator=","
          decimalScale={2}
          customInput={Input}
          id={name}
          name={name}
          placeholder={rest.placeholder}
          prefix="R$ "
        />
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
