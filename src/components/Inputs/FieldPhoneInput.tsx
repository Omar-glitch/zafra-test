import { Field, FieldProps } from "formik";
import { useId } from "react";
import { PhoneInput } from "react-international-phone";

type FieldInputPhoneProps = {
  label?: string;
  name: string;
};

export default function FieldPhoneInput({ name, label }: FieldInputPhoneProps) {
  const id = useId();
  const inputId = `${id}-${name}`;

  return (
    <Field name={name}>
      {({ meta, form: { setFieldValue } }: FieldProps) => (
        <div className="relative pb-4 w-full">
          <label htmlFor={inputId}>
            {label && <p className="text-sm font-bold mb-0.5">{label}</p>}
            <PhoneInput
              defaultCountry="hn"
              value={meta.value}
              onChange={(e) => setFieldValue(name, e)}
              style={{ width: "100%" }}
              inputProps={{ id: inputId }}
              inputStyle={{
                background: "var(--paper-tertiary)",
                color: "var(--text)",
                border: "none",
                width: "100%",
              }}
              inputClassName="focus:ring-2 ring-primary ring-inset"
              countrySelectorStyleProps={{
                buttonStyle: {
                  background: "var(--paper-tertiary)",
                  color: "var(--text)",
                  border: "none",
                  outline: "none",
                  borderRight: "0.125rem solid var(--paper)",
                  minWidth: "3.4rem",
                },
                buttonClassName:
                  "focus:ring-2 hover:ring-2 ring-primary ring-inset",
                dropdownArrowStyle: {
                  borderTopColor: "var(--text)",
                },
                dropdownStyleProps: {
                  listItemStyle: {
                    background: "var(--paper)",
                    color: "var(--text)",
                  },
                  className: "scrollish text-text",
                  listItemDialCodeStyle: { color: "var(--text-secondary)" },
                },
              }}
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
