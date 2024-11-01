import { useEffect, useMemo, useRef, useState } from "react";
import "./LeftMenu.css";
import PageSelector from "./PageSelector";
import Creature from "./Creature";
import { selectIsLoading } from "@features/automata/propertiesSlice";
import {
  selectCreatures,
  selectCurrentPage,
  selectCreaturesOnCurrentPage,
  selectCreaturesCurrentProgressOnCurrentPage,
  nextPage,
  prevPage,
} from "@features/creatures/creatures";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import Drawer from "@components/Drawer";
import Grid from "@components/Grid/Grid";

interface Props {
  localTimer: number;
}

const LeftMenu = ({ localTimer }: Props) => {
  const [isLeftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [creatureGridHeight, setCreatureGridHeight] = useState(0);
  const creatureGridRef = useRef<HTMLInputElement>(null);
  const updateCreatureGridHeight = () => {
    if (creatureGridRef.current) {
      setCreatureGridHeight(creatureGridRef.current.offsetHeight);
    }
  };
  const creatureGridElementWidth = 100;
  const creatureGridElementHeight = useMemo(() => {
    return creatureGridHeight >= 860 ? 128 : 128;
  }, [creatureGridHeight]);
  const creatureGridColumnCount = 2;
  const creatureGridRowCount = Math.floor(
    creatureGridHeight / creatureGridElementHeight
  );
  const amountPerPage = creatureGridColumnCount * creatureGridRowCount;

  const currentPage = useAppSelector(selectCurrentPage);
  const creaturesBeforePaging = useAppSelector(selectCreatures);
  const creatures = useAppSelector(
    selectCreaturesOnCurrentPage(creaturesBeforePaging)(amountPerPage)
  );
  const progress = useAppSelector(
    selectCreaturesCurrentProgressOnCurrentPage(creaturesBeforePaging)(
      amountPerPage
    )(localTimer)
  );
  const pageCount = Math.max(
    Math.ceil(creaturesBeforePaging.length / amountPerPage),
    1
  );
  const isLoading = useAppSelector(selectIsLoading);

  const onClickPrevPageButton = () => {
    if (!isLoading) {
      dispatch(prevPage());
    }
  };

  const onClickNextPageButton = () => {
    if (!isLoading) {
      dispatch(nextPage());
    }
  };

  useEffect(() => {
    updateCreatureGridHeight();
    window.addEventListener("resize", updateCreatureGridHeight);
    return () => {
      window.removeEventListener("resize", updateCreatureGridHeight);
    };
  }, []);
  // console.log(11111, creatureGridHeight, creaturesBeforePaging, creatures);
  return (
    <Drawer
      showButton
      isOpen={isLeftDrawerOpen}
      position="left"
      onVisibleChange={setLeftDrawerOpen}
      style={{ width: 276 }}
    >
      <div className="menu_bg_left">
        <div className="new_left_top"></div>
        <div ref={creatureGridRef} className="left-creature-grid">
          <Grid
            elementWidth={creatureGridElementWidth}
            elementHeight={creatureGridElementHeight}
            columnCount={creatureGridColumnCount}
            rowCount={creatureGridRowCount}
            elements={creatures.map((creature, index) => (
              <Creature
                key={index}
                index={currentPage * amountPerPage + index}
                creature={creature}
                progress={progress[index]}
              />
            ))}
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

export default LeftMenu;
