import "./index.less";
import ProgramResourceDisplay from "../ProgramResourceDisplay";
import { formatTime } from "@features/creatures/creatures";
import { getResourceIconPath, ProgramModel } from "@features/creatures/models";
import { memo } from "react";
import BioGen from "@assets/games/Animations/Programs/BioGen.png";
import CrysTara from "@assets/games/Animations/Programs/CrysTara.png";
import AstroMine from "@assets/games/Animations/Programs/AstroMine.png";
import CrystaBloom from "@assets/games/Animations/Programs/CrystaBloom.png";
import EnerGex from "@assets/games/Animations/Programs/EnerGex.png";
import StellarCharge from "@assets/games/Animations/Programs/StellarCharge.png";
import FoamTap from "@assets/games/Animations/Programs/FoamTap.png";
import EnerFusion from "@assets/games/Animations/Programs/EnerFusion.png";
import EnerPlex from "@assets/games/Animations/Programs/EnerPlex.png";
import TTgenesis from "@assets/games/Animations/Programs/TTgenesis.png";
import QuantaForge from "@assets/games/Animations/Programs/QuantaForge.png";
import FortiFyx from "@assets/games/Animations/Programs/FortiFyx.png";
import SynTitan from "@assets/games/Animations/Programs/SynTitan.png";
import SwiftForge from "@assets/games/Animations/Programs/SwiftForge.png";
import XenoFloral from "@assets/games/Animations/Programs/XenoFloral.png";
import TitaniumBoost from "@assets/games/Animations/Programs/TitaniumBoost.png";
import CerebraSpark from "@assets/games/Animations/Programs/CerebraSpark.png";
import QuiFoam from "@assets/games/Animations/Programs/QuiFoam.png";
import AstroCharge from "@assets/games/Animations/Programs/AstroCharge.png";
import EnerGate from "@assets/games/Animations/Programs/EnerGate.png";
import CogniMelt from "@assets/games/Animations/Programs/CogniMelt.png";
import NexiMine from "@assets/games/Animations/Programs/NexiMine.png";
import XenoBloom from "@assets/games/Animations/Programs/XenoBloom.png";
import ResoNex from "@assets/games/Animations/Programs/ResoNex.png";
import Fortivest from "@assets/games/Animations/Programs/Fortivest.png";
import CogniFy from "@assets/games/Animations/Programs/CogniFy.png";
import FortiGen from "@assets/games/Animations/Programs/FortiGen.png";
import Abracadabra from "@assets/games/Animations/Programs/Abracadabra.png";
import MegaBoost from "@assets/games/Animations/Programs/MegaBoost.png";
import NexuMax from "@assets/games/Animations/Programs/NexuMax.png";
import SpicenRich from "@assets/games/Animations/Programs/SpicenRich.png";
import EvolviFy from "@assets/games/Animations/Programs/EvolviFy.png";
import NexroVest from "@assets/games/Animations/Programs/NexroVest.png";
import QuantumScribe from "@assets/games/Animations/Programs/QuantumScribe.png";
import NeuroForge from "@assets/games/Animations/Programs/NeuroForge.png";
import CyberPulse from "@assets/games/Animations/Programs/CyberPulse.png";
import PlasmaShift from "@assets/games/Animations/Programs/PlasmaShift.png";
import IlluGen from "@assets/games/Animations/Programs/IlluGen.png";
import Aespa from "@assets/games/Animations/Programs/Aespa.png";
import SuperNova from "@assets/games/Animations/Programs/SuperNova.png";
import NeuroCharge from "@assets/games/Animations/Programs/NeuroCharge.png";
import QuantumLeap from "@assets/games/Animations/Programs/QuantumLeap.png";
import BioSynthesis from "@assets/games/Animations/Programs/BioSynthesis.png";
import PlasmaForge from "@assets/games/Animations/Programs/PlasmaForge.png";
import NanoWeave from "@assets/games/Animations/Programs/NanoWeave.png";
import EtherPulse from "@assets/games/Animations/Programs/EtherPulse.png";
import StarLight from "@assets/games/Animations/Programs/StarLight.png";
import NovaBurst from "@assets/games/Animations/Programs/NovaBurst.png";
import BioHarvest from "@assets/games/Animations/Programs/BioHarvest.png";
import EtherForge from "@assets/games/Animations/Programs/EtherForge.png";
import TitanBloom from "@assets/games/Animations/Programs/TitanBloom.png";
import QuantumFrost from "@assets/games/Animations/Programs/QuantumFrost.png";
import BioFusion from "@assets/games/Animations/Programs/BioFusion.png";
import NexusField from "@assets/games/Animations/Programs/NexusField.png";
import StarForge from "@assets/games/Animations/Programs/StarForge.png";
import PlasmaCharge from "@assets/games/Animations/Programs/PlasmaCharge.png";
import BioCast from "@assets/games/Animations/Programs/BioCast.png";
import EtherWeave from "@assets/games/Animations/Programs/EtherWeave.png";
import NovaFlux from "@assets/games/Animations/Programs/NovaFlux.png";
import QuantumCore from "@assets/games/Animations/Programs/QuantumCore.png";
import BioSurge from "@assets/games/Animations/Programs/BioSurge.png";
import StarlightForge from "@assets/games/Animations/Programs/StarlightForge.png";
import QuantumSurge from "@assets/games/Animations/Programs/QuantumSurge.png";
const mapBg = {
  BioGen,
  CrysTara,
  AstroMine,
  CrystaBloom,
  EnerGex,
  StellarCharge,
  FoamTap,
  EnerFusion,
  EnerPlex,
  TTgenesis,
  QuantaForge,
  FortiFyx,
  SynTitan,
  SwiftForge,
  XenoFloral,
  TitaniumBoost,
  CerebraSpark,
  QuiFoam,
  AstroCharge,
  EnerGate,
  CogniMelt,
  NexiMine,
  XenoBloom,
  ResoNex,
  Fortivest,
  CogniFy,
  FortiGen,
  Abracadabra,
  MegaBoost,
  NexuMax,
  SpicenRich,
  EvolviFy,
  NexroVest,
  QuantumScribe,
  NeuroForge,
  CyberPulse,
  PlasmaShift,
  IlluGen,
  Aespa,
  SuperNova,
  NeuroCharge,
  QuantumLeap,
  BioSynthesis,
  PlasmaForge,
  NanoWeave,
  EtherPulse,
  StarLight,
  NovaBurst,
  BioHarvest,
  EtherForge,
  TitanBloom,
  QuantumFrost,
  BioFusion,
  NexusField,
  StarForge,
  PlasmaCharge,
  BioCast,
  EtherWeave,
  NovaFlux,
  QuantumCore,
  BioSurge,
  StarlightForge,
  QuantumSurge,
};

interface Props {
  program: ProgramModel;
  onSelect: () => void;
}

const Program = memo(({ program, onSelect }: Props) => {
  return (
    <div className="program-container" onClick={onSelect}>
      <div className="flex items-baseline justify-between">
        <p className="program-name-text">{program.name}</p>
        <p className="program-time-text">
          {formatTime(program.processingTime)}
        </p>
      </div>
      <div
        className="flex justify-center h-14 items-center mt-1"
        style={{ background: "#3CC9A3", height: 60 }}
      >
        <img
          src={mapBg?.[program.name as keyof typeof mapBg] || ""}
          className="program-icon-image"
        />
      </div>

      <div className="program-resource-grid">
        {program.resources.map((resource, index) => (
          <ProgramResourceDisplay
            key={index}
            iconImagePath={getResourceIconPath(resource.type)}
            amount={resource.amount}
          />
        ))}
      </div>
    </div>
  );
});

export default Program;
