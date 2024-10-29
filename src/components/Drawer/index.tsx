import "./index.less";

const Drawer = ({
  isOpen,
  showButton,
  position = "left",
  children,
  onVisibleChange,
  style,
}: {
  isOpen: boolean;
  showButton?: boolean;
  position: string;
  children: JSX.Element;
  onVisibleChange: (isOpen: boolean) => void;
  style?: React.CSSProperties | undefined;
}) => {
  return (
    <>
      <div
        className={`drawer ${position} ${isOpen ? "open" : ""}`}
        style={style}
      >
        {showButton && (
          <div
            className={`${position}-button`}
            onClick={() => {
              onVisibleChange(!isOpen);
            }}
          />
        )}
        <div className="drawer-content">{children}</div>
      </div>
      {isOpen && (
        <div
          className="overlay"
          onClick={() => {
            onVisibleChange(false);
          }}
        />
      )}
    </>
  );
};

export default Drawer;
