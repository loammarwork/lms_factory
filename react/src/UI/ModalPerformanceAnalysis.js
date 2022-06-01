/** @format */

import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalHeader from "./Modal/ModalHeader";
import ModalTitle from "./Modal/ModalTitle";
import ModalBody from "./Modal/ModalBody";
import ModalFooter from "./Modal/ModalFooter";
import ReactDOM from "react-dom";
import Row from "./Row";
import Col from "./Col";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import InputTimeUntilMask from "./Input/InputTimeUntilMask";
import InputDateMask from "./Input/InputDateMask";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useMemo } from "react";
import { PerformanceAnalysisHttp, PerformanceAnalysisTimeTableSaveHttp } from "../Http/PerformanceAnalysisHttp";
import { useDispatch } from "react-redux";
import { fetchBoardAsync } from "../Actions/boardAction";
import Alert from "../Utils/Alert";
const ModalPerformanceAnalysis = () => {
  const dispatch = useDispatch();
  const validationSchema = useMemo(
    () =>
      Yup.object({
        date: Yup.string()
          .required("Required")
          .matches(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/g, "Date format incorrect!"),
        line_name: Yup.string().required("Required"),
        operator_name: Yup.string().required("Required"),
        order_per_day: Yup.string().required("Required"),
        takt_time_line: Yup.string().required("Required"),
        std_cycle_time: Yup.string().required("Required"),
        normal_working_time: Yup.string().required("Required"),
        over_time: Yup.string().required("Required"),
        first_shift: Yup.array().of(
          Yup.object().shape({
            time: Yup.string()
              .required("Required")
              .matches(/[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/g, "Time format incorrect"),
            plan_per_hours: Yup.string().required("Required").matches(/\d/g, "Time plan min"),
          })
        ),
        second_shift: Yup.array().of(
          Yup.object().shape({
            time: Yup.string()
              .required("Required")
              .matches(/[0-9][0-9]:[0-9][0-9]-[0-9][0-9]:[0-9][0-9]/g, "Time format incorrect"),
            plan_per_hours: Yup.string().required("Required").matches(/\d/g, "Time plan min"),
          })
        ),
      }),
    []
  );
  const resolver = yupResolver(validationSchema);
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    resolver,
    reValidateMode: "all",
    mode: "all",
    criteriaMode: "all",
    defaultValues: {
      date: "2022-03-26", //YYYY-MM-DD
      line_name: "Knob Assembly",
      operator_name: "John Doe", //john doe
      order_per_day: 0,
      takt_time_line: 0,
      std_cycle_time: 0,
      normal_working_time: 0,
      over_time: 0,
    },
  });
  const first_shift = useFieldArray({
    control,
    name: "first_shift",
  });
  const second_shift = useFieldArray({
    control,
    name: "second_shift",
  });

  useEffect(() => {
    async function getData() {
      let data = await PerformanceAnalysisHttp();
      console.log(data);
      reset({
        date: data.date, //YYYY-MM-DD
        line_name: data.line_name,
        operator_name: data.operator_name, //john doe
        order_per_day: data.order_per_day,
        takt_time_line: data.takt_time_line,
        std_cycle_time: data.std_cycle_time,
        normal_working_time: data.normal_working_time,
        over_time: data.over_time,
      });
      first_shift.replace(data.first_shift);
      second_shift.replace(data.second_shift);
    }

    getData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data) => {
    data = await PerformanceAnalysisTimeTableSaveHttp(data);
    dispatch(fetchBoardAsync());
    document.getElementById("btn-close-modal-performance-analysis").click();
    Alert.success("Time has been updated!");
  };
  /* console.log(errors);
  console.log(watch()); */
  const watchFieldArrayFirstShift = watch("first_shift");
  const watchFieldArraySecondShift = watch("second_shift");
  let normal_working_time = watch("normal_working_time");
  let over_time = watch("over_time");
  let order_per_day = watch("order_per_day");
  let takt_time_line = watch("takt_time_line");

  let total_working_time = parseFloat(normal_working_time) + parseFloat(over_time);
  let check_work_load = ((parseFloat(order_per_day) * parseFloat(takt_time_line)) / 3600).toFixed(2);
  let over_load = isNaN((parseFloat(check_work_load) / parseFloat(total_working_time)) * 100 - 100) ? "Cannot Calculate" : ((parseFloat(check_work_load) / parseFloat(total_working_time)) * 100 - 100).toFixed(2);

  const controlledFieldsFirstShift = first_shift.fields.map((field, index) => {
    return {
      ...first_shift.field,
      ...watchFieldArrayFirstShift[index],
    };
  });
  const controlledFieldsSecondShift = second_shift.fields.map((field, index) => {
    return {
      ...second_shift.field,
      ...watchFieldArraySecondShift[index],
    };
  });
  //console.log("updated a", controlledFieldsFirstShift);
  //console.log("updated b", controlledFieldsSecondShift);
  return ReactDOM.createPortal(
    <>
      <Modal id="modal-performance-analysis" style={{ width: 1350 }}>
        <ModalContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <ModalTitle>Setup Default Data Time</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col lg="6">
                  <Col lg="6">
                    <table className="body table-bordered">
                      <tbody>
                        <tr>
                          <th>Date</th>
                          <td>
                            <Controller control={control} name="date" render={({ field }) => <InputDateMask placeholder="YYYY-MM-DD" {...field} />} />
                          </td>
                        </tr>
                        <tr>
                          <th>Line Name</th>
                          <td>
                            <input style={{ textAlign: "center" }} className="form-control" {...register("line_name")} />
                          </td>
                        </tr>
                        <tr>
                          <th>Operator Name</th>
                          <td>
                            <input style={{ textAlign: "center" }} className="form-control" {...register("operator_name")} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                  <Col lg="6">
                    <table className="body table-bordered">
                      <tbody>
                        <tr>
                          <th>Order per day</th>
                          <td>
                            <input type="number" style={{ textAlign: "center" }} className="form-control" {...register("order_per_day")} />
                          </td>
                          <th>Unit</th>
                        </tr>
                        <tr>
                          <th>Takt Time Line</th>
                          <td>
                            <input type="number" style={{ textAlign: "center" }} className="form-control" {...register("takt_time_line")} />
                          </td>
                          <th>Sec</th>
                        </tr>
                        <tr>
                          <th>STD Cycle Time</th>
                          <td>
                            <input type="number" style={{ textAlign: "center" }} className="form-control" {...register("std_cycle_time")} />
                          </td>
                          <th>Sec</th>
                        </tr>
                        <tr>
                          <th>Normal Working Time</th>
                          <td>
                            <input type="number" style={{ textAlign: "center" }} className="form-control" {...register("normal_working_time")} />
                          </td>
                          <th>Hr.</th>
                        </tr>
                        <tr>
                          <th>Over Time</th>
                          <td>
                            <input type="number" style={{ textAlign: "center" }} className="form-control" {...register("over_time")} />
                          </td>
                          <th>Hr.</th>
                        </tr>

                        <tr>
                          <th>Total Working Time</th>
                          <td style={{ textAlign: "center" }}>{total_working_time}</td>
                          <th>Hr.</th>
                        </tr>
                        <tr>
                          <th>Check Workload</th>
                          <td style={{ textAlign: "center" }}>{check_work_load}</td>
                          <th>Hr.</th>
                        </tr>
                        <tr>
                          <th>% Overload</th>
                          <td style={{ textAlign: "center" }}>{over_load}</td>
                          <th>%</th>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Col>
                <Col lg="6">
                  <Col lg="6">
                    <div className="table" style={{ padding: 0, margin: 0 }}>
                      <div style={{ display: "flex" }}>
                        <h2
                          className="bg-white"
                          style={{
                            margin: 0,
                            width: "100%",
                            textAlign: "center",
                            padding: "3px 0 3px 0",
                            color: "#000",
                            border: "1px solid gray",

                            borderBottom: "none",
                          }}
                        >
                          First Shift
                        </h2>
                        <button className="btn bg-green waves-effect" style={{ width: 120 }} onClick={() => first_shift.append({ time: "" })}>
                          <i className={`material-icons`}>settings</i>
                          <span>Add</span>
                        </button>
                      </div>
                      <div
                        style={{
                          height: "480px",
                          overflow: "auto",
                          border: "1px solid #000",
                          borderTop: "none",
                        }}
                      >
                        <table className="table table-bordered border-primary" style={{ borderTop: 0, borderCollapse: "unset" }}>
                          <thead
                            style={{
                              position: "sticky",
                              top: "0px",
                              zIndex: 1,
                            }}
                          >
                            <tr className="bg-indigo">
                              <td colSpan={3} rowSpan={2}>
                                Time
                              </td>
                              <td rowSpan={1}>Plan</td>
                              <td colSpan={1} rowSpan={2}>
                                Setting
                              </td>
                            </tr>
                            <tr className="bg-indigo">
                              <td> Time(min)</td>
                            </tr>
                          </thead>
                          <tbody>
                            {controlledFieldsFirstShift.map((field, index) => (
                              <tr key={index}>
                                <td colSpan={3}>
                                  <InputTimeUntilMask
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                    }}
                                    key={field.id}
                                    {...register(`first_shift.${index}.time`)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    style={{
                                      width: "80px",
                                      textAlign: "center",
                                    }}
                                    key={field.id}
                                    {...register(`first_shift.${index}.plan_per_hours`)}
                                  ></input>
                                </td>
                                <td>
                                  <button
                                    className="btn bg-red waves-effect"
                                    onClick={() => {
                                      first_shift.remove(index);
                                    }}
                                  >
                                    <i className={`material-icons`}>cancel</i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>
                  <Col lg="6">
                    <div className="table" style={{ padding: 0, margin: 0 }}>
                      <div style={{ display: "flex" }}>
                        <h2
                          className="bg-white"
                          style={{
                            margin: 0,
                            width: "100%",
                            textAlign: "center",
                            padding: "3px 0 3px 0",
                            color: "#000",
                            border: "1px solid gray",

                            borderBottom: "none",
                          }}
                        >
                          Second Shift
                        </h2>
                        <button className="btn bg-green waves-effect" style={{ width: 120 }} onClick={() => second_shift.append({ time: "" })}>
                          <i className={`material-icons`}>settings</i>
                          <span>Add</span>
                        </button>
                      </div>
                      <div
                        style={{
                          height: "480px",
                          overflow: "auto",
                          border: "1px solid #000",
                          borderTop: "none",
                        }}
                      >
                        <table className="table table-bordered border-primary" style={{ borderTop: 0, borderCollapse: "unset" }}>
                          <thead
                            style={{
                              position: "sticky",
                              top: "0px",
                              zIndex: 1,
                            }}
                          >
                            <tr className="bg-indigo">
                              <td colSpan={3} rowSpan={2}>
                                Time
                              </td>
                              <td rowSpan={1}>Plan</td>
                              <td colSpan={1} rowSpan={2}>
                                Setting
                              </td>
                            </tr>
                            <tr className="bg-indigo">
                              <td> Time(min)</td>
                            </tr>
                          </thead>
                          <tbody>
                            {controlledFieldsSecondShift.map((field, index) => (
                              <tr key={index}>
                                <td colSpan={3}>
                                  <InputTimeUntilMask
                                    style={{
                                      width: "100%",
                                      textAlign: "center",
                                    }}
                                    key={field.id}
                                    {...register(`second_shift.${index}.time`)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    style={{
                                      width: "80px",
                                      textAlign: "center",
                                    }}
                                    key={field.id}
                                    {...register(`second_shift.${index}.plan_per_hours`)}
                                  ></input>
                                </td>
                                <td>
                                  <button className="btn bg-red waves-effect" onClick={() => second_shift.remove(index)}>
                                    <i className={`material-icons`}>cancel</i>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Col>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter color="light-blue">
              <button id="submit" type="submit" className={`btn bg-${Object.keys(errors).length > 0 ? "gray" : "indigo"} waves-effect`} disabled={Object.keys(errors).length > 0}>
                <i className="material-icons">save</i>
                <span>UPDATE</span>
              </button>
              <button id="btn-close-modal-performance-analysis" type="button" className="btn bg-red waves-effect" data-dismiss="modal">
                <i className="material-icons">cancel</i>
                <span>CLOSE</span>
              </button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("modal-overlay")
  );
};

export default ModalPerformanceAnalysis;
