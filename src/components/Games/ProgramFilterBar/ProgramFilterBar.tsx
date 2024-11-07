import "./ProgramFilterBar.css";
import { useAppSelector, useAppDispatch } from "@app/hooks";
import ProgramFilterButton from "./ProgramFilterButton";
import {
  resetFilter,
  toggleFilter,
  selectIsAllResourcesToggled,
  selectIsResourceTypeToggled,
} from "@features/creatures/programs";

import {
  allResourceTypes,
  getResourceIconPath,
  ResourceType,
} from "@features/creatures/models";
import { memo } from "react";
const WrapperProgram = ({
  type,
  index,
  onClick,
}: {
  type: any;
  index: number;
  onClick: () => void;
}) => {
  return (
    <ProgramFilterButton
      position={index === allResourceTypes.length - 1 ? "right" : "middle"}
      isSelected={useAppSelector(selectIsResourceTypeToggled(type))}
      iconImagePath={getResourceIconPath(type)}
      onClick={onClick}
    />
  );
};

const ProgramFilterBar = memo(() => {
  const dispatch = useAppDispatch();
  const onClickAllResourcesToggle = () => dispatch(resetFilter());
  const onClickResourceTypeToggle = (type: ResourceType) => () => {
    dispatch(toggleFilter({ type: type }));
  };
  const allSelect = useAppSelector(selectIsAllResourcesToggled);
  console.log("ProgramFilterBar");
  return (
    <div className="program-filter-bar-container">
      <div className="program-filter-bar-filters-container">
        <ProgramFilterButton
          isSelected={allSelect}
          text={"All"}
          onClick={onClickAllResourcesToggle}
          position="left"
        />
        {/* <ProgramFilterButton
          position={"middle"}
          isSelected={useAppSelector(selectIsResourceTypeToggled(1))}
          iconImagePath={getResourceIconPath(1)}
          onClick={onClickResourceTypeToggle(1)}
        /> */}
        {allResourceTypes.map((type, index) => (
          <WrapperProgram
            type={type}
            key={index}
            index={index}
            onClick={onClickResourceTypeToggle(type)}
          />
        ))}
      </div>
    </div>
  );
});

export default ProgramFilterBar;
