/** @format */

import { combineReducers } from "redux";
import { boardReducer } from "./boardReducer";
import { boardStatusReducer } from "./boardStatusReducer";
import { echutterReducer } from "./echutterReducer";
import { echutterStatusReducer } from "./echutterStatusReducer";
import { instructionReducer } from "./instructionReducer";
import { instructionStatusReducer } from "./instructionReducerStatus";
import { lotSizeReducer } from "./lotSizeReducer";
import { lotSizeStatusReducer } from "./lotSizeStatusReducer";
import { materialStoreSideLineReducer } from "./materialStoreSideLineReducer";
import { materialStoreSideLineStatusReducer } from "./materialStoreSideLineStatusReducer";
import { paretoChartReducer } from "./paretoChartReducer";
import { paretoChartStatusReducer } from "./paretoChartStatusReducer";
import { patternReducer } from "./patternReducer";
import { patternStatusReducer } from "./patternStatusReducer";
import { productInStoreSideLineReducer } from "./productInStoreSideLineReducer";
import { productInStoreSideLineStatusReducer } from "./productInStoreSideLineStatusReducer";
import { productReducer } from "./productReducer";
import { productStatusReducer } from "./productStatusReducer";
import { storeSideLineReducer } from "./storeSideLineReducer";
import { storeSideLineStatusReducer } from "./storeSideLineStatusReducer";

export const rootReducer = combineReducers({
  board: boardReducer,
  boardStatus: boardStatusReducer,
  echutter: echutterReducer,
  echutterStatus: echutterStatusReducer,
  lotSize: lotSizeReducer,
  lotSizeStatus: lotSizeStatusReducer,
  pattern: patternReducer,
  patternStatus: patternStatusReducer,
  paretoChart: paretoChartReducer,
  paretoChartStatus: paretoChartStatusReducer,
  product: productReducer,
  productStatus: productStatusReducer,
  productInStoreSideLine: productInStoreSideLineReducer,
  productInStoreSideLineStatus: productInStoreSideLineStatusReducer,
  materialStoreSideLine: materialStoreSideLineReducer,
  materialStoreSideLineStatus: materialStoreSideLineStatusReducer,
  storeSideLine: storeSideLineReducer,
  storeSideLineStatus: storeSideLineStatusReducer,
  instruction: instructionReducer,
  instructionStatus: instructionStatusReducer,
});

// {board:[]}
