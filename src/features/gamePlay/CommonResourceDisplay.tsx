import "./CommonResourceDisplay.css";
import { getNumberAbbr } from "@features/creatures/models";

interface Props {
  iconImagePath: string;
  amount: number;
}

const CommonResourceDisplay = ({ iconImagePath, amount }: Props) => {
  return (
    <div className="common-resource-display-container">
      <img src={iconImagePath} className="common-resource-display-image" />
      <p className="common-resource-display-text">{getNumberAbbr(amount)}</p>
    </div>
  );
};

export default CommonResourceDisplay;
