import React, { useState, useRef, useEffect } from "react";
import { ReactMic } from "react-mic";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { storage } from "./base";
import "./Audio.css";
import Footer from "./Footer";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import data from "./kw.json";
import axios from "axios";






export default function Audio(props) {
  const [state, setState] = useState({ record: false });
  const [aURL, setaURL] = useState([]);
  const [rec, setRec] = useState([]);
  const [item, setItem] = useState([]);
  const [text, setText] = useState([]);
  const [audio, setAudio] = useState([]);
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);
  const countRef = useRef(null);
  const [rows, setRows] = React.useState(null);
  const [dat, setDat] = useState([]);
  const [eng, setEng] = useState([]);
  const [texts,setTexts] = useState([]);
  const [links,setLinks] = useState([]);
  const [im,setImg] = useState([]);
  var index = Math.floor(Math.random() * data.length);
  const images = [
    "/images/generic1/APATOTHER_106746.jpg",
    "/images/generic1/APATOTHER_106752.jpg",
    "/images/generic1/APATPL_93557.jpg",
    "/images/generic1/APATMR_46610.jpg",
    "/images/generic1/APATST_63535.jpg",
    "/images/generic1/APATDAF_163690.jpg",
    "/images/generic1/APATTES_236967.jpg",
    "/images/generic1/APATFLM_84266.jpg",
    "/images/generic1/APATMQ_236873.jpg",
    "/images/generic1/APATZO_172216.jpg",
    "/images/generic1/APATOTHER_190283.jpg",
    "/images/generic1/APATFM_46520.jpg",
    "/images/generic1/APATPL_163615.jpg",
    "/images/generic1/APATBU_93606.jpg",
    "/images/generic1/APATHEC_78064.jpg",
    "/images/generic1/APATOTHER_273003.jpg",
    "/images/generic1/APATNAP_172272.jpg",
    "/images/generic1/APATFM_236761.jpg",
    "/images/generic1/CP_294527.jpg",
    "/images/generic1/OTHER_294541.jpg",
    "/images/generic1/APATOTHER_106632.jpg",
    "/images/generic1/APATBIS_190182.jpg",
    "/images/generic1/APATBIS_190169.jpg",
    "/images/generic1/APATFLM_81055.jpg",
    "/images/generic1/APATBIS_190168.jpg",
    "/images/generic1/APATBIS_190197.jpg",
    "/images/generic1/APATOTHER_106633.jpg",
    "/images/generic1/APATFM_97595.jpg",
    "/images/generic1/APATMQ_272822.jpg",
    "/images/generic1/OTHER_294540.jpg",
    "/images/generic1/APATAC_138496.jpg",
    "/images/generic1/APATMUA_62665.jpg",
    "/images/generic1/APATNAP_172273.jpg",
    "/images/generic1/APATOTHER_273002.jpg",
    "/images/generic1/APATDA_80955.jpg",
    "/images/generic1/APATPP_190258.jpg",
    "/images/generic1/APATCG_190354.jpg",
    "/images/generic1/APATLK_63701.jpg",
    "/images/generic1/APATZO_172217.jpg",
    "/images/generic1/APATBUPS_172288.jpg",
    "/images/generic1/APATSL_46371.jpg",
    "/images/generic1/OTHER_294385.jpg",
    "/images/generic1/APATMU_151810.jpg",
    "/images/generic1/WAM_294233.jpg",
    "/images/generic1/APATSC_46721.jpg",
    "/images/generic1/APATOTHER_106747.jpg",
    "/images/generic1/APATGY_46315.jpg",
    "/images/generic1/APATZO_70058.jpg",
    "/images/generic1/TA_294462.jpg",
    "/images/generic1/APATHE_97609.jpg",
    "/images/generic1/APATTHP_80813.jpg",
    "/images/generic1/APATSL_97516.jpg",
    "/images/generic1/APATOTHER_106745.jpg",
    "/images/generic1/APATMUA_68028.jpg",
    "/images/generic1/TES_294247.jpg",
    "/images/generic1/APATEV_138555.jpg",
    "/images/generic1/APATPG_46594.jpg",
    "/images/generic1/APATTES_236964.jpg",
    "/images/generic1/APATZO_172229.jpg",
    "/images/generic1/APATZO_172215.jpg",
    "/images/generic1/APATCS_46655.jpg",
    "/images/generic1/APATMQ_236870.jpg",
    "/images/generic1/APATTNT_257313.jpg",
    "/images/generic1/APATNAP_172265.jpg",
    "/images/generic1/APATTE_19938.jpg",
    "/images/generic1/APATPG_46345.jpg",
    "/images/generic1/CP_294518.jpg",
    "/images/generic1/APATTNT_256970.jpg",
    "/images/generic1/APATOTHER_106619.jpg",
    "/images/generic1/APATEC_190229.jpg",
    "/images/generic1/APATSR_273020.jpg",
    "/images/generic1/APATTO_172346.jpg",
    "/images/generic1/APATTO_172352.jpg",
    "/images/generic1/APATTO_172353.jpg",
    "/images/generic1/APATIR_93456.jpg",
    "/images/generic1/APATTO_172347.jpg",
    "/images/generic1/APATRAS_163973.jpg",
    "/images/generic1/APATSR_273021.jpg",
    "/images/generic1/FW_294355.jpg",
    "/images/generic1/APATFM_46683.jpg",
    "/images/generic1/APATHO_106715.jpg",
    "/images/generic1/APATTA_151801.jpg",
    "/images/generic1/APATFI_81603.jpg",
    "/images/generic1/APATTNT_256971.jpg",
    "/images/generic1/APATTE_19939.jpg",
    "/images/generic1/APATGA_46499.jpg",
    "/images/generic1/CP_294519.jpg",
    "/images/generic1/OTHER_294543.jpg",
    "/images/generic1/APATAC_138495.jpg",
    "/images/generic1/CP_294525.jpg",
    "/images/generic1/APATTNT_257312.jpg",
    "/images/generic1/APATOTHER_273001.jpg",
    "/images/generic1/APATCG_190343.jpg",
    "/images/generic1/APATSH_97553.jpg",
    "/images/generic1/APATZO_172228.jpg",
    "/images/generic1/APATDAF_163686.jpg",
    "/images/generic1/APATTHP_81098.jpg",
    "/images/generic1/APATMQ_163837.jpg",
    "/images/generic1/APATEV_138554.jpg",
    "/images/generic1/OTHER_294386.jpg",
    "/images/generic1/APATGS_78089.jpg",
    "/images/generic1/APATOTHER_106750.jpg",
    "/images/generic1/APATCH_272914.jpg",
    "/images/generic1/APATOTHER_106754.jpg",
    "/images/generic1/APATGY_46312.jpg",
    "/images/generic1/APATOTHER_106768.jpg",
    "/images/generic1/APATOTHER_82177.jpg",
    "/images/generic1/APATTNT_272974.jpg",
    "/images/generic1/APATFR_46622.jpg",
    "/images/generic1/APATEV_138550.jpg",
    "/images/generic1/APATGS_78099.jpg",
    "/images/generic1/APATTES_236961.jpg",
    "/images/generic1/APATHIC_81735.jpg",
    "/images/generic1/APATZO_62842.jpg",
    "/images/generic1/APATMR_78707.jpg",
    "/images/generic1/APATTES_97554.jpg",
    "/images/generic1/APATNAP_172274.jpg",
    "/images/generic1/APATTNT_163745.jpg",
    "/images/generic1/APATTNT_163751.jpg",
    "/images/generic1/APATHIC_84063.jpg",
    "/images/generic1/APATGS_78112.jpg",
    "/images/generic1/OTHER_294547.jpg",
    "/images/generic1/APATMQ_272819.jpg",
    "/images/generic1/APATRAS_163988.jpg",
    "/images/generic1/APATMR_257315.jpg",
    "/images/generic1/APATWAF_70854.jpg",
    "/images/generic1/APATRAS_163977.jpg",
    "/images/generic1/APATZO_64189.jpg",
    "/images/generic1/APATGOB_50414.jpg",
    "/images/generic1/APATTO_172356.jpg",
    "/images/generic1/APATSR_273018.jpg",
    "/images/generic1/APATCO_50263.jpg",
    "/images/generic1/APATFE_50188.jpg",
    "/images/generic1/APATSP_82830.jpg",
    "/images/generic1/APATEC_190211.jpg",
    "/images/generic1/APATEC_190205.jpg",
    "/images/generic1/OTHER_294546.jpg",
    "/images/generic1/CP_294520.jpg",
    "/images/generic1/APATDA_80760.jpg",
    "/images/generic1/APATSP_83938.jpg",
    "/images/generic1/APATTNT_163750.jpg",
    "/images/generic1/APATMO_97692.jpg",
    "/images/generic1/APATCG_190346.jpg",
    "/images/generic1/APATTNT_163744.jpg",
    "/images/generic1/APATTES_236960.jpg",
    "/images/generic1/APATZO_172211.jpg",
    "/images/generic1/WAM_294235.jpg",
    "/images/generic1/APATCH_272911.jpg",
    "/images/generic1/APATGA_46715.jpg",
    "/images/generic1/APATGY_46307.jpg",
    "/images/generic1/APATGY_46311.jpg",
    "/images/generic1/WAM_294237.jpg",
    "/images/generic1/APATTNT_272977.jpg",
    "/images/generic1/APATMQ_163830.jpg",
    "/images/generic1/DOA_294368.jpg",
    "/images/generic1/APATZO_50159.jpg",
    "/images/generic1/APATAUR_46462.jpg",
    "/images/generic1/APATWAF_172260.jpg",
    "/images/generic1/APATEV_97422.jpg",
    "/images/generic1/APATCG_190344.jpg",
    "/images/generic1/APATMQ_272826.jpg",
    "/images/generic1/APATEC_190207.jpg",
    "/images/generic1/APATCO_46365.jpg",
    "/images/generic1/APATTO_172354.jpg",
    "/images/generic1/APATBIS_190179.jpg",
    "/images/generic1/APATRAS_163975.jpg",
    "/images/generic1/APATTO_172355.jpg",
    "/images/generic1/APATCH_272899.jpg",
    "/images/generic1/APATTHP_163638.jpg",
    "/images/generic1/APATOTHER_106622.jpg",
    "/images/generic1/APATEC_190206.jpg",
    "/images/generic1/APATBIS_190186.jpg",
    "/images/generic1/APATTE_19917.jpg",
    "/images/generic1/APATAUR_257311.jpg",
    "/images/generic1/APATTNT_163747.jpg",
    "/images/generic1/APATRE_46405.jpg",
    "/images/generic1/APATCG_190351.jpg",
    "/images/generic1/APATTNT_163753.jpg",
    "/images/generic1/APATRE_46439.jpg",
    "/images/generic1/APATAUR_236738.jpg",
    "/images/generic1/HC_294339.jpg",
    "/images/generic1/APATST_50879.jpg",
    "/images/generic1/APATZO_172212.jpg",
    "/images/generic1/APATOTHER_190278.jpg",
    "/images/generic1/APATGA_46500.jpg",
    "/images/generic1/APATHEC_134339.jpg",
    "/images/generic1/APATTNT_272976.jpg",
    "/images/generic1/APATHIC_82766.jpg",
    "/images/generic1/APATCH_272906.jpg",
    "/images/generic1/APATLK_46745.jpg",
    "/images/generic1/APATCH_272912.jpg",
    "/images/generic1/APATGY_46310.jpg",
    "/images/generic1/WAM_294245.jpg",
    "/images/generic1/APATCG_236830.jpg",
    "/images/generic1/APATSU_78075.jpg",
    "/images/generic1/OTHER_294318.jpg",
    "/images/generic1/OTHER_294293.jpg",
    "/images/generic1/OTHER_294536.jpg",
    "/images/generic1/APATTES_93623.jpg",
    "/images/generic1/APATLK_46497.jpg",
    "/images/generic1/APATGS_78163.jpg",
    "/images/generic1/APATPC_172444.jpg",
    "/images/generic1/APATWAS_93611.jpg",
    "/images/generic1/APATOF_256943.jpg",
    "/images/generic1/APATOTHER_106651.jpg",
    "/images/generic1/APATMR_19954.jpg",
    "/images/generic1/APATMR_19968.jpg",
    "/images/generic1/APATMR_19969.jpg",
    "/images/generic1/APATSU_78114.jpg",
    "/images/generic1/APATOTHER_106650.jpg",
    "/images/generic1/APATLA_84217.jpg",
    "/images/generic1/APATRI_66116.jpg",
    "/images/generic1/APATPC_172445.jpg",
    "/images/generic1/APATGS_78162.jpg",
    "/images/generic1/APATFM_46436.jpg",
    "/images/generic1/APATTES_93636.jpg",
    "/images/generic1/APATCS_46768.jpg",
    "/images/generic1/APATPC_163789.jpg",
    "/images/generic1/APATTNT_236954.jpg",
    "/images/generic1/APATRE_46339.jpg",
    "/images/generic1/APATOTHER_107002.jpg",
    "/images/generic1/APATRE_46477.jpg",
    "/images/generic1/APATTNT_163721.jpg",
    "/images/generic1/APATTE_9785.jpg",
    "/images/generic1/OTHER_294319.jpg",
    "/images/generic1/APATCS_46807.jpg",
    "/images/generic1/APATCO_50164.jpg",
    "/images/generic1/APATSU_78074.jpg",
    "/images/generic1/BO_294397.jpg",
    "/images/generic1/APATVEM_236843.jpg",
    "/images/generic1/APATSH_46395.jpg",
    "/images/generic1/APATTES_93581.jpg",
    "/images/generic1/APATPG_97386.jpg",
    "/images/generic1/APATTES_93595.jpg",
    "/images/generic1/APATGY_46360.jpg",
    "/images/generic1/APATRAS_50853.jpg",
    "/images/generic1/APATNAP_163928.jpg",
    "/images/generic1/APATGS_134328.jpg",
    "/images/generic1/WAM_294246.jpg",
    "/images/generic1/APATSU_172235.jpg",
    "/images/generic1/APATAUR_50463.jpg",
    "/images/generic1/APATBC_163735.jpg",
    "/images/generic1/APATZO_68448.jpg",
    "/images/generic1/APATAT_236810.jpg",
    "/images/generic1/APATAMP_46704.jpg",
    "/images/generic1/APATCS_163582.jpg",
    "/images/generic1/APATMA_50799.jpg",
    "/images/generic1/APATLK_63760.jpg",
    "/images/generic1/HC_294349.jpg",
    "/images/generic1/APATTNT_163723.jpg",
    "/images/generic1/APATCG_190335.jpg",
    "/images/generic1/APATVEM_78706.jpg",
    "/images/generic1/APATTES_93620.jpg",
    "/images/generic1/OTHER_294535.jpg",
    "/images/generic1/APATSH_97323.jpg",
    "/images/generic1/APATPC_172447.jpg",
    "/images/generic1/APATOTHER_106646.jpg",
    "/images/generic1/APATOTHER_106652.jpg",
    "/images/generic1/APATMO_97346.jpg",
    "/images/generic1/APATOTHER_236933.jpg",
    "/images/generic1/APATMR_19956.jpg",
    "/images/generic1/APATPG_46680.jpg",
    "/images/generic1/APATTHP_163649.jpg",
    "/images/generic1/APATVEM_163972.jpg",
    "/images/generic1/APATTES_93621.jpg",
    "/images/generic1/APATSC_46351.jpg",
    "/images/generic1/APATCS_46780.jpg",
    "/images/generic1/HC_294348.jpg",
    "/images/generic1/OTHER_294326.jpg",
    "/images/generic1/APATSH_46816.jpg",
    "/images/generic1/APATMOT_78146.jpg",
    "/images/generic1/APATPC_272788.jpg",
    "/images/generic1/APATGS_46662.jpg",
    "/images/generic1/APATSU_78077.jpg",
    "/images/generic1/APATFR_46490.jpg",
    "/images/generic1/APATHEC_106675.jpg",
    "/images/generic1/APATNAP_163929.jpg",
    "/images/generic1/APATGY_46349.jpg",
    "/images/generic1/APATTES_93580.jpg",
    "/images/generic1/APATZO_63044.jpg",
    "/images/generic1/APATSU_78088.jpg",
    "/images/generic1/APATBU_93515.jpg",
    "/images/generic1/APATBC_134330.jpg",
    "/images/generic1/APATZO_71450.jpg",
    "/images/generic1/APATTHP_84352.jpg",
    "/images/generic1/APATMR_46488.jpg",
    "/images/generic1/APATMQ_163850.jpg",
    "/images/generic1/APATCS_46828.jpg",
    "/images/generic1/APATST_50603.jpg",
    "/images/generic1/APATHEC_134364.jpg",
    "/images/generic1/APATSR_97777.jpg",
    "/images/generic1/APATRE_46458.jpg",
    "/images/generic1/APATHE_97527.jpg",
    "/images/generic1/OTHER_294281.jpg",
    "/images/generic1/APATTNT_163726.jpg",
    "/images/generic1/APATLK_46334.jpg",
    "/images/generic1/APATTE_9782.jpg",
    "/images/generic1/APATTES_93631.jpg",
    "/images/generic1/APATNAP_53128.jpg",
    "/images/generic1/APATVEM_78703.jpg",
    "/images/generic1/APATTES_93625.jpg",
    "/images/generic1/APATOTHER_106643.jpg",
    "/images/generic1/APATOTHER_106657.jpg",
    "/images/generic1/APATMOT_163610.jpg",
    "/images/generic1/APATMOT_138600.jpg",
    "/images/generic1/APATLA_164026.jpg",
    "/images/generic1/APATMR_19952.jpg",
    "/images/generic1/APATDA_81179.jpg",
    "/images/generic1/APATPP_272957.jpg",
    "/images/generic1/APATMOT_163611.jpg",
    "/images/generic1/APATOTHER_106642.jpg",
    "/images/generic1/APATFLM_81568.jpg",
    "/images/generic1/APATRE_49959.jpg",
    "/images/generic1/APATGS_78164.jpg",
    "/images/generic1/APATTNT_236946.jpg",
    "/images/generic1/APATSU_78258.jpg",
    "/images/generic1/OTHER_294323.jpg",
    "/images/generic1/APATHIS_82913.jpg",
    "/images/generic1/WAM_294242.jpg",
    "/images/generic1/APATSU_78072.jpg",
    "/images/generic1/APATML_190295.jpg",
    "/images/generic1/APATGS_46471.jpg",
    "/images/generic1/APATOTHER_106708.jpg",
    "/images/generic1/APATSU_78070.jpg",
    "/images/generic1/APATAUR_46788.jpg",
    "/images/generic1/APATPG_46718.jpg",
    "/images/generic1/APATMQ_163847.jpg",
    "/images/generic1/APATSH_46805.jpg",
    "/images/generic1/APATZO_71679.jpg",
    "/images/generic1/APATLI_272772.jpg",
    "/images/generic1/APATCS_46787.jpg",
    "/images/generic1/APATTNT_236950.jpg",
    "/images/generic1/OTHER_294296.jpg",
    "/images/generic1/APATTNT_163725.jpg",
    "/images/generic1/APATOTHER_107006.jpg",
    "/images/generic1/OTHER_294269.jpg",
    "/images/generic1/APATCS_46778.jpg",
    "/images/generic1/APATBA_80642.jpg",
    "/images/generic1/APATTES_93632.jpg",
    "/images/generic1/APATOF_256946.jpg",
    "/images/generic1/APATOTHER_106640.jpg",
    "/images/generic1/APATOTHER_106668.jpg",
    "/images/generic1/APATSU_78110.jpg",
    "/images/generic1/APATBA_82525.jpg",
    "/images/generic1/APATMR_19950.jpg",
    "/images/generic1/APATSU_78111.jpg",
    "/images/generic1/APATOTHER_106669.jpg",
    "/images/generic1/APATOTHER_106641.jpg",
    "/images/generic1/APATOTHER_106655.jpg",
    "/images/generic1/APATPC_163798.jpg",
    "/images/generic1/OTHER_294532.jpg",
    "/images/generic1/APATDM_163826.jpg",
    "/images/generic1/APATZO_71730.jpg",
    "/images/generic1/APATGY_97476.jpg",
    "/images/generic1/APATTNT_163718.jpg",
    "/images/generic1/APATMR_46688.jpg",
    "/images/generic1/APATLI_272773.jpg",
    "/images/generic1/APATCS_46802.jpg",
    "/images/generic1/APATSU_172232.jpg",
    "/images/generic1/APATST_163757.jpg",
    "/images/generic1/APATBU_46666.jpg",
    "/images/generic1/APATML_190296.jpg",
    "/images/generic1/APATTES_93579.jpg",
    "/images/generic1/APATSU_78071.jpg",
    "/images/generic1/APATSU_78065.jpg",
    "/images/generic1/APATZO_163618.jpg",
    "/images/generic1/APATTES_93586.jpg",
    "/images/generic1/APATSH_46390.jpg",
    "/images/generic1/APATSP_82097.jpg",
    "/images/generic1/APATSU_78083.jpg",
    "/images/generic1/APATOTHER_106704.jpg",
    "/images/generic1/APATOTHER_106710.jpg",
    "/images/generic1/APATSU_78068.jpg",
    "/images/generic1/APATMR_46487.jpg",
    "/images/generic1/APATLK_97628.jpg",
    "/images/generic1/APATCO_97427.jpg",
    "/images/generic1/APATHE_97474.jpg",
    "/images/generic1/APATHEC_163596.jpg",
    "/images/generic1/APATAUR_236742.jpg",
    "/images/generic1/APATMT_66744.jpg",
    "/images/generic1/APATTNT_236948.jpg",
    "/images/generic1/APATMEC_80808.jpg",
    "/images/generic1/REI_294255.jpg",
    "/images/generic1/APATRI_67228.jpg",
    "/images/generic1/APATTNT_97636.jpg",
    "/images/generic1/APATOTHER_106664.jpg",
    "/images/generic1/APATZO_69364.jpg",
    "/images/generic1/APATMR_19975.jpg",
    "/images/generic1/APATMR_19961.jpg",
    "/images/generic1/APATPP_272959.jpg",
    "/images/generic1/APATPG_46674.jpg",
    "/images/generic1/APATSK_172362.jpg",
    "/images/generic1/APATPP_272971.jpg",
    "/images/generic1/APATFM_46614.jpg",
    "/images/generic1/APATSK_172376.jpg",
    "/images/generic1/APATFLM_83166.jpg",
    "/images/generic1/APATLA_164028.jpg",
    "/images/generic1/APATPP_272970.jpg",
    "/images/generic1/APATMR_19974.jpg",
    "/images/generic1/APATOTHER_106665.jpg",
    "/images/generic1/APATML_190311.jpg",
    "/images/generic1/APATGY_134347.jpg",
    "/images/generic1/APATNAP_53126.jpg",
    "/images/generic1/APATTE_19944.jpg",
    "/images/generic1/APATGY_97491.jpg",
    "/images/generic1/APATHE_97515.jpg",
    "/images/generic1/APATHIS_81391.jpg",
    "/images/generic1/APATGS_78180.jpg",
    "/images/generic1/APATCS_46826.jpg",
    "/images/generic1/APATPL_46473.jpg",
    "/images/generic1/APATNAP_163923.jpg",
    "/images/generic1/APATOTHER_272941.jpg",
    "/images/generic1/APATFM_46749.jpg",
    "/images/generic1/APATSU_78069.jpg",
    "/images/generic1/APATSU_78096.jpg",
    "/images/generic1/APATGY_46357.jpg",
    "/images/generic1/APATOTHER_106705.jpg",
    "/images/generic1/APATSU_78082.jpg",
    "/images/generic1/APATHEC_106694.jpg",
    "/images/generic1/APATHEC_106680.jpg",
    "/images/generic1/APATHEC_106682.jpg",
    "/images/generic1/APATGY_46341.jpg",
    "/images/generic1/APATSU_78094.jpg",
    "/images/generic1/APATZO_70742.jpg",
    "/images/generic1/APATSU_78080.jpg",
    "/images/generic1/APATOTHER_106707.jpg",
    "/images/generic1/APATTES_93588.jpg",
    "/images/generic1/APATSH_46407.jpg",
    "/images/generic1/APATFR_46498.jpg",
    "/images/generic1/APATGS_134321.jpg",
    "/images/generic1/APATLK_46502.jpg",
    "/images/generic1/APATHEC_134340.jpg",
    "/images/generic1/APATLI_272769.jpg",
    "/images/generic1/APATMR_46692.jpg",
    "/images/generic1/APATMT_46508.jpg",
    "/images/generic1/APATLI_50294.jpg",
    "/images/generic1/APATFM_46398.jpg",
    "/images/generic1/APATRE_46440.jpg",
    "/images/generic1/APATGA_46380.jpg",
    "/images/generic1/APATTES_93629.jpg",
    "/images/generic1/APATPC_163796.jpg",
    "/images/generic1/REI_294256.jpg",
    "/images/generic1/APATMOT_163608.jpg",
    "/images/generic1/APATML_190313.jpg",
    "/images/generic1/APATFOS_156461.jpg",
    "/images/generic1/APATMR_19976.jpg",
    "/images/generic1/APATPP_272966.jpg",
    "/images/generic1/APATFLM_83164.jpg",
    "/images/generic1/APATSK_172375.jpg",
    "/images/generic1/APATPG_46676.jpg",
    "/images/generic1/APATPR_93499.jpg",
    "/images/generic1/APATMR_19963.jpg",
    "/images/generic1/APATSL_97353.jpg",
    "/images/generic1/APATOTHER_106666.jpg",
    "/images/generic1/APATCO_97592.jpg",
    "/images/generic1/APATST_50785.jpg",
    "/images/generic1/APATTES_93628.jpg",
    "/images/generic1/APATGY_134344.jpg",
    "/images/generic1/OTHER_294273.jpg",
    "/images/generic1/APATNAP_53119.jpg",
    "/images/generic1/APATOTHER_107008.jpg",
    "/images/generic1/APATGS_78183.jpg",
    "/images/generic1/OTHER_294298.jpg",
    "/images/generic1/APATJAT_84040.jpg",
    "/images/generic1/APATFE_93543.jpg",
    "/images/generic1/APATME_272806.jpg",
    "/images/generic1/APATCS_46825.jpg",
    "/images/generic1/APATHEC_134341.jpg",
    "/images/generic1/APATHIC_83819.jpg",
    "/images/generic1/APATOTHER_272942.jpg",
    "/images/generic1/APATTE_236941.jpg",
    "/images/generic1/APATAUR_46786.jpg",
    "/images/generic1/APATML_190299.jpg",
    "/images/generic1/APATFR_63180.jpg",
    "/images/generic1/APATOTHER_106706.jpg",
    "/images/generic1/APATSU_78081.jpg",
    "/images/generic1/APATBU_93518.jpg",
    "/images/generic1/APATTES_93589.jpg",
    "/images/generic1/APATSU_78095.jpg",
    "/images/generic1/APATMU_156482.jpg",
    "/images/generic1/APATHEC_106697.jpg",
    "/images/generic1/APATSU_78091.jpg",
    "/images/generic1/APATTHP_80868.jpg",
    "/images/generic1/APATTES_93599.jpg",
    "/images/generic1/APATST_68801.jpg",
    "/images/generic1/APATSU_78085.jpg",
    "/images/generic1/APATHEC_106687.jpg",
    "/images/generic1/APATOTHER_272946.jpg",
    "/images/generic1/APATGS_134324.jpg",
    "/images/generic1/APATHEC_134345.jpg",
    "/images/generic1/APATMQ_163859.jpg",
    "/images/generic1/APATFM_46564.jpg",
    "/images/generic1/APATLI_52486.jpg",
    "/images/generic1/APATJAT_84050.jpg",
    "/images/generic1/APATWAS_93583.jpg",
    "/images/generic1/APATPC_163803.jpg",
    "/images/generic1/APATRE_46451.jpg",
    "/images/generic1/APATPC_163778.jpg",
    "/images/generic1/OTHER_294539.jpg",
    "/images/generic1/APATPG_46316.jpg",
    "/images/generic1/APATCS_46766.jpg",
    "/images/generic1/APATTE_19943.jpg",
    "/images/generic1/APATOTHER_106662.jpg",
    "/images/generic1/APATTHP_163650.jpg",
    "/images/generic1/APATTE_97377.jpg",
    "/images/generic1/APATPG_46699.jpg",
    "/images/generic1/APATSK_172370.jpg",
    "/images/generic1/APATSK_172364.jpg",
    "/images/generic1/APATSTF_46450.jpg",
    "/images/generic1/APATMR_19967.jpg",
    "/images/generic1/APATFOS_156470.jpg",
    "/images/generic1/APATMR_19973.jpg",
    "/images/generic1/APATMR_19972.jpg",
    "/images/generic1/APATRE_46691.jpg",
    "/images/generic1/APATTHP_84212.jpg",
    "/images/generic1/APATPG_46667.jpg",
    "/images/generic1/APATTHP_163651.jpg",
    "/images/generic1/APATOTHER_106663.jpg",
    "/images/generic1/APATBA_84413.jpg",
    "/images/generic1/OTHER_294276.jpg",
    "/images/generic1/APATTE_19942.jpg",
    "/images/generic1/OTHER_294289.jpg",
    "/images/generic1/APATGS_78192.jpg",
    "/images/generic1/HC_294344.jpg",
    "/images/generic1/APATHIC_81992.jpg",
    "/images/generic1/APATMQ_163858.jpg",
    "/images/generic1/APATCS_46808.jpg",
    "/images/generic1/APATRE_236846.jpg",
    "/images/generic1/APATMT_236774.jpg",
    "/images/generic1/APATZO_46545.jpg",
    "/images/generic1/APATGS_134325.jpg",
    "/images/generic1/APATSU_78084.jpg",
    "/images/generic1/APATOTHER_106701.jpg",
    "/images/generic1/APATSU_78086.jpg",
    "/images/generic1/APATGY_46353.jpg",
    "/images/generic1/APATGY_46347.jpg",
    "/images/generic1/APATHEC_106684.jpg",
    "/images/generic1/APATPL_93504.jpg",
    "/images/generic1/APATSU_78079.jpg",
    "/images/generic1/APATFR_46677.jpg",
    "/images/generic1/HC_294352.jpg",
    "/images/generic1/APATAMP_97378.jpg",
    "/images/generic1/APATNAP_53122.jpg",
    "/images/generic1/APATSH_97338.jpg",
    "/images/generic1/APATSH_46763.jpg",
    "/images/generic1/APATTE_19940.jpg",
    "/images/generic1/APATTHP_163647.jpg",
    "/images/generic1/APATFM_46611.jpg",
    "/images/generic1/APATSK_172367.jpg",
    "/images/generic1/APATPP_272960.jpg",
    "/images/generic1/APATSK_172373.jpg",
    "/images/generic1/APATMR_19958.jpg",
    "/images/generic1/APATMR_19970.jpg",
    "/images/generic1/APATGT_46542.jpg",
    "/images/generic1/APATMOT_84046.jpg",
    "/images/generic1/APATMR_19964.jpg",
    "/images/generic1/APATMR_19971.jpg",
    "/images/generic1/APATWOHS_50253.jpg",
    "/images/generic1/APATMR_19959.jpg",
    "/images/generic1/APATSK_172366.jpg",
    "/images/generic1/APATSH_163729.jpg",
    "/images/generic1/APATVEM_163969.jpg",
    "/images/generic1/APATTE_19941.jpg",
    "/images/generic1/OTHER_294275.jpg",
    "/images/generic1/APATVEM_78708.jpg",
    "/images/generic1/APATNAP_53123.jpg",
    "/images/generic1/APATRE_46335.jpg",
    "/images/generic1/APATMT_172238.jpg",
    "/images/generic1/APATGA_46350.jpg",
    "/images/generic1/APATFLM_82137.jpg",
    "/images/generic1/HC_294353.jpg",
    "/images/generic1/APATHEC_163592.jpg",
    "/images/generic1/APATCS_46823.jpg",
    "/images/generic1/APATLK_46505.jpg",
    "/images/generic1/APATGS_50755.jpg",
    "/images/generic1/APATSH_46819.jpg",
    "/images/generic1/APATST_163762.jpg",
    "/images/generic1/APATBU_163700.jpg",
    "/images/generic1/APATMR_46656.jpg",
    "/images/generic1/APATPC_272787.jpg",
    "/images/generic1/APATMT_46725.jpg",
    "/images/generic1/APATMT_236777.jpg",
    "/images/generic1/APATSU_78078.jpg",
    "/images/generic1/APATGY_46346.jpg",
    "/images/generic1/APATAUR_46743.jpg",
    "/images/generic1/APATSU_78087.jpg",
    "/images/generic1/APATOTHER_106700.jpg",
    "/images/generic1/APATZO_46585.jpg",
    "/images/generic1/APATFA_46429.jpg",
    "/images/generic1/APATAMP_138485.jpg",
    "/images/generic1/APATOTHER_106767.jpg",
    "/images/generic1/APATJAT_82861.jpg",
    "/images/generic1/APATJAT_83216.jpg",
    "/images/generic1/APATHEC_134334.jpg",
    "/images/generic1/APATMQ_163828.jpg",
    "/images/generic1/OTHER_294400.jpg",
    "/images/generic1/APATHT_138582.jpg",
    "/images/generic1/APATTE_19932.jpg",
    "/images/generic1/APATGS_78135.jpg",
    "/images/generic1/APATST_50928.jpg",
    "/images/generic1/APATRAS_163993.jpg",
    "/images/generic1/FW_294362.jpg",
    "/images/generic1/APATGT_163652.jpg",
    "/images/generic1/APATRI_66196.jpg",
    "/images/generic1/APATRI_67288.jpg",
    "/images/generic1/APATBIS_190174.jpg",
    "/images/generic1/APATTHP_272756.jpg",
    "/images/generic1/APATSR_273017.jpg",
    "/images/generic1/WAM_294399.jpg",
    "/images/generic1/APATEC_190222.jpg",
    "/images/generic1/FW_294363.jpg",
    "/images/generic1/APATCO_97733.jpg",
    "/images/generic1/APATFM_97749.jpg",
    "/images/generic1/APATPL_93601.jpg",
    "/images/generic1/APATRE_46421.jpg",
    "/images/generic1/APATZO_172222.jpg",
    "/images/generic1/DOA_294371.jpg",
    "/images/generic1/HC_294335.jpg",
    "/images/generic1/APATGA_97382.jpg",
    "/images/generic1/APATOTHER_84246.jpg",
    "/images/generic1/APATSC_46700.jpg",
    "/images/generic1/APATGY_46308.jpg",
    "/images/generic1/APATUN_46695.jpg",
    "/images/generic1/APATBA_80564.jpg",
    "/images/generic1/APATTNT_272978.jpg",
    "/images/generic1/APATHIS_83493.jpg",
    "/images/generic1/APATMQ_236879.jpg",
    "/images/generic1/BC_294390.jpg",
    "/images/generic1/APATOTHER_106599.jpg",
    "/images/generic1/APATBK_172442.jpg",
    "/images/generic1/APATZO_172220.jpg",
    "/images/generic1/APATAUR_236736.jpg",
    "/images/generic1/APATNAP_172278.jpg",
    "/images/generic1/APATHT_138581.jpg",
    "/images/generic1/APATPP_190253.jpg",
    "/images/generic1/APATTE_19925.jpg",
    "/images/generic1/APATFI_80501.jpg",
    "/images/generic1/APATBA_83858.jpg",
    "/images/generic1/FW_294361.jpg",
    "/images/generic1/APATTHP_272755.jpg",
    "/images/generic1/APATFE_93642.jpg",
    "/images/generic1/FW_294360.jpg",
    "/images/generic1/APATMT_67177.jpg",
    "/images/generic1/APATRAS_163991.jpg",
    "/images/generic1/APATOTHER_106639.jpg",
    "/images/generic1/APATRAS_163985.jpg",
    "/images/generic1/APATBIS_190189.jpg",
    "/images/generic1/APATBUPS_172309.jpg",
    "/images/generic1/APATTNT_163748.jpg",
    "/images/generic1/APATCG_190362.jpg",
    "/images/generic1/DOA_294372.jpg",
    "/images/generic1/APATZO_172221.jpg",
    "/images/generic1/APATSH_97566.jpg",
    "/images/generic1/APATDM_236763.jpg",
    "/images/generic1/APATDA_80195.jpg",
    "/images/generic1/APATHEC_134336.jpg",
    "/images/generic1/APATTNT_272979.jpg",
    "/images/generic1/APATGA_46719.jpg",
    "/images/generic1/APATGY_46323.jpg",
    "/images/generic1/APATHO_256959.jpg",
    "/images/generic1/APATGY_46327.jpg",
    "/images/generic1/APATOTHER_106761.jpg",
    "/images/generic1/APATGS_46368.jpg",
    "/images/generic1/APATHE_19980.jpg",
    "/images/generic1/APATOTHER_106749.jpg",
    "/images/generic1/APATSU_46652.jpg",
    "/images/generic1/APATAT_93466.jpg",
    "/images/generic1/APATTO_93511.jpg",
    "/images/generic1/APATBUPS_172286.jpg",
    "/images/generic1/APATBUPS_172292.jpg",
    "/images/generic1/APATZO_172225.jpg",
    "/images/generic1/APATZO_172219.jpg",
    "/images/generic1/APATSP_236923.jpg",
    "/images/generic1/APATBA_272921.jpg",
    "/images/generic1/APATNAP_172269.jpg",
    "/images/generic1/APATPL_46761.jpg",
    "/images/generic1/APATBA_83322.jpg",
    "/images/generic1/FW_294364.jpg",
    "/images/generic1/APATSC_164013.jpg",
    "/images/generic1/APATHE_46466.jpg",
    "/images/generic1/APATRI_53117.jpg",
    "/images/generic1/APATJAT_163674.jpg",
    "/images/generic1/APATEC_190218.jpg",
    "/images/generic1/APATEC_190230.jpg",
    "/images/generic1/APATNAP_46572.jpg",
    "/images/generic1/CP_294515.jpg",
    "/images/generic1/APATMQ_272811.jpg",
    "/images/generic1/APATNAP_172268.jpg",
    "/images/generic1/APATDA_80782.jpg",
    "/images/generic1/APATBA_272920.jpg",
    "/images/generic1/APATBU_50904.jpg",
    "/images/generic1/APATZO_172218.jpg",
    "/images/generic1/OTHER_294375.jpg",
    "/images/generic1/APATFLM_82619.jpg",
    "/images/generic1/APATZO_172230.jpg",
    "/images/generic1/APATZO_172224.jpg",
    "/images/generic1/APATHIS_81243.jpg",
    "/images/generic1/APATAC_138512.jpg",
    "/images/generic1/APATLA_83474.jpg",
    "/images/generic1/APATOTHER_106748.jpg",
    "/images/generic1/APATRI_66998.jpg",
    "/images/generic1/APATPA_93572.jpg",
    "/images/generic1/APATGA_97437.jpg",
    "/images/generic1/APATBU_93540.jpg",
    "/images/generic1/APATGY_46318.jpg",
    "/images/generic1/APATTE_164003.jpg",
    "/images/generic1/TES_294248.jpg",
    "/images/generic1/APATAC_138504.jpg",
    "/images/generic1/APATDM_163911.jpg",
    "/images/generic1/APATPP_190255.jpg",
    "/images/generic1/APATTNT_236912.jpg",
    "/images/generic1/APATNAP_172281.jpg",
    "/images/generic1/APATTE_19937.jpg",
    "/images/generic1/APATHT_138578.jpg",
    "/images/generic1/APATTE_19923.jpg",
    "/images/generic1/APATJAT_163676.jpg",
    "/images/generic1/APATRAS_46641.jpg",
    "/images/generic1/APATTO_172348.jpg",
    "/images/generic1/APATPL_50459.jpg",
    "/images/generic1/APATSR_190319.jpg",
    "/images/generic1/APATRI_67501.jpg",
    "/images/generic1/APATWAS_93482.jpg",
    "/images/generic1/APATWP_46434.jpg",
    "/images/generic1/APATCG_190358.jpg",
    "/images/generic1/OTHER_294376.jpg",
    "/images/generic1/APATZO_172227.jpg",
    "/images/generic1/APATBUPS_172284.jpg",
    "/images/generic1/APATAC_138511.jpg",
    "/images/generic1/APATBA_80946.jpg",
    "/images/generic1/TES_294249.jpg",
    "/images/generic1/APATSC_46711.jpg",
    "/images/generic1/APATZO_46531.jpg",
    "/images/generic1/APATGY_46319.jpg",
    "/images/generic1/APATMT_46791.jpg",
    "/images/generic1/APATOTHER_106763.jpg",
    

  ];
  const id = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

 
 





  var randomImage = images[Math.floor(Math.random() * images.length)];

 
  useEffect(() => {
    setImg(randomImage);
	  setTexts(data[index].english);
	  setLinks(data[index].link);
  },[])
  var image = "<img src='" + {im} + "'>";
  var imgString = im.toString();
  console.log("ImageName",imgString);
  imgString = imgString.replace('/images/generic1/',"");
  imgString = imgString.replace('.jpg',"");
  // imgString = imgString.replace("/","-");
  // imgString = imgString.replace("/","-");
  // imgString = imgString.replace("/","-");
  // imgString = imgString.replace("<img src='https:--images.unsplash.com-","");
  // imgString = imgString.substring(0,19);

 
  console.log(imgString);
  var pinCode = " ";
  var gender = " ";
  var language = " ";
  
  // var fname = " ";
  var lname = " ";
  var file_name = " ";
  var comments = " ";
  var key = [];
  var value = [];
  var lsdata = [];
  var arr = new Array();
  var i = 0;

  const subProcess = require("child_process");
  var index = Math.floor(Math.random() * data.length);
  let indexLink = " ";
  // var exec = require('child_process').exec;
  var prompt = "";
  var plink = "";
  const promptRef = useRef(prompt);
  const plinkRef = useRef(plink);
  const pdata = prompt;
  prompt = data[index].english;
  plink = data[index].link;


  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerOn]);


  useEffect(() => {
    prompt = data[index].english;
    plink = data[index].link;
  }, []);

  const getInfo = () => {
    pinCode = document.getElementById("pincode").value;
    gender = document.getElementById("gender").value;
    language = document.getElementById("language").value;
    // fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
  };

  const getComm = () => {
    comments = document.getElementById("comments").value;
  };
  function uploadToast() {
    var x = document.getElementById("uploadtoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function starttoast() {
    var x = document.getElementById("starttoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function savedtoast() {
    var x = document.getElementById("savedtoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  function stoptoast() {
    var x = document.getElementById("stoptoast");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  const startRecording = () => {
    file_name =
      lname + "_" + gender + "_" + pinCode + "_" + language;
    setState({ record: true });
    setTimeOn(true);
    setText("Recording in progress");
    starttoast();
  };

  const setData = () => {
    // getData();

    arr.push({ fileName: file_name, recording: rec });

    localStorage.setItem("localData", JSON.stringify(arr));
  };
  const stopRecording = () => {
    setState({ record: false });
    setTimeOn(false);
    setText("");
    setData();
    clearTimeout(setTimeOn(false), 5000);
    var i = setInterval(stopTime, 4000);
    setTimeout(function () {
      clearInterval(i);
    }, 5000);

    stoptoast();

    for (let x in localStorage) {
      console.log(localStorage.getItem(x));
      console.log(typeof arr);
    }
	
    //  getInfo();
    //  file_name = fname + "_" + lname + "_" + gender + "_" + pinCode + "_" + language;
  };

  const keyValue = () => {
    //   for(var i=0, len=localStorage.length; i<len; i++) {
    //     key[i] = localStorage.key(i);
    //     value[i] = localStorage[key[i]];
    //     lsdata[i] = key[i] + " => " + value[i];
    //     document.getElementById("key").innerHTML = lsdata;
    //     // document.getElementById("value").innerHTML = value;
    // }
  };

  // const btnNext = () => {
  //   document.getElementById("recordBegin").scrollIntoView();
  // }


//joining path of directory 


//passsing directoryPath and callback function
// fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     } 
//     //listing all files using forEach
//     files.forEach(function (file) {
//         // Do whatever you want to do with the file
//         console.log(file); 
//     });
// });

  const save = () => {
    getInfo();
    console.log(pinCode);
    console.log(gender);
    console.log(language);
    console.log("Added info");
    const storage = getStorage();
    const storageRef = ref(storage, `/voices/${file_name}`);

    uploadBytes(storageRef, rec).then((snapshot) => {
      console.log("Uploaded a blob or file!");
      uploadToast();
    });
  };
  const onChange = (e) => {
    getInfo();

    // const file = e.target.files[0];
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const storageRef = ref(storage, `/voices/${file.name}`);

      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded a file!");
      });
      uploadToast();
    }
  };
  // const f_name = e.target.files[0].name;
  //   const storageRef = ref(storage, `/voices/${f_name}`);

  //   uploadBytes(storageRef, file).then((snapshot) => {
  //     console.log('Uploaded a file!');

  //        });
  //        uploadToast();
  // }
  const onData = (recordedBlob) => {
    console.log("chunk of real-time data is: ", recordedBlob);
  };

  const stopTime = () => {
    setTime(0);
  };
  function refreshPage(){
    window.location.reload();
}

  const onStop = (recordedBlob) => {
    // keyValue();
    console.log("recordedBlob is: ", recordedBlob);
    console.log("kkkkk", recordedBlob.blobURL);
    console.log("music", recordedBlob.blob);
    var audioURL = URL.createObjectURL(recordedBlob.blob);
    setaURL(audioURL);
    localStorage.setItem("audio", audioURL);
    console.log("LLLLL");
    console.log(typeof recordedBlob.blob);
    setRec(recordedBlob.blob);

    //  console.log("ffmpeg -i"+" "+recordedBlob.blob+" "+recordedBlob.blob+".wav")
    //  saveAs(audioURL,"i");
    setItem(recordedBlob);
    console.log(rec);
  };

  const saveLocal = () => {
    getInfo();
    getComm();
    lname = lname.replace(" ", "");
    file_name =
      lname +
      "_" +
      gender +
      "_" +
      pinCode +
      "_" +
      language +
      "_" +
      "comments: " +
      comments + "_" +"topic: "+imgString;
	  
    file_name = file_name.replace(" ", "_");
    saveAs(rec, file_name);
    setData();
    setTime(0);
    savedtoast();

    const storage = getStorage();
    const storageRef = ref(storage, `/voices/${file_name}`);

    uploadBytes(storageRef, rec).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

  };
  const getData = () => {
    var str = localStorage.getItem("localData");
    if (str != null) {
      arr = JSON.parse(str);
    }
  };
  const arre = Object.values("./kw.json");
  console.log(arre);
  const uploadAll = () => {
    getData();
    //   arr.push({fileName: file_name,
    //     recording:rec}
    // )

    console.log(typeof rec);
    console.log(typeof arr[0].recording);
    // localStorage.setItem("localData",JSON.stringify(arr));

    console.log(arr.length);

    for (i = 0; i < arr.length - 1; i++) {
      const storageRef = ref(storage, `/voices/${arr[i].fileName}`);

      uploadString(storageRef, arr[i].recording).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        uploadToast();
      });
    }
  };

  //  pincCode = document.getElementById("pincode").value;

  return (
    <div class="full">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>
      <link rel="stylesheet" href="stylesheets/ie.css"></link>
      {/* <input type="text" id = "pincode" placeholder="Enter pincode"/>
        <input type="text" id = "gender" placeholder="Enter gender"/>
        <input type="text" id = "language" placeholder="Enter language used"/> */}
      <div class="formcomp">
        <form>
          <br></br>

          <label for="lname">Name</label>
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Enter Name"
            required
          />
          <br></br>
          <br></br>
          <label for="country">Gender</label>
          <select id="gender" name="country" placeholder="Gender" required>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
          <br></br>
          <br></br>
          <label for="fname">Pincode</label>
          <input
            type="text"
            id="pincode"
            name="firstname"
            placeholder="Enter Pincode"
            required
          />
          <br></br>
          <br></br>

          <label for="lname">Language Used</label>
          <input
            type="text"
            id="language"
            name="lastname"
            placeholder="Enter Language"
            required
          />
		
        </form>
      </div>
      <div class="kw">
        <img src={im}></img>
      </div>
      <br></br>
      <br></br>
      <div class="stopwatch">
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>:
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>:
        <span class="last">{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div class="mic">
        <ReactMic
          record={state.record}
          visualSetting="sinewave"
          className="sound-wave"
          onStop={onStop}
          mimeType="audio/wav"
          strokeColor="#FF4949"
          echoCancellation={true} // defaults -> false
          autoGainControl={true} // defaults -> false
          noiseSuppression={true}
          channelCount={1}
          bitRate={256000}
          sampleRate={16000}
          onData={onData}
        />
      </div>
      <div id="uploadtoast">Uploaded All Files!</div>
      <div id="savedtoast">Saved & Uploaded File!</div>
      <div id="starttoast">Recording Started!</div>
      <div id="stoptoast">Recording Stopped!</div>
      <p id="progress">{text}</p>

      <button
        class="startrec"
        id="recordBegin"
        onClick={startRecording}
        type="button"
        disabled={state.record}
      >
        {" "}
        <i class="fa" id="starticon">
          &#xf130;
        </i>
      </button>
      <button
        class="stoprec"
        onClick={stopRecording}
        type="button"
        disabled={!state.record}
      >
        <i class="fa" id="stopicon">
          &#xf04d;
        </i>
      </button>

      <input
        type="file"
        name="file[]"
        class="addFileBtn"
        multiple="multiple"
        onChange={onChange}
      />
      <audio class="stream" src={aURL} controls></audio>
      {/* <table>
      <th>Recording</th>
      <tr id = "key"></tr>
    </table> */}

      <input
        type="text"
        class="comments"
        id="comments"
        name="lastname"
        placeholder="Enter Comments"
        maxlength="144"
        required
      />
      <button
        class="saverec"
        onClick={saveLocal}
        type="button"
        disabled={state.record}
      >
        Save Recording
      </button>
      <button
        class="uploadrec"
        onClick={uploadAll}
        type="button"
        disabled={state.record}
      >
        Upload Saved Files
      </button>

    

      {/* <p>{localStorage.}</p> */}

      {/* <p id = "key"> </p>
        -

        <p id = "value"> </p> */}

      <Footer />
    </div>
  );
}

// import React,{useState} from "react";
// import { render } from "react-dom";
// import useRecorder from "./useRecorder";
// import './Audio.css';
// import {app} from './base';
// import { storage } from './base';
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// function Audio() {
//   const stream = navigator.mediaDevices.getUserMedia({ audio: true });
//   const [aUrl, setaUrl] = useState(null);

//   let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
//   const file1 = audioURL;

//   const save = () => {
//     const storage = getStorage();
//     const storageRef = ref(storage, 'a');
//     setaUrl(audioURL);
//     uploadBytes(storageRef, aUrl).then((snapshot) => {
//       console.log('Uploaded a blob or file!');
//       console.log(typeof(audioURL));
//          });

//   }

//   return (

//     <div className="Audio">
// <div class="hero-image">
//   <div class="hero-text">
//   <input type="text" class="pincode" placeholder="Enter Pincode"/>
//   <input type="text" class="gender" placeholder="Enter Gender"/>
//   <input type="text" class="language" placeholder="Enter Language Used"/>
//   <button class = "startrec" onClick={startRecording} disabled={isRecording}>
//         Start recording
//       </button>
//       <button class ="stoprec" onClick={stopRecording} disabled={!isRecording}>
//         Stop recording
//       </button>
//       <audio class ="stream" src={audioURL} type="audio/mpeg" controls />
//       <button class ="upload" onClick={save} >Upload</button>
//   </div>
//   </div>

//     </div>
//   );

// }
// export default Audio;
