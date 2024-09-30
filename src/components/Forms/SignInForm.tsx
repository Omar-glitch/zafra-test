import { Form, Formik } from "formik";
import "react-international-phone/style.css";
import useAutosaveForm from "../../hooks/useAutosaveForm";
import {
  signInFormSchema,
  SignInFormSchema,
  signInFormStorageSchema,
} from "../../schemas/SignInSchema";
import FieldInput from "../Inputs/FieldInput";
import FieldPhoneInput from "../Inputs/FieldPhoneInput";
import FieldTextarea from "../Inputs/FieldTextarea";
import FieldCountrySelect from "../Inputs/FieldCountrySelect";
import { addTimeToDate, dateToInputDate } from "../../utils/dates";
import FieldRadio from "../Inputs/FieldRadio";
import FieldCheckbox from "../Inputs/FieldCheckbox";

const INITIAL_VALUES: SignInFormSchema = {
  name: "",
  country: "Honduras",
  date: "",
  direction: "",
  email: "",
  tel: "",
  company: { employees_count: 0, name: "" },
  person: { job_description: "" },
  type: "empresa",
  terms: false,
};

const KEY = "SIGNIN_FORM";
const DAY_MS = 24 * 60 * 60 * 1000;

export default function SignInForm() {
  const loadValues = () => {
    try {
      const savedItem = localStorage.getItem(KEY);
      if (!savedItem) throw new Error("Null saved form");
      return signInFormStorageSchema.validateSync(JSON.parse(savedItem));
    } catch (e) {
      localStorage.removeItem(KEY);
      return INITIAL_VALUES;
    }
  };

  return (
    <Formik
      initialValues={loadValues()}
      validationSchema={signInFormSchema}
      onSubmit={(values, { resetForm }) => {
        alert("Formulario enviado!!");
        localStorage.removeItem(KEY);
        console.log(values);
        resetForm({ values: INITIAL_VALUES });
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ values, dirty, errors }) => {
        useAutosaveForm({ key: KEY, values, dirty });

        return (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-2 px-4 py-16 min-[17.1875rem] w-full max-w-[23.75rem] md:max-w-[45rem]">
            <h2 className="text-xl font-bold md:col-span-2 md:text-3xl mb-1">
              Registrarse
            </h2>
            <FieldInput name="name" label="Nombre:" placeholder="omar meza" />
            <FieldInput
              name="email"
              type="email"
              label="Email:"
              placeholder="omar@gmail.com"
            />
            <FieldTextarea
              name="direction"
              label="Dirección:"
              placeholder="En la calle..."
            />
            <div className="w-full">
              <FieldPhoneInput name="tel" label="Teléfono:" />
              <FieldCountrySelect name="country" label="País:" />
            </div>
            <FieldInput
              name="date"
              label="Fecha:"
              placeholder="fecha"
              type="date"
              conf={{ min: dateToInputDate(addTimeToDate(new Date(), DAY_MS)) }}
            />
            <div className="bg-paper-tertiary w-full p-2 rounded-md">
              <p className="font-bold text-sm mb-1">Tipo</p>
              <FieldRadio name="type" text="Empresa" value="empresa" />
              <FieldRadio
                name="type"
                text="Independiente"
                value="independiente"
              />
            </div>
            {values.type == "empresa" ? (
              <>
                <FieldInput
                  name="company.name"
                  label="Nombre de la empresa:"
                  placeholder="Diunsa"
                />
                <FieldInput
                  name="company.employees_count"
                  label="Número de empleados:"
                  type="number"
                  placeholder="0"
                />
              </>
            ) : (
              <FieldInput
                name="person.job_description"
                label="Descripción del trabajo:"
                placeholder="Un valor..."
              />
            )}
            <div className="md:col-span-2">
              <FieldCheckbox
                name="terms"
                text="Aceptas los términos"
                value={true}
              />
              {errors.terms && (
                <p className="text-sm text-error">{errors.terms}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-primary px-5 py-1 rounded-md text-paper font-bold transition-colors hover:bg-primary-dark outline-none focus:ring-4 ring-primary-alpha/40"
            >
              Enviar
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
