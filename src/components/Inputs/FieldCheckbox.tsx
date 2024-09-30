import { Field, FieldProps } from "formik";
import { useId } from "react";

type FieldCheckboxProps = {
  name: string;
  text: string;
  value: string | boolean;
};

export default function FieldCheckbox({
  text,
  name,
  value,
}: FieldCheckboxProps) {
  const id = useId();
  const inputId = `${id}-${name}`;

  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <label htmlFor={inputId} className="flex w-full">
          <input
            id={inputId}
            type="checkbox"
            checked={value == field.value}
            {...field}
            value={String(value)}
          />
          <p className="w-full ml-2">{text}</p>
        </label>
      )}
    </Field>
  );
}
