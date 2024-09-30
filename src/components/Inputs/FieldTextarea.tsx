import { Field, FieldProps } from "formik";
import { useId } from "react";

type FieldTextareaProps = {
  placeholder?: string;
  label?: string;
  name: string;
};

export default function FieldTextarea({
  name,
  label,
  placeholder,
}: FieldTextareaProps) {
  const id = useId();
  const inputId = `${id}-${name}`;

  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className="relative pb-4 w-full">
          <label htmlFor={inputId}>
            {label && <p className="text-sm font-bold mb-0.5">{label}</p>}
            <textarea
              {...field}
              id={inputId}
              placeholder={placeholder}
              className="bg-paper-tertiary outline-none focus:ring-2 ring-primary p-2 rounded-lg placeholder:text-text-secondary w-full h-28"
            />
          </label>
          {meta.error && (
            <p className="absolute bottom-0 left-0 text-error text-sm line-clamp-1 text-ellipsis">
              {meta.error}
            </p>
          )}
        </div>
      )}
    </Field>
  );
}
