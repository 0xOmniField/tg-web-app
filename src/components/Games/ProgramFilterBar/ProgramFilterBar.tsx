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

const ProgramFilterBar = () => {
  const dispatch = useAppDispatch();
  const onClickAllResourcesToggle = () => dispatch(resetFilter({}));
  const onClickResourceTypeToggle = (type: ResourceType) => () =>
    dispatch(toggleFilter({ type: type }));

  return (
    <div className="program-filter-bar-container">
      <div className="program-filter-bar-filters-container">
        <ProgramFilterButton
          isSelected={useAppSelector(selectIsAllResourcesToggled)}
          text={"All"}
          onClick={onClickAllResourcesToggle}
        />

        {allResourceTypes.map((type, index) => (
          <ProgramFilterButton
            key={index}
            isSelected={useAppSelector(selectIsResourceTypeToggled(type))}
            iconImagePath={getResourceIconPath(type)}
            onClick={onClickResourceTypeToggle(type)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramFilterBar;
