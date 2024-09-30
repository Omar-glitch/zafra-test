import { Field, FieldProps } from "formik";
import { useEffect, useState } from "react";
import {
  CountryData,
  CountrySelector,
  defaultCountries,
  parseCountry,
} from "react-international-phone";

type FieldCountrySelectProps = {
  name: string;
  label: string;
  countries?: CountryData[];
};

const getIso2 = (countryName: string) => {
  const item = defaultCountries.find((c) => {
    const country = parseCountry(c);
    return country.name == countryName;
  });
  if (item) {
    const parsed = parseCountry(item);
    return parsed.iso2;
  }
  return "hn";
};

export default function FieldCountrySelect({
  name,
  label,
  countries,
}: FieldCountrySelectProps) {
  return (
    <Field name={name}>
      {({ meta, form: { setFieldValue } }: FieldProps) => {
        const [iso2, setIso2] = useState(getIso2(meta.value));
        useEffect(() => {
          const newIso2 = getIso2(meta.value);
          setIso2(newIso2);
        }, [meta.value]);

        return (
          <div className="relative pb-4 w-full">
            <article>
              {label && <p className="text-sm font-bold mb-0.5">{label}</p>}
              <div className="flex font-bold">
                <CountrySelector
                  countries={countries}
                  selectedCountry={iso2}
                  onSelect={(e) => {
                    setFieldValue(name, e.name);
                  }}
                  buttonStyle={{
                    background: "var(--paper-tertiary)",
                    color: "var(--text)",
                    border: "none",
                    outline: "none",
                    borderRight: "0.125rem solid var(--paper)",
                    minWidth: "3.4rem",
                  }}
                  buttonClassName="focus:ring-2 hover:ring-2 ring-primary ring-inset"
                  dropdownArrowStyle={{ borderTopColor: "var(--text)" }}
                  dropdownStyleProps={{
                    listItemStyle: {
                      background: "var(--paper)",
                      color: "var(--text)",
                    },
                    className: "scrollish text-text",
                    listItemDialCodeStyle: { color: "transparent" },
                  }}
                />
                <p className="w-full h-max bg-paper-tertiary text-sm p-2 rounded-r-lg">
                  {meta.value}
                </p>
              </div>
            </article>
            {meta.error && (
              <p className="absolute bottom-0 left-0 text-error text-xs line-clamp-1 text-ellipsis">
                {meta.error}
              </p>
            )}
          </div>
        );
      }}
    </Field>
  );
}
