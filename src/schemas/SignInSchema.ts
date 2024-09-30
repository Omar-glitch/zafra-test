import { PhoneNumberUtil } from "google-libphonenumber";
import * as y from "yup";

const phoneUtil = PhoneNumberUtil.getInstance();

const isPhoneValid = (phone: string) => {
  try {
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error) {
    return false;
  }
};

export const signInFormSchema = y.object().shape({
  name: y
    .string()
    .trim()
    .min(3, "Nombre mín. 3 letras")
    .max(52, "Nombre máx. 52 letras")
    .required("Nombre requerido"),
  email: y
    .string()
    .trim()
    .email("Email inválido")
    .min(6, "Correo mín. 6 letras")
    .required("Email requerido"),
  direction: y
    .string()
    .trim()
    .min(3, "Dirección mín. 3 letras")
    .max(100, "Dirección máx 100 letras")
    .required("Dirección requerida"),
  tel: y
    .string()
    .trim()
    .required("Teléfono requerido")
    .test("valid-phone", "Teléfono es inválido", (val) => isPhoneValid(val)),
  country: y.string().trim().required(),
  date: y
    .string()
    .trim()
    .required("Fecha requerida")
    .test(
      "min-date",
      "Fecha mín. mañana",
      (val) =>
        new Date(val.replace(/-+/g, "/")).getTime() > new Date().getTime()
    ),
  type: y.mixed().oneOf(["empresa", "independiente"]).required(),
  company: y
    .object()
    .shape({
      name: y.string(),
      employees_count: y.number(),
    })
    .when("type", ([type], sch) => {
      return type == "empresa"
        ? y
            .object()
            .shape({
              name: y
                .string()
                .min(2, "Nombre empresa mín. 2 letras")
                .required("Nombre empresa requerido"),
              employees_count: y
                .number()
                .min(2, "Mín. 2 empleados")
                .required("Cantidad de empleados requerido"),
            })
            .required()
        : sch.notRequired();
    }),
  person: y
    .object()
    .shape({
      job_description: y.string(),
    })
    .when("type", ([type], sch) => {
      return type == "independiente"
        ? y.object().shape({
            job_description: y
              .string()
              .min(2, "Min. 2 letras")
              .required("Descripción trabajo requerido"),
          })
        : sch.notRequired();
    }),
  terms: y
    .boolean()
    .required()
    .test("terms-accept", "Debe aceptar los términos", (val) => val),
});

export type SignInFormSchema = y.InferType<typeof signInFormSchema>;

export const signInFormStorageSchema = y.object().shape({
  name: y.string(),
  email: y.string(),
  direction: y.string(),
  tel: y.string(),
  country: y.string(),
  date: y.string(),
  type: y.string(),
  company: y.object().shape({
    name: y.string(),
    employees_count: y.number(),
  }),
  person: y.object().shape({
    job_description: y.string(),
  }),
  terms: y.boolean(),
});
