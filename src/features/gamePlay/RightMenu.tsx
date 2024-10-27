import { useState } from "react";
import "./RightMenu.css";

import Drawer from "@components/Drawer";

const RightMenu = () => {
  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  return (
    <Drawer
      showButton
      isOpen={isRightDrawerOpen}
      position="right"
      onVisibleChange={setRightDrawerOpen}
    >
      <div>1</div>
    </Drawer>
  );
};

export default RightMenu;
