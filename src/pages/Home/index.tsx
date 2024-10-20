import GamePlay from "../../features/gamePlay/GamePlay";
import { useAppSelector } from "../../app/hooks";
import Account from "../../features/account/Account";
import { selectL2Account } from "../../features/account/accountSlice";

const Home = () => {
  const l2account = useAppSelector(selectL2Account);

  return l2account ? <GamePlay /> : <Account />;
};

export default Home;
