import "./index.less";

interface Props {
  elementWidth?: number | null;
  elementHeight?: number | null;
  columnCount: number;
  rowCount: number;
  elements: Array<JSX.Element>;
  style?: React.CSSProperties;
}

const Grid = ({
  elementWidth = null,
  elementHeight = null,
  columnCount,
  rowCount,
  elements,
  style,
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
        ...style,
      }}
    >
      {elements.map((element) => element)}
    </div>
  );
};

export default Grid;
