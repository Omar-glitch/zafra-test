import { Field, FieldProps } from "formik";
import { useId } from "react";

type FieldRadioProps = {
  name: string;
  text: string;
  value: string;
};

export default function FieldRadio({ name, text, value }: FieldRadioProps) {
  const id = useId();
  const inputId = `${id}-${name}`;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <label htmlFor={inputId} className="w-full">
          <div className="flex items-center justify-between w-full">
            <input
              id={inputId}
              type="radio"
              checked={value == field.value}
              {...field}
              value={value}
            />
            <p className="w-full ml-2">{text}</p>
          </div>
        </label>
      )}
    </Field>
  );
}
