/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterialStoreSideLineAsync } from "../../Actions/materialStoreSideLineAction";
import { fetchStoreSideLineAsync } from "../../Actions/storeSideLineAction";
import { usePartMaterialStoreSideLineHttp as uPartMaterialStoreSideLineHttp } from "../../Http/MaterialStoreSideLineHttp";
import { usePartStoreSideLineHttp as uPartStoreSideLineHttp } from "../../Http/StoreSideLineHttp";
import Body from "../../UI/Body";
import Container from "../../UI/Container";
import Content from "../../UI/Content";
import ModalMaterialStoreSideLine from "../../UI/ModalMaterialStoreSideLine";
import ModalStoreSideLine from "../../UI/ModalStoreSideLine";
import Alert from "../../Utils/Alert";

const Store = () => {
  const dispatch = useDispatch();
  const materialStoreSideLine = useSelector((state) => state.materialStoreSideLine);
  const materialStoreSideLineStatus = useSelector((state) => state.materialStoreSideLineStatus);
  const storeSideLine = useSelector((state) => state.storeSideLine);
  const storeSideLineStatus = useSelector((state) => state.storeSideLineStatus);
  const [pdCodeSelectStoreMaterial, setPdCodeSelectStoreMaterial] = useState("");
  const [amountStoreMaterial, setAmountStoreMaterial] = useState(1);
  const [pdCodeSelectStore, setPdCodeSelectStore] = useState("");
  const [amountStore, setAmountStore] = useState(1);

  useEffect(() => {
    dispatch(fetchMaterialStoreSideLineAsync());
    dispatch(fetchStoreSideLineAsync());
  }, [dispatch]);

  async function usePartMaterialStoreSideLine(e) {
    e.preventDefault();

    if (pdCodeSelectStoreMaterial !== "" && amountStoreMaterial !== 0) {
      let index = materialStoreSideLine.findIndex((item) => item.pd_code === pdCodeSelectStoreMaterial);
      if (index === -1) {
        Alert.error("No Product Code");
        setPdCodeSelectStoreMaterial("");
      } else {
        await uPartMaterialStoreSideLineHttp({ pd_code: pdCodeSelectStoreMaterial, amount: amountStoreMaterial });
        setPdCodeSelectStoreMaterial("");
        dispatch(fetchMaterialStoreSideLineAsync());
        Alert.success(`Product Code ${pdCodeSelectStoreMaterial} is out ${amountStoreMaterial}`);
      }
    } else {
      Alert.error("No Product Code");
    }
  }

  async function usePartStoreSideLine(e) {
    e.preventDefault();

    if (pdCodeSelectStore !== "" && amountStore !== 0) {
      let index = storeSideLine.findIndex((item) => item.pd_code === pdCodeSelectStore);
      if (index === -1) {
        Alert.error("No Product Code");
        setPdCodeSelectStore("");
      } else {
        await uPartStoreSideLineHttp({ pd_code: pdCodeSelectStore, amount: amountStore });
        setPdCodeSelectStore("");
        dispatch(fetchStoreSideLineAsync());
        Alert.success(`Product Code ${pdCodeSelectStore} is out ${amountStore}`);
      }
    } else {
      Alert.error("No Product Code");
      setPdCodeSelectStore("");
    }
  }
  return (
    <Content>
      <Container>
        <ModalMaterialStoreSideLine />
        <ModalStoreSideLine />
        <Body style={{ paddingTop: 0, margin: 0 }}>
          <form onSubmit={usePartMaterialStoreSideLine}>
            <div>
              <div style={{ display: "flex", marginTop: 20 }}>
                {/*  <select className="form-control" value={pdCodeSelectStoreMaterial} onChange={(e) => setPdCodeSelectStoreMaterial(e.target.value)}>
                  <option value="">--Select Product Code--</option>
                  {materialStoreSideLine.map((item, index) => {
                    return (
                      <option key={index} value={`${item.pd_code}`}>
                        {item.pd_code}
                      </option>
                    );
                  })}
                </select> */}
                <input
                  value={pdCodeSelectStoreMaterial}
                  onChange={(e) => {
                    setPdCodeSelectStoreMaterial(e.target.value);
                  }}
                  style={{ borderRadius: "0" }}
                  type="text"
                  className="form-control"
                  placeholder="Product Code"
                />
                <input value={amountStoreMaterial} onChange={(e) => setAmountStoreMaterial(e.target.value)} style={{ borderRadius: "0" }} type="number" className="form-control" placeholder="Amount" />
                <button style={{ width: 300 }} data-toggle="modal" data-target="#modal-material-store-side-line" type="button" className="btn btn-info mb-2 waves-effect">
                  <i className={`material-icons`}>settings</i>
                  <span>Setup</span>
                </button>
                <button style={{ width: 300 }} type="submit" className="btn btn-primary mb-2 waves-effect">
                  <i className={`material-icons`}>trending_flat</i>
                  <span> Material Out</span>
                </button>
              </div>
            </div>
          </form>

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
                Material Store Sideline
              </h2>
            </div>
            <div
              style={{
                height: "220px",
                overflow: "auto",
                border: "1px solid #000",
                borderTop: "none",
              }}
            >
              <table className="table table-bordered border-primary" style={{ borderTop: 0, borderCollapse: "unset" }}>
                <thead style={{ position: "sticky", top: "0px" }}>
                  <tr className="bg-indigo">
                    <td rowSpan={2} width={150} style={{ verticalAlign: "middle" }}>
                      Part No.
                    </td>
                    <td rowSpan={2} width={150} style={{ verticalAlign: "middle" }}>
                      Part Name
                    </td>
                    <td rowSpan={2} width={76} style={{ verticalAlign: "middle" }}>
                      Customer
                    </td>
                    <td rowSpan={1} width={85} style={{ verticalAlign: "middle" }}>
                      AGV Order
                    </td>
                    <td colSpan={2}>Stock (Kanban)</td>
                    <td>Kanban Actual</td>
                    <td>Unit Kanban</td>
                    <td>Amount</td>
                    <td>Stock LT</td>
                  </tr>
                  <tr className="bg-indigo">
                    <td>per day</td>
                    <td>Min (KB)</td>
                    <td>Max (KB)</td>
                    <td>KB</td>
                    <td>Pcs/KB</td>
                    <td>Pcs</td>
                    <td>Day</td>
                  </tr>
                </thead>
                <tbody>
                  {materialStoreSideLineStatus.loading === true && (
                    <tr>
                      <th>loading....</th>
                    </tr>
                  )}
                  {materialStoreSideLineStatus.loading === false &&
                    materialStoreSideLine.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.part_no}</th>
                          <td>{item.part_name}</td>
                          <td>{item.customer}</td>
                          <td>{item.agv_order_per_day}</td>
                          <td>{item.stock_kanban_min}</td>
                          <td>{item.stock_kanban_max}</td>
                          {item.kanban_actual < item.stock_kanban_min ? <td style={{ backgroundColor: "red" }}>{item.kanban_actual}</td> : <td>{item.kanban_actual}</td>}
                          <td>{item.unit_kanban}</td>
                          <td>{item.kanban_actual * item.unit_kanban}</td>
                          <td>{((item.stock_kanban_max * item.unit_kanban) / item.agv_order_per_day).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Body>
        <Body style={{ paddingTop: 0, margin: 0 }}>
          <form onSubmit={usePartStoreSideLine}>
            <div style={{ display: "flex", marginTop: 20 }}>
              {/* <select className="form-control" value={pdCodeSelectStore} onChange={(e) => setPdCodeSelectStore(e.target.value)}>
              <option value="">--Select Product Code--</option>
              {storeSideLine.map((item, index) => {
                return (
                  <option key={index} value={`${item.pd_code}`}>
                    {item.pd_code}
                  </option>
                );
              })}
            </select> */}
              <input
                value={pdCodeSelectStore}
                onChange={(e) => {
                  setPdCodeSelectStore(e.target.value);
                }}
                style={{ borderRadius: "0" }}
                type="text"
                className="form-control"
                placeholder="Product Code"
              />
              <input
                value={amountStore}
                onChange={(e) => {
                  setAmountStore(e.target.value);
                }}
                style={{ borderRadius: "0" }}
                type="number"
                className="form-control"
                placeholder="Amount"
              />
              <button style={{ width: 300 }} data-toggle="modal" data-target="#modal-store-side-line" type="button" className="btn btn-info mb-2 waves-effect">
                <i className={`material-icons`}>settings</i>
                <span>Setup</span>
              </button>
              <button style={{ width: 300 }} type="submit" className="btn btn-primary mb-2 waves-effect">
                <i className={`material-icons`}>trending_flat</i>
                <span> Store Out</span>
              </button>
            </div>
          </form>

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
                Store Sideline
              </h2>
            </div>
            <div
              style={{
                height: "220px",
                overflow: "auto",
                border: "1px solid #000",
                borderTop: "none",
              }}
            >
              <table className="table table-bordered border-primary" style={{ borderTop: 0, borderCollapse: "unset" }}>
                <thead style={{ position: "sticky", top: "0px" }}>
                  <tr className="bg-indigo">
                    <td rowSpan={2} width={150} style={{ verticalAlign: "middle" }}>
                      Part No.
                    </td>
                    <td rowSpan={2} width={150} style={{ verticalAlign: "middle" }}>
                      Part Name
                    </td>
                    <td rowSpan={2} width={76} style={{ verticalAlign: "middle" }}>
                      Customer
                    </td>
                    <td rowSpan={1} width={85} style={{ verticalAlign: "middle" }}>
                      AGV Order
                    </td>
                    <td colSpan={2}>Stock (Kanban)</td>
                    <td>Kanban Actual</td>
                    <td>Unit Kanban</td>
                    <td>Amount</td>
                    <td>Stock LT</td>
                  </tr>
                  <tr className="bg-indigo">
                    <td>per day</td>
                    <td>Min (KB)</td>
                    <td>Max (KB)</td>
                    <td>KB</td>
                    <td>Pcs/KB</td>
                    <td>Pcs</td>
                    <td>Day</td>
                  </tr>
                </thead>
                <tbody>
                  {storeSideLineStatus.loading === true && (
                    <tr>
                      <th>loading....</th>
                    </tr>
                  )}
                  {storeSideLineStatus.loading === false &&
                    storeSideLine.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{item.part_no}</th>
                          <td>{item.part_name}</td>
                          <td>{item.customer}</td>
                          <td>{item.agv_order_per_day}</td>
                          <td>{item.stock_kanban_min}</td>
                          <td>{item.stock_kanban_max}</td>
                          {item.kanban_actual < item.stock_kanban_min ? <td style={{ backgroundColor: "red" }}>{item.kanban_actual}</td> : <td>{item.kanban_actual}</td>}
                          <td>{item.unit_kanban}</td>
                          <td>{item.kanban_actual * item.unit_kanban}</td>
                          <td>{((item.stock_kanban_max * item.unit_kanban) / item.agv_order_per_day).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </Body>
      </Container>
    </Content>
  );
};

export default Store;
