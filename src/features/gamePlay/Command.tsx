import "./Command.less";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import Program from "@components/Games/Program";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  nextPage,
  prevPage,
  selectCurrentPage,
  selectFilteredPrograms,
  selectProgramsOnCurrentPage,
} from "@features/creatures/programs";
import Grid from "@components/Grid/Grid";
import {
  selectIsLoading,
  selectIsSelectingUIState,
} from "@features/automata/propertiesSlice";
import { setProgramIndex } from "@features/creatures/creatures";
import PrevPageButton from "@components/PrevPageButton";
import NextPageButton from "@components/NextPageButton";
import ProgramFilterBar from "@components/Games/ProgramFilterBar/ProgramFilterBar";

const Command = memo(() => {
  const dispatch = useAppDispatch();
  const [programGridWidth, setProgramGridWidth] = useState(0);
  const programGridRef = useRef<HTMLInputElement>(null);
  const updateProgramGridWidth = () => {
    if (programGridRef.current) {
      setProgramGridWidth(programGridRef.current.offsetWidth);
    }
  };
  const programGridElementHeight = 144;
  const programGridElementWidth = 84;
  // const programGridElementWidth = useMemo(() => {
  //   return programGridWidth >= 860 ? 84 : 84;
  // }, [programGridWidth]);
  const programGridColumnCount = useMemo(() => {
    return Math.floor(programGridWidth / programGridElementWidth);
  }, [programGridWidth, programGridElementWidth]);
  const programGridRowCount = 1;
  const amountPerPage = programGridColumnCount * programGridRowCount;
  const currentPage = useAppSelector(selectCurrentPage);
  const programsBeforePaging = useAppSelector(selectFilteredPrograms);
  const programs = useAppSelector(
    selectProgramsOnCurrentPage(programsBeforePaging)(amountPerPage)
  );
  const pageCount = Math.max(
    Math.ceil(programsBeforePaging.length / amountPerPage),
    1
  );
  const isSelectingUIState = useAppSelector(selectIsSelectingUIState);
  const isLoading = useAppSelector(selectIsLoading);

  useEffect(() => {
    updateProgramGridWidth();
    window.addEventListener("resize", updateProgramGridWidth);
    return () => {
      window.removeEventListener("resize", updateProgramGridWidth);
    };
  }, []);

  const onSelectProgram = (programIndex: number) => {
    if (isSelectingUIState && !isLoading) {
      dispatch(setProgramIndex({ programIndex }));
    }
  };

  const onClickPrevPageButton = () => {
    dispatch(prevPage());
  };

  const onClickNextPageButton = () => {
    dispatch(nextPage());
  };
  const enableNextPageButton = currentPage < pageCount - 1;
  const enablePrevPageButton = currentPage > 0;

  return (
    <div className="bottom">
      <div className="right-program-filter-bar-position">
        <ProgramFilterBar />
      </div>
      <PrevPageButton
        isDisabled={!enablePrevPageButton}
        onClick={onClickPrevPageButton}
        style={{
          transform: "rotate(-90deg)",
          width: "18px",
          height: "18px",
          marginLeft: "26px",
        }}
      />
      <div ref={programGridRef} className="right-program-grid">
        <Grid
          elementWidth={programGridElementWidth}
          elementHeight={programGridElementHeight}
          columnCount={programGridColumnCount}
          rowCount={programGridRowCount}
          elements={programs.map((program, index) => (
            <Program
              key={index}
              program={program}
              onSelect={() => onSelectProgram(program.index)}
            />
          ))}
        />
      </div>
      <NextPageButton
        isDisabled={!enableNextPageButton}
        onClick={onClickNextPageButton}
        style={{
          transform: "rotate(-90deg)",
          width: "18px",
          height: "18px",
          marginRight: "26px",
        }}
      />
    </div>
  );
});

export default Command;
