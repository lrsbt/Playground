import React, { useEffect, useRef } from "react";

import "./styles.css";
import info from "./info.md";
import { FullScreen } from "@app/components";

import { useFormik } from "formik";
import { useFormOptions } from "./useFormOptions";
import { InfoInverted as Info } from "../../components/Icons";
import { Toggle, Button, Dropdown, TextInput } from "./Components";
import { validationSchema } from "./schema";
import { FormControl } from "./Components/FormControl";

const Playground = () => {
  const { optionsUse, optionsSmall, optionsLarge } = useFormOptions();

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
      pdValues: 1,
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
    }
  });

  console.log(formik);

  return (
    <FullScreen centerContent info={info} className="arr-bg">
      <section className="container">
        <div className="form">
          <h2 className="form__headline">What do you use your glasses for?</h2>
          <FormControl error={formik.errors.use} touched={formik.touched.use}>
            <Dropdown
              name="use"
              options={optionsUse}
              value={formik.values.use}
              onChange={(e) => formik.setFieldValue("use", e.target.value)}
            />
          </FormControl>
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
            <FormControl
              error={formik.errors.sphereLeft}
              touched={formik.touched.sphereLeft}
            >
              <Dropdown
                name="sphere-left"
                options={optionsLarge}
                value={formik.values.sphereLeft}
                onChange={(e) =>
                  formik.setFieldValue("sphereLeft", e.target.value)
                }
              />
            </FormControl>
            <FormControl
              error={formik.errors.sphereRight}
              touched={formik.touched.sphereRight}
            >
              <Dropdown
                name="sphere-right"
                options={optionsLarge}
                value={formik.values.sphereRight}
                onChange={(e) =>
                  formik.setFieldValue("sphereRight", e.target.value)
                }
              />
            </FormControl>
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
              <FormControl
                error={formik.errors.cylinderLeft}
                touched={formik.touched.cylinderLeft}
              >
                <Dropdown
                  name="cylinder-left"
                  options={optionsLarge}
                  value={formik.values.cylinderLeft}
                  onChange={(e) =>
                    formik.setFieldValue("cylinderLeft", e.target.value)
                  }
                />
              </FormControl>
              <FormControl
                error={formik.errors.cylinderRight}
                touched={formik.touched.cylinderRight}
              >
                <Dropdown
                  name="cylinder-right"
                  options={optionsLarge}
                  value={formik.values.cylinderRight}
                  onChange={(e) =>
                    formik.setFieldValue("cylinderRight", e.target.value)
                  }
                />
              </FormControl>
            </div>
          </>

          <hr />

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
              <FormControl
                error={formik.errors.axisLeft}
                touched={formik.touched.axisLeft}
              >
                <TextInput
                  name="axis-left"
                  placeholder="1 - 180"
                  value={formik.values.axisLeft}
                  onChange={(e) =>
                    formik.setFieldValue("axisLeft", e.target.value)
                  }
                />
              </FormControl>
              <FormControl
                error={formik.errors.axisRight}
                touched={formik.touched.axisRight}
              >
                <TextInput
                  name="axis-right"
                  placeholder="1 - 180"
                  value={formik.values.axisRight}
                  onChange={(e) =>
                    formik.setFieldValue("axisRight", e.target.value)
                  }
                />
              </FormControl>
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
            <FormControl
              error={formik.errors.addLeft}
              touched={formik.touched.addLeft}
            >
              <Dropdown
                name="add-left"
                options={optionsSmall}
                value={formik.values.addLeft}
                onChange={(e) =>
                  formik.setFieldValue("addLeft", e.target.value)
                }
              />
            </FormControl>
            <FormControl
              error={formik.errors.addRight}
              touched={formik.touched.addRight}
            >
              <Dropdown
                name="add-right"
                options={optionsSmall}
                value={formik.values.addRight}
                onChange={(e) =>
                  formik.setFieldValue("addRight", e.target.value)
                }
              />
            </FormControl>
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
          <div className="_flex _mr5 _flex-jc">
            <Toggle
              className="_mr-sm"
              isEnabled={formik.values.pdValues == 2}
              onChange={(e) =>
                formik.setFieldValue(
                  "pdValues",
                  formik.values.pdValues === 1 ? 2 : 1
                )
              }
            />
            I have two PD values
          </div>
          <Button
            onClick={() => {}}
            // variant="outline"
            style={{ width: 240, alignSelf: "center", margin: 12 }}
          >
            Measure PD
          </Button>

          <div className="_flex _gap">
            <FormControl
              error={formik.errors.pdLeft}
              touched={formik.touched.pdLeft}
            >
              <TextInput
                name="sphere-left"
                placeholder="1 - 180"
                value={formik.values.pdLeft}
                onChange={(e) => formik.setFieldValue("pdLeft", e.target.value)}
              />
            </FormControl>
            {formik.values.pdValues === 2 && (
              <FormControl
                error={formik.errors.pdRight}
                touched={formik.touched.pdRight}
              >
                <TextInput
                  name="sphere-right"
                  placeholder="1 - 180"
                  value={formik.values.pdRight}
                  onChange={(e) =>
                    formik.setFieldValue("pdRight", e.target.value)
                  }
                />
              </FormControl>
            )}
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
            <FormControl
              error={formik.errors.date?.dd}
              touched={formik.touched.date?.dd}
            >
              <TextInput
                name="sphere-left"
                placeholder="DD"
                value={formik.values.date.dd}
                onChange={(e) =>
                  formik.setFieldValue("date.dd", e.target.value)
                }
              />
            </FormControl>
            <FormControl
              error={formik.errors.date?.mm}
              touched={formik.touched.date?.mm}
            >
              <TextInput
                name="sphere-right"
                placeholder="MM"
                value={formik.values.date.mm}
                onChange={(e) =>
                  formik.setFieldValue("date.mm", e.target.value)
                }
              />
            </FormControl>
            <FormControl
              error={formik.errors.date?.yyyy}
              touched={formik.touched.date?.yyyy}
            >
              <TextInput
                name="sphere-right"
                placeholder="YYYY"
                value={formik.values.date.yyyy}
                onChange={(e) =>
                  formik.setFieldValue("date.yyyy", e.target.value)
                }
              />
            </FormControl>
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
