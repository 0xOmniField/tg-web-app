import { useState } from "react";
import "./RightMenu.css";

import Drawer from "@components/Drawer";
import {
  commonResourceTypes,
  getResourceIconPath,
} from "@features/creatures/models";
import { useAppSelector } from "@app/hooks";
import { selectCommonResource } from "@features/creatures/resources";
import CommonResourceDisplay from "./CommonResourceDisplay";

const RightMenu = () => {
  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  return (
    <Drawer
      showButton
      isOpen={isRightDrawerOpen}
      position="right"
      onVisibleChange={setRightDrawerOpen}
    >
      <div className="menu_bg_right">
        <div className="menu_card">
          {commonResourceTypes.map((type, index) => (
            <CommonResourceDisplay
              key={index}
              iconImagePath={getResourceIconPath(type)}
              amount={useAppSelector(selectCommonResource(type))}
            />
          ))}
        </div>
      </div>
    </Drawer>
  );
};

export default RightMenu;
