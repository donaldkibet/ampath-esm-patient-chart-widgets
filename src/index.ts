import { defineConfigSchema } from "@openmrs/esm-config";
import { getAsyncLifecycle } from "@openmrs/esm-react-utils";
import { esmPatientChartWidgetsSchema } from "./config-shema";
import HivDashBoard from "./dashboards/hiv-dashboard.component";
import FormsList from "./forms/forms-list.component";
import HivLabSummary from "./hiv-labs/hiv-lab-summary.component";
import { backendDependencies } from "./openmrs-backend-dependencies";
import FormEncounterNavigator from "./routing/form-encounter-navigator";

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

  defineConfigSchema(moduleName, esmPatientChartWidgetsSchema);

  return {
    extensions: [
      {
        id: "hiv-dashboard-widget",
        slot: "hiv-dashboard-widget",
        load: getAsyncLifecycle(
          () => import("./dashboards/hiv-dashboard.component"),
          {
            featureName: "hivDashboardWidget",
            moduleName
          }
        )
      }
    ]
  };
}

export { backendDependencies, importTranslation, setupOpenMRS };

export const hivWidget = HivDashBoard;
export const formsListWidget = FormsList;
export const hivLabSummaryWidget = HivLabSummary;
export const formEncounterNavigatorWidget = FormEncounterNavigator;
