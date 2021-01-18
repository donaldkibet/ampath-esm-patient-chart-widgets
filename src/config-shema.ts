import { Type } from "@openmrs/esm-config";

export const esmPatientChartWidgetsSchema = {
  programs: {
    programUuid: { _type: Type.String, _default: "" },
    programName: { _type: Type.String, _default: "" },
    forms: {
      encounterTypeUuid: { _type: Type.String, _default: "" },
      formUuid: { _type: Type.String, _default: "" },
      formName: { _type: Type.String, _default: "" }
    }
  }
};
