import { defineConfigSchema } from "@openmrs/esm-config";
import { backendDependencies } from "./openmrs-backend-dependencies";

const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

declare global {
  interface Window {
    getOpenmrsSpaBase(): string;
  }
}

function setupOpenMRS() {
  const moduleName = "@ampath/esm-patient-chart-widgets";

  const options = {
    featureName: "ampath-patient-widgets",
    moduleName
  };

  defineConfigSchema(moduleName, {});

  return {};
}

export { backendDependencies, importTranslation, setupOpenMRS };
