import CrystalIcon from "@assets/games/Icons/Crystal.png";
import InterstellarMineralIcon from "@assets/games/Icons/InterstellarMineral.png";
import BiomassIcon from "@assets/games/Icons/Biomass.png";
import QuantumFoamIcon from "@assets/games/Icons/QuantumFoam.png";
import NecrodermisIcon from "@assets/games/Icons/Necrodermis.png";
import AlienFloralIcon from "@assets/games/Icons/AlienFloral.png";
import SpiceMelangeIcon from "@assets/games/Icons/SpiceMelange.png";
import TitaniumIcon from "@assets/games/Icons/Titanium.png";
import EnercoreIcon from "@assets/games/Icons/Enercore.png";
import NexiumIcon from "@assets/games/Icons/Nexium.png";
import SwiftexIcon from "@assets/games/Icons/Swiftex.png";
import CognisurgeIcon from "@assets/games/Icons/Cognisurge.png";
import VitalshieldIcon from "@assets/games/Icons/Vitalshield.png";
import FlexonixIcon from "@assets/games/Icons/Flexonix.png";
import Bot1 from "@assets/games/CreatureBots/robot1.png";
import Bot2 from "@assets/games/CreatureBots/robot2.png";
import Bot3 from "@assets/games/CreatureBots/robot3.png";
import Bot4 from "@assets/games/CreatureBots/robot4.png";
import QuantumFrost from "@components/Games/Programs/QuantaForge";
import BioGen from "@components/Games/Programs/BioGen";
import AstroMine from "@components/Games/Programs/AstroMine";
import EnerGex from "@components/Games/Programs/EnerGex";
import XenoFloral from "@components/Games/Programs/XenoFloral";
import FoamTap from "@components/Games/Programs/FoamTap";
import CrystaBloom from "@components/Games/Programs/CrystaBloom";
import EnerFusion from "@components/Games/Programs/EnerFusion";
import QuantumScribeImage from "@assets/games/Animations/Programs/QuantumScribe/QuantumScribe_00.png";
import QuantumFrostImage from "@assets/games/Animations/Programs/QuantumFrost/QuantumFrost_00.png";
import QuantumSurgeImage from "@assets/games/Animations/Programs/QuantumSurge/QuantumSurge_00.png";
import QuantaForgeImage from "@assets/games/Animations/Programs/QuantaForge/QuantaForge_00.png";
import AespaImage from "@assets/games/Animations/Programs/Aespa/Aespa_00.png";
import BioGenImage from "@assets/games/Animations/Programs/BioGen/BioGen_00.png";
import BioFusionImage from "@assets/games/Animations/Programs/BioFusion/BioFusion_00.png";
import AstroMineImage from "@assets/games/Animations/Programs/AstroMine/AstroMine_00.png";
import TitaniumBoostImage from "@assets/games/Animations/Programs/TitaniumBoost/TitaniumBoost_00.png";
import QuantumLeapImage from "@assets/games/Animations/Programs/QuantumLeap/QuantumLeap_00.png";
import BioSurgeImage from "@assets/games/Animations/Programs/BioSurge/BioSurge_00.png";
import BioHarvestImage from "@assets/games/Animations/Programs/BioHarvest/BioHarvest_00.png";
import EnerGexImage from "@assets/games/Animations/Programs/EnerGex/EnerGex_00.png";
import EtherWeaveImage from "@assets/games/Animations/Programs/EtherWeave/EtherWeave_00.png";
import BioCastImage from "@assets/games/Animations/Programs/BioCast/BioCast_00.png";
import AstroChargeImage from "@assets/games/Animations/Programs/AstroCharge/AstroCharge_00.png";
import BioSynthesisImage from "@assets/games/Animations/Programs/BioSynthesis/BioSynthesis_00.png";
import XenoFloralImage from "@assets/games/Animations/Programs/XenoFloral/XenoFloral_00.png";
import FoamTapImage from "@assets/games/Animations/Programs/FoamTap/FoamTap_00.png";
import CrystaBloomImage from "@assets/games/Animations/Programs/CrystaBloom/CrystaBloom_00.png";
import EnerGateImage from "@assets/games/Animations/Programs/EnerGate/EnerGate_00.png";
import EnerFusionImage from "@assets/games/Animations/Programs/EnerFusion/EnerFusion_00.png";
import QuantumCoreImage from "@assets/games/Animations/Programs/QuantumCore/QuantumCore_00.png";
import XenoBloomImage from "@assets/games/Animations/Programs/XenoBloom/XenoBloom_00.png";

export interface CreatureModel {
  rareResources: ResourceAmountPair[];
  name: string;
  isLocked: boolean;
  creatureType: number;
  programIndexes: Array<number | null>;
  currentProgramIndex: number;
  isProgramStop: boolean;
  startTime: number;
}

export enum ProgramType {
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
  EtherPulse2,
  StarlightForge,
  QuantumSurge,
}

export interface ProgramModel {
  index: number;
  type: ProgramType;
  processingTime: number;
  resources: Array<ResourceAmountPair>;
  name: string;
}

export interface ProgramInfo {
  program: ProgramModel | null;
  index: number | null;
  remainTime: number;
  progress: number;
}

export enum ResourceType {
  Crystal,
  InterstellarMineral,
  Biomass,
  QuantumFoam,
  Necrodermis,
  AlienFloral,
  SpiceMelange,
  Titanium,
  Enercore,
  Nexium,
  Swiftex,
  Cognisurge,
  Vitalshield,
  Flexonix,
}

export interface ResourceAmountPair {
  type: ResourceType;
  amount: number;
}

export interface FilterModel {
  dict: { [key in ResourceType]?: boolean };
}

export enum GuideType {
  None,
  First,
}

export const commonResourceTypes = [
  ResourceType.Crystal,
  ResourceType.InterstellarMineral,
  ResourceType.Biomass,
  ResourceType.QuantumFoam,
  ResourceType.Necrodermis,
  ResourceType.AlienFloral,
  ResourceType.SpiceMelange,
  ResourceType.Titanium,
];

export const rareResourceTypes = [
  ResourceType.Enercore,
  ResourceType.Nexium,
  ResourceType.Swiftex,
  ResourceType.Cognisurge,
  ResourceType.Vitalshield,
  ResourceType.Flexonix,
];

export const allResourceTypes = [...commonResourceTypes, ...rareResourceTypes];

export const emptyCommonResources = commonResourceTypes.map((type) => ({
  type,
  amount: 0,
}));

export const emptyRareResources = rareResourceTypes.map((type) => ({
  type,
  amount: 0,
}));

export const emptyCreature: CreatureModel = {
  rareResources: emptyRareResources,
  name: "",
  isLocked: false,
  creatureType: -1,
  programIndexes: [null, null, null, null, null, null, null, null],
  currentProgramIndex: 0,
  isProgramStop: false,
  startTime: 0,
};

export function getCreatingCreature(creatureType: number): CreatureModel {
  return {
    rareResources: emptyRareResources,
    name: "Creating",
    isLocked: false,
    creatureType: creatureType,
    programIndexes: [null, null, null, null, null, null, null, null],
    currentProgramIndex: 0,
    isProgramStop: false,
    startTime: 0,
  };
}

export const allResourcesToggleFilter: FilterModel = {
  dict: allResourceTypes.reduce((acc, type) => {
    acc[type] = false;
    return acc;
  }, {} as { [key in ResourceType]?: boolean }),
};

export function getCommonResources(array: Array<number>) {
  return commonResourceTypes.map((type, index) => ({
    type,
    amount: array[index],
  }));
}

export function getRareResources(array: Array<number>) {
  return rareResourceTypes.map((type, index) => ({
    type,
    amount: array[index],
  }));
}

export function getResourceIconPath(type: ResourceType): string {
  switch (type) {
    case ResourceType.Crystal:
      return CrystalIcon;
    case ResourceType.InterstellarMineral:
      return InterstellarMineralIcon;
    case ResourceType.Biomass:
      return BiomassIcon;
    case ResourceType.QuantumFoam:
      return QuantumFoamIcon;
    case ResourceType.Necrodermis:
      return NecrodermisIcon;
    case ResourceType.AlienFloral:
      return AlienFloralIcon;
    case ResourceType.SpiceMelange:
      return SpiceMelangeIcon;
    case ResourceType.Titanium:
      return TitaniumIcon;
    case ResourceType.Enercore:
      return EnercoreIcon;
    case ResourceType.Nexium:
      return NexiumIcon;
    case ResourceType.Swiftex:
      return SwiftexIcon;
    case ResourceType.Cognisurge:
      return CognisurgeIcon;
    case ResourceType.Vitalshield:
      return VitalshieldIcon;
    case ResourceType.Flexonix:
      return FlexonixIcon;
    default:
      throw new Error("Unknown ResourceType");
  }
}

export function getResourceNameText(type: ResourceType): string {
  switch (type) {
    case ResourceType.Crystal:
      return "Crystal";
    case ResourceType.InterstellarMineral:
      return "Interstellar Mineral";
    case ResourceType.Biomass:
      return "Biomass";
    case ResourceType.QuantumFoam:
      return "Quantum Foam";
    case ResourceType.Necrodermis:
      return "Necrodermis";
    case ResourceType.AlienFloral:
      return "Alien Floral";
    case ResourceType.SpiceMelange:
      return "Spice Melange";
    case ResourceType.Titanium:
      return "Titanium";
    case ResourceType.Enercore:
      return "Enercore";
    case ResourceType.Nexium:
      return "Nexium";
    case ResourceType.Swiftex:
      return "Swiftex";
    case ResourceType.Cognisurge:
      return "Cognisurge";
    case ResourceType.Vitalshield:
      return "Vitalshield";
    case ResourceType.Flexonix:
      return "Flexonix";
    default:
      throw new Error("Unknown ResourceType");
  }
}

export function getNumberAbbr(num: number): string {
  const abbr = [
    { value: 1e12, suffix: "T" },
    { value: 1e9, suffix: "B" },
    { value: 1e6, suffix: "M" },
    { value: 1e3, suffix: "K" },
  ];
  const sign = num < 0 ? "-" : "";

  num = Math.abs(num);
  for (let i = 0; i < abbr.length; i++) {
    if (num >= abbr[i].value) {
      let formattedNumber = (num / abbr[i].value).toFixed(1);
      if (formattedNumber.endsWith(".0")) {
        formattedNumber = formattedNumber.slice(0, -2);
      }
      return sign + formattedNumber + abbr[i].suffix;
    }
  }

  return sign + num.toString();
}

const botIconPaths = [Bot1, Bot2, Bot3, Bot4];

export function getCreatureIconPath(creatureType: number): string {
  return creatureType == -1
    ? ""
    : botIconPaths[creatureType % botIconPaths.length];
}

export function getProgramComponent(
  program: ProgramModel | null,
  showAnimation: boolean
): JSX.Element | null {
  if (program == null) {
    return null;
  }

  switch (program.type) {
    // case ProgramType.QuantumScribe:
    //   return <QuantumScribe showAnimation={showAnimation} />;
    case ProgramType.QuantumFrost:
      return <QuantumFrost showAnimation={showAnimation} />;
    // case ProgramType.QuantumSurge:
    //   return <QuantumSurge showAnimation={showAnimation} />;
    // case ProgramType.QuantaForge:
    //   return <QuantaForge showAnimation={showAnimation} />;
    // case ProgramType.Aespa:
    //   return <Aespa showAnimation={showAnimation} />;
    case ProgramType.BioGen:
      return <BioGen showAnimation={showAnimation} />;
    // case ProgramType.BioFusion:
    //   return <BioFusion showAnimation={showAnimation} />;
    case ProgramType.AstroMine:
      return <AstroMine showAnimation={showAnimation} />;
    // case ProgramType.TitaniumBoost:
    //   return <TitaniumBoost showAnimation={showAnimation} />;
    // case ProgramType.QuantumLeap:
    //   return <QuantumLeap showAnimation={showAnimation} />;
    // case ProgramType.BioSurge:
    //   return <BioSurge showAnimation={showAnimation} />;
    // case ProgramType.BioHarvest:
    //   return <BioHarvest showAnimation={showAnimation} />;
    case ProgramType.EnerGex:
      return <EnerGex showAnimation={showAnimation} />;
    // case ProgramType.EtherWeave:
    //   return <EtherWeave showAnimation={showAnimation} />;
    // case ProgramType.BioCast:
    //   return <BioCast showAnimation={showAnimation} />;
    // case ProgramType.AstroCharge:
    //   return <AstroCharge showAnimation={showAnimation} />;
    // case ProgramType.BioSynthesis:
    //   return <BioSynthesis showAnimation={showAnimation} />;
    case ProgramType.XenoFloral:
      return <XenoFloral showAnimation={showAnimation} />;
    case ProgramType.FoamTap:
      return <FoamTap showAnimation={showAnimation} />;
    case ProgramType.CrystaBloom:
      return <CrystaBloom showAnimation={showAnimation} />;
    // case ProgramType.EnerGate:
    //   return <EnerGate showAnimation={showAnimation} />;
    case ProgramType.EnerFusion:
      return <EnerFusion showAnimation={showAnimation} />;
    // case ProgramType.QuantumCore:
    //   return <QuantumCore showAnimation={showAnimation} />;
    // case ProgramType.XenoBloom:
    //   return <XenoBloom showAnimation={showAnimation} />;
  }

  return <BioGen showAnimation={showAnimation} />;
}

export function getProgramIconPath(type: ProgramType): string {
  switch (type) {
    case ProgramType.QuantumScribe:
      return QuantumScribeImage;
    case ProgramType.QuantumFrost:
      return QuantumFrostImage;
    case ProgramType.QuantumSurge:
      return QuantumSurgeImage;
    case ProgramType.QuantaForge:
      return QuantaForgeImage;
    case ProgramType.Aespa:
      return AespaImage;
    case ProgramType.BioGen:
      return BioGenImage;
    case ProgramType.BioFusion:
      return BioFusionImage;
    case ProgramType.AstroMine:
      return AstroMineImage;
    case ProgramType.TitaniumBoost:
      return TitaniumBoostImage;
    case ProgramType.QuantumLeap:
      return QuantumLeapImage;
    case ProgramType.BioSurge:
      return BioSurgeImage;
    case ProgramType.BioHarvest:
      return BioHarvestImage;
    case ProgramType.EnerGex:
      return EnerGexImage;
    case ProgramType.EtherWeave:
      return EtherWeaveImage;
    case ProgramType.BioCast:
      return BioCastImage;
    case ProgramType.AstroCharge:
      return AstroChargeImage;
    case ProgramType.BioSynthesis:
      return BioSynthesisImage;
    case ProgramType.XenoFloral:
      return XenoFloralImage;
    case ProgramType.FoamTap:
      return FoamTapImage;
    case ProgramType.CrystaBloom:
      return CrystaBloomImage;
    case ProgramType.EnerGate:
      return EnerGateImage;
    case ProgramType.EnerFusion:
      return EnerFusionImage;
    case ProgramType.QuantumCore:
      return QuantumCoreImage;
    case ProgramType.XenoBloom:
      return XenoBloomImage;
  }
  return BioGenImage;
}
