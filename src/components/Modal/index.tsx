import "./index.less";

const Modal = ({
  isOpen,
  children,
  onVisibleChange,
  style,
}: {
  isOpen: boolean;
  children: JSX.Element;
  onVisibleChange: (isOpen: boolean) => void;
  style?: React.CSSProperties | undefined;
}) => {
  return (
    <>
      <div
        className={`modal ${isOpen ? "open" : ""}`}
        style={style}
        onClick={() => {
          onVisibleChange(false);
        }}
      >
        <div className="modal-content">{children}</div>
      </div>
      {/* {isOpen && (
        <div
          className="overlay"
          onClick={() => {
            onVisibleChange(false);
          }}
        />
      )} */}
    </>
  );
};

export default Modal;
