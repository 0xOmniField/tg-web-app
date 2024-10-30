import { useEffect, useMemo, useRef, useState } from "react";
import "./RightMenu.css";

import Drawer from "@components/Drawer";
import {
  commonResourceTypes,
  getResourceIconPath,
  rareResourceTypes,
} from "@features/creatures/models";
import CommonResourceDisplay from "./CommonResourceDisplay";
import Grid from "@components/Grid/Grid";
import PageSelector from "./PageSelector";

const RightMenu = () => {
  const [isRightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [creatureGridHeight, setCreatureGridHeight] = useState(0);
  const creatureGridRef = useRef<HTMLInputElement>(null);
  const updateCreatureGridHeight = () => {
    if (creatureGridRef.current) {
      setCreatureGridHeight(creatureGridRef.current.offsetHeight);
    }
  };
  const creatureGridElementWidth = 70;
  const creatureGridElementHeight = useMemo(() => {
    return creatureGridHeight >= 860 ? 80 : 80;
  }, [creatureGridHeight]);
  const creatureGridColumnCount = 2;
  const creatureGridRowCount = Math.floor(
    creatureGridHeight / creatureGridElementHeight
  );
  const amountPerPage = creatureGridColumnCount * creatureGridRowCount;
  const [currentPage, setCurrentPage] = useState(0);

  const [allResourceTypes] = useState([
    ...commonResourceTypes,
    ...rareResourceTypes,
  ]);

  const creatures = useMemo(() => {
    const startIndex = currentPage * amountPerPage;
    const endIndex = startIndex + amountPerPage;
    return allResourceTypes.slice(startIndex, endIndex);
  }, [amountPerPage, allResourceTypes, currentPage]);

  const pageCount = Math.max(
    Math.ceil(allResourceTypes.length / amountPerPage),
    1
  );

  const onClickPrevPageButton = () => {
    setCurrentPage((prev) => {
      return Math.max(0, prev - 1);
    });
  };

  const onClickNextPageButton = () => {
    setCurrentPage((prev) => {
      return prev + 1;
    });
  };

  useEffect(() => {
    updateCreatureGridHeight();
    window.addEventListener("resize", updateCreatureGridHeight);
    return () => {
      window.removeEventListener("resize", updateCreatureGridHeight);
    };
  }, []);
  return (
    <Drawer
      showButton
      isOpen={isRightDrawerOpen}
      position="right"
      onVisibleChange={setRightDrawerOpen}
    >
      <div className="menu_bg_right">
        <div className="new_right_top"></div>
        <div ref={creatureGridRef} className="left-creature-grid">
          <Grid
            elementWidth={creatureGridElementWidth}
            elementHeight={creatureGridElementHeight}
            columnCount={creatureGridColumnCount}
            rowCount={creatureGridRowCount}
            elements={creatures.map((type, index) => {
              return (
                <CommonResourceDisplay
                  key={index}
                  iconImagePath={getResourceIconPath(type)}
                  amount={type}
                  index={index}
                />
              );
            })}
          />
        </div>
        <div className="left-creature-page-selector">
          <PageSelector
            currentPage={currentPage}
            pageCount={pageCount}
            onClickPrevPageButton={onClickPrevPageButton}
            onClickNextPageButton={onClickNextPageButton}
          />
        </div>
      </div>
    </Drawer>
  );
};

export default RightMenu;
