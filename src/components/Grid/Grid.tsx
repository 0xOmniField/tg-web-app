import "./index.less";

interface Props {
  elementWidth?: number | null;
  elementHeight?: number | null;
  columnCount: number;
  rowCount: number;
  elements: Array<JSX.Element>;
}

const Grid = ({
  elementWidth = null,
  elementHeight = null,
  columnCount,
  rowCount,
  elements,
}: Props) => {
  return (
    <div
      className="grid-contianer"
      style={{
        width:
          elementWidth == null
            ? "100%"
            : `${elementWidth * columnCount + 10}px`,
        height:
          elementHeight == null ? "100%" : `${elementHeight * rowCount}px`,
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
        gridTemplateRows: `repeat(${rowCount}, 1fr)`,
        gap: "5px",
      }}
    >
      {elements.map((element) => element)}
    </div>
  );
};

export default Grid;
