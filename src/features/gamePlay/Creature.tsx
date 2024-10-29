import "./Creature.css";
import creatureBackground from "@assets/games/backgrounds/creature_frame_new.png";
import creatureSelectingFrame from "@assets/games/backgrounds/robot_select_new.png";
import creatureLock from "@assets/games/backgrounds/robot_lock_new.png";
import { UIState, setUIState } from "@features/automata/propertiesSlice";
import {
  setSelectedCreatureIndex,
  selectSelectedCreatureListIndex,
  selectCreaturesCount,
  startCreatingCreature,
} from "@features/creatures/creatures";
import { selectIsLoading } from "@features/automata/propertiesSlice";
import { CreatureModel, getCreatureIconPath } from "@features/creatures/models";
import { useAppDispatch, useAppSelector } from "@app/hooks";

interface Props {
  index: number;
  creature: CreatureModel;
  progress: number;
}

const Creature = ({ index, creature, progress }: Props) => {
  const dispatch = useAppDispatch();
  const selectedCreatureListIndex = useAppSelector(
    selectSelectedCreatureListIndex
  );
  const isSelected = selectedCreatureListIndex == index;
  const isLoading = useAppSelector(selectIsLoading);
  const creaturesCount = useAppSelector(selectCreaturesCount);
  const isLocked = index > creaturesCount;
  const creatureIconPath = getCreatureIconPath(creature.creatureType);

  const onSelect = () => {
    if (!isSelected && !isLoading) {
      if (index == creaturesCount) {
        dispatch(
          startCreatingCreature({ creatureType: creature.creatureType })
        );
        dispatch(setUIState({ uIState: UIState.Creating }));
      } else if (index < creaturesCount) {
        dispatch(setSelectedCreatureIndex({ index }));
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    }
  };

  return (
    <div className="creature-container" onClick={() => onSelect()}>
      <img src={creatureBackground} className="creature-background" />
      {isSelected && (
        <img
          src={creatureSelectingFrame}
          className="creature-selecting-image"
        />
      )}
      {creatureIconPath && (
        <>
          <img
            src={creatureIconPath}
            className="creature-image"
            style={{
              clipPath: isLocked
                ? ""
                : `polygon(0 ${100 - progress}%, 100% ${
                    100 - progress
                  }%, 100% 0, 0 0)`,
            }}
          />
        </>
      )}
      <p className="creature-text">{creature.name}</p>
      {isLocked && (
        <div className="creature-lock-wrapper">
          <img src={creatureLock} className="creature-lock-image" />
        </div>
      )}
    </div>
  );
};

export default Creature;
