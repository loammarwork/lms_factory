/** @format */

import Modal from "./Modal/Modal";
import ModalContent from "./Modal/ModalContent";
import ModalHeader from "./Modal/ModalHeader";
import ModalTitle from "./Modal/ModalTitle";
import ModalBody from "./Modal/ModalBody";
import ModalFooter from "./Modal/ModalFooter";
import ReactDOM from "react-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductInStoreSideLineAsync, fetchProductInStoreSideLineFindAsync } from "../Actions/productInStoreSideLineAction";
import { fetchPatternAsync } from "../Actions/patternAction";
import { savePatternOneHttp } from "../Http/PatternHttp";

const ModalAddPattern = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productInStoreSideLine);
  const productStatus = useSelector((state) => state.productInStoreSideLineStatus);
  const [keyword, setKeyword] = useState("");
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current === false) {
      dispatch(fetchProductInStoreSideLineAsync());
      didMount.current = true;
    } else {
      let timer = setTimeout(() => {
        clearTimeout(timer);
        dispatch(fetchProductInStoreSideLineFindAsync(keyword));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [keyword, dispatch]);

  function findProduct(keyword) {
    if (keyword !== "") dispatch(fetchProductInStoreSideLineFindAsync(keyword));
    else dispatch(fetchProductInStoreSideLineAsync(keyword));
  }
  async function savePatternOne(pd_code) {
    console.log(pd_code);
    await savePatternOneHttp(pd_code);
    dispatch(fetchPatternAsync());
    document.getElementById("btn-close-modal-add-pattern").click();
  }
  return ReactDOM.createPortal(
    <>
      <Modal id="modal-add-pattern" style={{ width: 1350 }}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Setup Pattern</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <div style={{ display: "flex" }}>
              <input
                type="text"
                id="keyword"
                className="form-control"
                value={keyword}
                onChange={(e) => {
                  setKeyword(() => e.target.value);
                }}
                style={{ height: 40 }}
                placeholder="Find product here..."
              />
              <button onClick={() => findProduct(keyword)} className="btn bg-blue waves-effect" style={{ width: 120 }}>
                <i className={`material-icons`}>search</i>
                <span>Search</span>
              </button>
            </div>
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
                  Product List
                </h2>
              </div>

              <div
                style={{
                  height: "246px",
                  overflow: "auto",
                  border: "1px solid #000",
                }}
              >
                <table className="table table-bordered border-primary">
                  <thead style={{ position: "sticky", top: "0px", zIndex: 100 }}>
                    <tr className="bg-indigo">
                      <td width={130}>Product Code</td>
                      <td width={50}>Barcode</td>
                      <td>Part Name</td>
                      <td>Part No</td>
                      <td>Part Code</td>
                      <td>Customer</td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {productStatus.loading === false && product.length === 0 && (
                      <tr>
                        <th>Data not found</th>
                      </tr>
                    )}
                    {productStatus.loading === true && (
                      <tr>
                        <th>loading...</th>
                      </tr>
                    )}
                    {productStatus.loading === false &&
                      product.map((item, index) => (
                        <tr key={index}>
                          <th>{item.pd_code}</th>
                          <td>{item.barcode_c}</td>
                          <td>{item.part_name}</td>
                          <td>{item.part_no}</td>
                          <td>{item.part_code}</td>
                          <td>{item.customer}</td>
                          <td>
                            <button onClick={() => savePatternOne(item.pd_code)} className="btn bg-green waves-effect" type="button">
                              <i className="material-icons">add</i>
                              <span>ADD</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ModalBody>
          <ModalFooter color="light-blue">
            <button id="btn-close-modal-add-pattern" type="button" className="btn bg-red waves-effect" data-dismiss="modal">
              <i className="material-icons">cancel</i>
              <span>CLOSE</span>
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>,
    document.getElementById("modal-layer2-overlay")
  );
};

export default ModalAddPattern;
