import "./index.css";
import WelcomePageProgressBar from "../WelcomePageProgressBar";
import Account from "../Account";

interface Props {
  progress: number;
  message: string;
}

const WelcomePage = ({ progress, message }: Props) => {
  return (
    <div className="welcome-page-container">
      <Account />
      {progress > 0 ? (
        <>
          <div className="welcome-page-background-filter"></div>
          <WelcomePageProgressBar progress={progress} message={message} />
        </>
      ) : null}
    </div>
  );
};

export default WelcomePage;
