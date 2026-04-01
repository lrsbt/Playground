import React, { useEffect, useRef } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

import * as yup from "yup";
import { useFormik } from "formik";
import { useFormOptions } from "./useFormOptions";
import { InfoInverted as Info } from "../../components/Icons";
import { Toggle, Button, Dropdown, TextInput } from "./Components";

const Playground = () => {
  const { optionsUse, optionsSmall, optionsLarge } = useFormOptions();

  const validationSchema = yup.object().shape({
    use: yup.string().oneOf(["reading", "distance"]).required(),
    sphereLeft: yup
      .number()
      .transform((_, original) => Number(original))
      .min(-12)
      .max(6)
      .required(),
    sphereRight: yup
      .number()
      .transform((_, original) => Number(original))
      .min(-12)
      .max(6)
      .required(),
    cylinderLeft: yup
      .number()
      .transform((_, original) => Number(original))
      .min(-12)
      .max(6)
      .required(),
    cylinderRight: yup
      .number()
      .transform((_, original) => Number(original))
      .min(-12)
      .max(6)
      .required(),
    axisLeft: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1)
      .max(180)
      .required(),
    axisRight: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1)
      .max(180)
      .required(),
    addLeft: yup
      .number()
      .transform((_, original) => Number(original))
      .min(0)
      .max(3)
      .required(),
    addRight: yup
      .number()
      .transform((_, original) => Number(original))
      .min(0)
      .max(3)
      .required(),
    pdLeft: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1)
      .max(180)
      .required(),
    pdRight: yup
      .number()
      .transform((_, original) => Number(original))
      .min(1)
      .max(180)
      .required(),
    date: yup.object({
      dd: yup
        .number()
        .transform((_, original) => Number(original))
        .min(1)
        .max(31)
        .required(),
      mm: yup
        .number()
        .transform((_, original) => Number(original))
        .min(1)
        .max(12)
        .required(),
      yyyy: yup
        .number()
        .transform((_, original) => Number(original))
        .min(1900)
        .required()
    })
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      use: "",
      sphereLeft: "",
      sphereRight: "",
      cylinderLeft: "",
      cylinderRight: "",
      axisLeft: "",
      axisRight: "",
      addLeft: "",
      addRight: "",
      pdLeft: "",
      pdRight: "",
      date: {
        dd: "",
        mm: "",
        yyyy: ""
      }
    },
    validationSchema: validationSchema,
    async onSubmit(values, { resetForm }) {
      console.log("onSubmit", values, { isValid: formik.isValid });
      // await axios.post(`${API_URL}/contact`, values).then(() => {
      //   console.log("sent");
      //   resetForm();
      // });
    }
  });

  console.log(formik);

  return (
    <FullScreen centerContent info={info} className="arr-bg">
      <section className="container">
        <div className="form">
          <h2 className="form__headline">What do you use your glasses for?</h2>
          <Dropdown
            name="use"
            options={optionsUse}
            value={formik.values.use}
            onChange={(e) => formik.setFieldValue("use", e.target.value)}
          />
          <p className="form__footer">
            <b>Please note:</b> varifocals, bi-focals and occupationals are not
            currently available to purchase online. <a href="#">Find a store</a>
          </p>
        </div>

        <div className="form">
          <h2 className="form__headline">
            Sphere (SPH)
            <a href="#">
              <Info />
            </a>
          </h2>
          <div className="_flex _gap">
            <Dropdown
              name="sphere-left"
              className="_flex-1"
              options={optionsLarge}
              value={formik.values.sphereLeft}
              onChange={(e) =>
                formik.setFieldValue("sphereLeft", e.target.value)
              }
            />
            <Dropdown
              name="sphere-right"
              className="_flex-1"
              options={optionsLarge}
              value={formik.values.sphereRight}
              onChange={(e) =>
                formik.setFieldValue("sphereRight", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form">
          <>
            <h2 className="form__headline">
              Cylinder (CYL)
              <a href="#">
                <Info />
              </a>
            </h2>
            <p className="form__intro">
              Not every prescription will have these values so please leave
              blank if they're not on your prescription card.
            </p>
            <div className="_flex _gap">
              <Dropdown
                name="cylinder-left"
                className="_flex-1"
                options={optionsLarge}
                value={formik.values.cylinderLeft}
                onChange={(e) =>
                  formik.setFieldValue("cylinderLeft", e.target.value)
                }
              />
              <Dropdown
                name="cylinder-right"
                options={optionsLarge}
                className="_flex-1"
                value={formik.values.cylinderRight}
                onChange={(e) =>
                  formik.setFieldValue("cylinderRight", e.target.value)
                }
              />
            </div>
          </>

          <>
            <h2 className="form__headline _mt-xl">
              Axis (AXI)
              <a href="#">
                <Info />
              </a>
            </h2>
            <p className="form__intro">
              Only prescriptions with Cylinder information will have these
              values, so please check your prescription card.
            </p>
            <div className="_flex _gap">
              <TextInput
                name="axis-left"
                className="_flex-1"
                placeholder="1 - 180"
                value={formik.values.axisRight}
                onChange={(e) =>
                  formik.setFieldValue("axisRight", e.target.value)
                }
              />
              <TextInput
                name="axis-right"
                className="_flex-1"
                placeholder="1 - 180"
                value={formik.values.axisRight}
                onChange={(e) =>
                  formik.setFieldValue("axisRight", e.target.value)
                }
              />
            </div>
          </>
        </div>

        <div className="form">
          <h2 className="form__headline">
            Near addition (ADD)
            <a href="#">
              <Info />
            </a>
          </h2>
          <p className="form__intro">
            Only prescriptions with Cylinder information will have these values,
            so please check your prescription card.
          </p>
          <div className="_flex _gap">
            <Dropdown
              name="add-left"
              className="_flex-1"
              options={optionsSmall}
              value={formik.values.addLeft}
              onChange={(e) => formik.setFieldValue("addLeft", e.target.value)}
            />
            <Dropdown
              name="add-right"
              className="_flex-1"
              options={optionsSmall}
              value={formik.values.addRight}
              onChange={(e) => formik.setFieldValue("addRight", e.target.value)}
            />
          </div>
        </div>

        <div className="form">
          <h2 className="form__headline">Pupillary distance (PD)</h2>
          <p className="form__intro">
            If your PD is not in your prescription you can use our PD
            Measurement tool by pressing the button below, ask your optometrist
            or follow <a href="#">this guide</a>. The average adult PD is
            between 58-64mm, but varies by person.
          </p>
          <div className="_flex _mr5">
            <Toggle className="_mr-sm" />I have two PD values
          </div>
          <Button onClick={() => {}}>Measure PD</Button>

          <div className="_flex _gap">
            <TextInput
              name="sphere-left"
              className="_flex-1"
              placeholder="1 - 180"
              value={formik.values.pdLeft}
              onChange={(e) => formik.setFieldValue("pdLeft", e.target.value)}
            />
            <TextInput
              name="sphere-right"
              className="_flex-1"
              placeholder="1 - 180"
              value={formik.values.pdRight}
              onChange={(e) => formik.setFieldValue("pdRight", e.target.value)}
            />
          </div>
          <p className="form__footer">
            <Info fill="#333" width={16} /> Please note: We'll round down your
            PD to the nearest whole number, and will apply an automatic
            adjustment to your PD for reading prescriptions.
          </p>
        </div>

        <div className="form">
          <h2 className="form__headline">Prescription test date</h2>
          <div className="_flex _gap">
            <TextInput
              name="sphere-left"
              className="_flex-1"
              placeholder="DD"
              value={formik.values.date.dd}
              onChange={(e) => formik.setFieldValue("date.dd", e.target.value)}
            />
            <TextInput
              name="sphere-right"
              className="_flex-1"
              placeholder="MM"
              value={formik.values.date.mm}
              onChange={(e) => formik.setFieldValue("date.mm", e.target.value)}
            />
            <TextInput
              name="sphere-right"
              className="_flex-1"
              placeholder="YYYY"
              value={formik.values.date.yyyy}
              onChange={(e) =>
                formik.setFieldValue("date.yyyy", e.target.value)
              }
            />
          </div>
        </div>

        <div className="form">
          <p>
            By clicking next I confirm that the prescription information entered
            is correct.
          </p>
          <Button size="xxl" onClick={() => formik.handleSubmit()}>
            Next
          </Button>
        </div>
      </section>
    </FullScreen>
  );
};

export default Playground;
