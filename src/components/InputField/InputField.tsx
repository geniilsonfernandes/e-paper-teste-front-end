import { forwardRef, InputHTMLAttributes } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "../ui/input";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
interface NumericFieldProps extends NumericFormatProps {
  label: string;
  name: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, name, value, ...rest }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="text-sm font-bold">
          {label}
        </label>

        <Input id={name} name={name} value={value} ref={ref} {...rest} />
      </div>
    );
  }
);
export const NumericField = ({ label, name, ...rest }: NumericFieldProps) => {
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
        {...rest}
      />
    </div>
  );
};

InputField.displayName = "InputField";
NumericField.displayName = "NumericField";

export default InputField;
