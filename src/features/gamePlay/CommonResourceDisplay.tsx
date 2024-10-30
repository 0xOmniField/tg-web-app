import { useAppSelector } from "@app/hooks";
import "./CommonResourceDisplay.css";
import { getNumberAbbr } from "@features/creatures/models";
import { selectCommonResource } from "@features/creatures/resources";
import { selectSelectedRareResources } from "@features/creatures/creatures";

interface Props {
  iconImagePath: string;
  amount: number;
  index: number;
}

const CommonResourceDisplay = ({ iconImagePath, amount, index }: Props) => {
  const RareAmount = useAppSelector(selectSelectedRareResources(amount));
  const commonAmount = useAppSelector(selectCommonResource(amount));

  return (
    <div className="common-resource-display-container">
      <img src={iconImagePath} className="common-resource-display-image" />
      <p className="common-resource-display-text">
        {getNumberAbbr(index >= 8 ? RareAmount : commonAmount)}
      </p>
    </div>
  );
};

export default CommonResourceDisplay;
