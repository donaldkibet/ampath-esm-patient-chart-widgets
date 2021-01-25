import { switchTo } from "@openmrs/esm-extensions";
import React from "react";
import Parcel from "single-spa-react/parcel";

const FormView: React.FC<any> = ({
  closeWorkspace,
  data,
  domElement,
  mountParcel
}) => {
  const { selectedForm, encounter, formName } = data;
  closeWorkspace = closeWorkspace ?? (() => switchTo("workspace", ""));
  return (
    <div>
      <Parcel
        config={System.import("@ampath/esm-angular-form-entry")}
        view="form"
        formUuid={selectedForm}
        key={selectedForm}
        encounterUuid={encounter}
        closeWorkspace={closeWorkspace}
        wrapWith="div"
        mountParcel={mountParcel}
      ></Parcel>
    </div>
  );
};

export default FormView;
