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

import { useEffect, useState } from "react";
const images = import.meta.glob("@assets/games/Animations/Programs/*.png");

const getImageUrl = async (name: string) => {
  const path = `/src/assets/games/Animations/Programs/${name}.png`;
  if (images[path]) {
    const module = await images[path]();
    return module?.default;
  }
  return null;
};

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

export const ProgramComponent = ({
  program,
  showAnimation,
}: {
  program: ProgramModel | null;
  showAnimation: boolean;
}): JSX.Element | null => {
  console.log(9999, images);
  const [bgImage, setBgImage] = useState<string | null>(null);
  useEffect(() => {
    if (program?.name) {
      getImageUrl(program.name).then((url) => {
        if (url) setBgImage(url);
      });
    }
  }, [program?.name]);
  return program == null ? null : (
    <div
      className="main-bot-program-image"
      style={
        showAnimation
          ? { animation: `${program.name} 2s steps(24) infinite` }
          : {
              backgroundImage: `url(${bgImage})`,
            }
      }
    />
  );
};
