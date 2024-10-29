import { combineReducers } from "redux";
import resourcesReducer from "../creatures/resources";
import propertiesReducer from "./propertiesSlice";
import creaturesReducer from "../creatures/creatures";
import programsReducer from "../creatures/programs";
// import guidesReducer from "./guides"

export default combineReducers({
  resources: resourcesReducer,
  properties: propertiesReducer,
  creatures: creaturesReducer,
  programs: programsReducer,
  // guides: guidesReducer,
});
