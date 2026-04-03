import * as yup from "yup";

export const validationSchema = yup.object().shape({
  use: yup.string().oneOf(["reading", "distance"]).required("Add value"),
  // SPH ==============================
  sphereLeft: yup
    .number()
    .transform((_, original) => Number(original))
    .min(-12)
    .max(6)
    .required("Add value"),
  sphereRight: yup
    .number()
    .transform((_, original) => Number(original))
    .min(-12)
    .max(6)
    .required("Add value"),
  // CYL ==============================
  cylinderLeft: yup
    .number()
    .transform((_, original) => Number(original))
    .min(-12)
    .max(6),
  // .required("Add value"),
  cylinderRight: yup
    .number()
    .transform((_, original) => Number(original))
    .min(-12)
    .max(6),
  // .required("Add value"),
  // AXI ==============================
  axisLeft: yup
    .number()
    .transform((_, original) => Number(original))
    .min(1)
    .max(180)
    .when("cylinderLeft", {
      is: (val: number) => val,
      then: (schema) => schema.required("Add value")
    }),
  axisRight: yup
    .number()
    .transform((_, original) => Number(original))
    .min(1)
    .max(180)
    .when("cylinderRight", {
      is: (val: number) => val,
      then: (schema) => schema.required("Add value")
    }),
  // ADD ==============================
  addLeft: yup
    .number()
    .transform((_, original) => Number(original))
    .min(0)
    .max(3)
    .required("Add value"),
  addRight: yup
    .number()
    .transform((_, original) => Number(original))
    .min(0)
    .max(3)
    .required("Add value"),
  // PD ==============================
  pdValues: yup.number(),
  pdLeft: yup
    .number()
    .transform((_, original) => Number(original))
    .min(1)
    .max(180)
    .required("Add value"),
  pdRight: yup
    .number()
    .transform((_, original) => Number(original))
    .min(1)
    .max(180)
    .when("pdValues", {
      is: 2,
      then: (schema) => schema.required("Add value")
    }),
  // DATE ==============================
  date: yup.object({
    dd: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1)
      .max(31)
      .required("Add value"),
    mm: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1)
      .max(12)
      .required("Add value"),
    yyyy: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1900)
      .required("Add value")
  })
});
