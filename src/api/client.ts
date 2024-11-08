import { query_config, send_transaction, query_state } from "./rpc";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const SERVER_TICK_TO_SECOND = 5;

interface SendTransactionRes {
  success: boolean;
  jobid: string | undefined;
}

interface SendTransactionParams {
  cmd: Array<bigint>;
  prikey: string;
}

interface QueryStateRes {
  player: any;
  creatures: any;
  globalTimer: any;
}

interface QueryStateParams {
  cmd: Array<bigint>;
  prikey: string;
}

export const getConfig = createAsyncThunk("client/getConfig", async () => {
  const res = await query_config();
  const data = JSON.parse(res.data);
  // TODO: 假数据
  // const data = JSON.parse(
  //   '{"version":"1.0","entity_attributes":["Enercore","Nexium","Swifex","Cognisurge","Vitalshield","Flexonix"],"local_attributes":["Engery Crystal","Instellar Mineral","Biomass","Quantum Foam","Necrodermis","Alien Floral","Spice Melange","Treasure"],"modifiers":[[2,[-10,0,0,0,0,0],[-10,-10,20,0,0,0,0,0],"BioGen"],[4,[10,0,0,0,0,0],[30,0,-10,0,0,0,0,0],"CrysTara"],[4,[10,0,0,0,0,0],[0,30,-10,0,0,0,0,0],"AstroMine"],[4,[10,0,0,0,0,0],[10,0,-30,0,20,0,0,0],"CrystaBloom"],[4,[0,0,10,0,0,0],[-30,0,20,0,-20,0,0,0],"EnerGex"],[4,[-10,0,0,0,0,0],[0,0,-10,6,0,0,0,0],"StellarCharge"],[4,[0,0,1,0,0,0],[10,-10,4,0,-4,0,0,0],"FoamTap"],[4,[20,0,-1,0,0,0],[-20,0,-6,2,3,0,0,0],"EnerFusion"],[4,[0,0,2,0,0,0],[-30,40,18,-9,-3,0,0,0],"EnerPlex"],[18,[-100,0,-20,0,0,0],[-80,-50,-30,-20,-20,0,0,1],"TTgenesis"],[6,[-20,3,-5,0,0,0],[0,-40,0,15,-8,0,0,0],"QuantaForge"],[10,[0,6,0,0,0,0],[80,-20,-20,-10,-12,0,0,0],"FortiFyx"],[16,[0,-6,-12,0,0,0],[-80,-80,-40,-16,-24,0,0,1],"SynTitan"],[20,[120,10,-20,10,0,0],[-150,0,-60,0,0,5,0,0],"SwiftForge"],[10,[60,0,-12,6,0,0],[0,-80,-50,10,-20,2,0,0],"XenoFloral"],[24,[-150,-12,-20,-12,0,0],[0,-80,-30,10,-12,2,0,0],"TitaniumBoost"],[30,[-100,10,-30,10,0,0],[150,0,-80,0,60,4,0,0],"CerebraSpark"],[10,[0,3,-10,5,0,0],[-80,0,-40,10,-20,2,0,0],"QuiFoam"],[12,[-40,0,10,-3,0,0],[0,60,-30,0,0,-3,2,0],"AstroCharge"],[12,[100,-3,-4,0,0,0],[-40,50,-30,-20,0,3,0,0],"EnerGate"],[12,[100,-6,8,6,0,0],[0,-60,50,-30,0,0,0,0],"CogniMelt"],[12,[0,4,0,-6,0,0],[0,-30,0,2,-16,0,2,0],"NexiMine"],[12,[-100,0,-6,8,0,0],[-50,0,-40,0,30,2,-1,0],"XenoBloom"],[30,[-300,0,-30,-16,0,0],[-280,0,-100,0,0,-5,-4,3],"ResoNex"],[50,[0,20,0,30,0,0],[100,200,0,0,0,6,4,-4],"Fortivest"],[12,[0,-4,10,5,0,0],[0,0,-30,0,-20,-3,1,0],"CogniFy"],[10,[-90,4,-10,0,0,0],[0,0,-50,0,20,2,0,0],"FortiGen"],[6,[-50,-2,6,0,0,0],[40,40,0,6,0,0,-1,0],"Abracadabra"],[6,[-40,0,-5,3,0,0],[-30,50,-20,8,0,-2,0,0],"MegaBoost"],[48,[0,15,0,-15,0,0],[-200,0,200,100,50,-10,-6,0],"NexuMax"],[20,[-100,-3,0,-6,0,0],[100,0,0,0,0,-4,3,0],"SpicenRich"],[12,[90,0,-6,-4,0,0],[50,50,0,10,0,0,-1,0],"EvolviFy"],[60,[0,30,60,30,0,0],[0,0,0,120,100,12,8,-6],"NexroVest"],[30,[0,0,0,-12,2,0],[0,0,100,60,-50,-9,-2,0],"QuantumScribe"],[20,[-100,-5,0,-6,1,0],[160,120,0,0,0,-3,-2,0],"NeuroForge"],[40,[0,18,-40,0,-3,0],[300,0,0,90,-50,-6,3,0],"CyberPulse"],[40,[0,20,0,0,3,0],[-200,-300,100,40,0,-10,-4,0],"PlasmaShift"],[20,[0,10,-25,0,-1,0],[0,150,-90,-40,50,0,-3,0],"IlluGen"],[60,[0,-20,0,30,-4,2],[500,0,0,0,-60,-3,-3,0],"Aespa"],[120,[900,0,0,80,0,0],[1000,600,600,0,300,30,0,-15],"SuperNova"],[20,[-150,9,0,0,1,0],[100,-100,0,0,0,2,-3,0],"NeuroCharge"],[10,[-50,0,6,-5,0,0],[80,80,0,-14,-20,0,1,0],"QuantumLeap"],[12,[-100,-6,0,0,0,-1],[0,100,0,30,0,3,2,0],"BioSynthesis"],[24,[0,-10,30,0,0,-1],[0,100,-40,0,0,6,0,0],"PlasmaForge"],[80,[-400,0,-50,-20,0,-2],[0,0,0,0,-120,-18,-10,6],"NanoWeave"],[18,[-150,10,-20,0,0,1],[-160,0,80,0,0,2,-3,0],"EtherPulse"],[40,[30,-4,0,0,0,-1],[10,0,-60,0,80,0,3,0],"StarLight"],[20,[0,0,5,12,-1,0],[0,0,0,-2,0,-1,0,0],"NovaBurst"],[24,[20,4,0,1,0,-1],[0,0,100,50,0,0,-4,0],"BioHarvest"],[20,[100,0,20,-8,-1,1],[0,-60,0,0,-10,0,-2,0],"EtherForge"],[120,[-1000,0,-150,0,0,-4],[0,0,-400,-200,0,-10,-16,10],"TitanBloom"],[22,[0,6,0,0,1,0],[-200,0,-100,0,50,0,0,0],"QuantumFrost"],[28,[0,-10,32,0,0,0],[0,-200,120,0,-60,-4,4,0],"BioFusion"],[20,[0,0,-16,8,-1,1],[-100,100,0,0,0,-5,0,0],"NexusField"],[30,[0,8,0,-16,2,-1],[0,0,120,-70,0,0,3,0],"StarForge"],[20,[-100,9,20,0,0,-1],[0,150,0,40,0,0,-3,0],"PlasmaCharge"],[24,[100,0,0,0,-2,0],[-100,0,0,-50,40,4,3,0],"BioCast"],[26,[0,12,-30,12,-2,1],[-200,0,0,0,20,0,0,0],"EtherWeave"],[38,[-120,-18,50,0,3,-1],[0,0,-120,0,0,0,0,0],"NovaFlux"],[44,[0,0,50,-30,-3,2],[-400,0,120,60,0,0,-6,0],"QuantumCore"],[20,[0,0,10,0,-1,1],[0,0,0,-40,-40,6,-1,0],"BioSurge"],[20,[0,0,-12,8,-3,2],[-120,0,-80,0,0,-6,3,0],"EtherPulse"],[24,[-100,0,0,-10,2,-1],[0,-60,0,50,40,-6,0,0],"StarlightForge"],[120,[-1200,-80,-150,0,-6,-5],[-1200,0,0,0,0,0,-12,12],"QuantumSurge"]]}'
  // );
  return data;
});

export const sendTransaction = createAsyncThunk<
  SendTransactionRes,
  SendTransactionParams,
  { rejectValue: string }
>(
  "client/sendTransaction",
  async (
    params: { cmd: Array<bigint>; prikey: string },
    { rejectWithValue }
  ) => {
    try {
      const { cmd, prikey } = params;
      const res = await send_transaction(cmd, prikey);
      return res;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

export const queryState = createAsyncThunk<
  QueryStateRes,
  QueryStateParams,
  { rejectValue: string }
>(
  "client/queryState",
  async (
    params: { cmd: Array<bigint>; prikey: string },
    { rejectWithValue }
  ) => {
    try {
      const { prikey } = params;
      const res = await query_state(prikey);
      const datas = JSON.parse(res?.data);
      // TODO: 假数据
      // const datas = JSON.parse(
      //   '{"player":[{"nonce":0,"data":{"objects":[],"local":[30,30,0,0,2,0,0,0]}},[],50724],"state":{}}'
      // );
      const [player, creatures, serverTick] = datas["player"];
      console.log("query state data", datas.data);
      return {
        player,
        creatures,
        globalTimer: serverTick * SERVER_TICK_TO_SECOND,
      };
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);
