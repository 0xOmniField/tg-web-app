import number_display from "@assets/games/backgrounds/number_display.png";
import "./PageSelector.css";
import PrevPageButton from "@components/PrevPageButton";
import NextPageButton from "@components/NextPageButton";

interface Props {
  currentPage: number;
  pageCount: number;
  onClickPrevPageButton: () => void;
  onClickNextPageButton: () => void;
}

const PageSelector = ({
  currentPage,
  pageCount,
  onClickPrevPageButton,
  onClickNextPageButton,
}: Props) => {
  const enableNextPageButton = currentPage < pageCount - 1;
  const enablePrevPageButton = currentPage > 0;

  return (
    <div className="page-selector-container">
      <div className="page-selector-prev-button">
        <PrevPageButton
          isDisabled={!enablePrevPageButton}
          onClick={onClickPrevPageButton}
          style={{
            width: "23px",
            height: "23px",
          }}
        />
      </div>

      <div className="relative">
        <img
          src={number_display}
          className={`page-selector-page-number-background`}
        />
        <p className={`page-selector-page-number-text absolute top-0`}>{`${
          currentPage + 1
        }/${pageCount}`}</p>
      </div>

      <div className="page-selector-next-button">
        <NextPageButton
          isDisabled={!enableNextPageButton}
          onClick={onClickNextPageButton}
          style={{
            width: "23px",
            height: "23px",
          }}
        />
      </div>
    </div>
  );
};

export default PageSelector;
