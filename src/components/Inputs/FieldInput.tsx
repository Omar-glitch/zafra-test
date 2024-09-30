import { Field, FieldProps } from "formik";
import { useId } from "react";

type InputType = "text" | "number" | "date" | "email";

type Conf = {
  minLength?: number;
  maxLength?: number;
  min?: string;
  max?: string;
};

type FieldInputProps = {
  type?: InputType;
  placeholder?: string;
  label?: string;
  name: string;
  conf?: Conf;
};

export default function FieldInput({
  name,
  label,
  placeholder,
  type,
  conf = {},
}: FieldInputProps) {
  const id = useId();
  const inputId = `${id}-${name}`;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="relative pb-4 w-full">
          <label htmlFor={inputId}>
            {label && <p className="text-sm font-bold mb-0.5">{label}</p>}
            <input
              id={inputId}
              {...field}
              type={type}
              placeholder={placeholder}
              {...conf}
              className="bg-paper-tertiary w-full outline-none focus:ring-2 ring-primary p-2 rounded-lg placeholder:text-text-secondary"
            />
          </label>
          {meta.error && (
            <p className="absolute bottom-0 left-0 text-error text-xs line-clamp-1 text-ellipsis">
              {meta.error}
            </p>
          )}
        </div>
      )}
    </Field>
  );
}
