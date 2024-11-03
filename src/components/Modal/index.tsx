import "./index.less";

const Modal = ({
  isOpen,
  children,
  onVisibleChange,
  style,
  isPart,
}: {
  isOpen: boolean;
  children: JSX.Element;
  onVisibleChange: (isOpen: boolean) => void;
  style?: React.CSSProperties | undefined;
  isPart?: boolean;
}) => {
  return (
    <>
      <div
        className={`modal ${isPart ? "isPart" : ""} ${isOpen ? "open" : ""}`}
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
