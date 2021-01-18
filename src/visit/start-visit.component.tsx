import React from "react";
import { VisitTypeProp } from "./visit-summary.component";
import { FetchResponse, getCurrentPatientUuid } from "@openmrs/esm-api";
import dayjs from "dayjs";
import { NewVisitPayload, saveVisit } from "../openmrs-resource/visit.resource";
import styles from "./start-visit.component.css";
import LocationSelectComponent from "../widgets/location-select.component";
import { toOmrsDateString } from "../utils/omrs-dates";

import { useConfig } from "@openmrs/esm-react-utils";
import { ProgramConfig } from "../forms/form-grouper";

export default function StartVisitComponent(props: StartVisitProps) {
  const config: ProgramConfig = useConfig();

  const [patientUuid, setPatientUuid] = React.useState<string>();

  const [visitStartDate, setVisitStartDate] = React.useState(
    dayjs(new Date()).format("YYYY-MM-DD")
  );
  const [visitStartTime, setVisitStartTime] = React.useState(
    dayjs(new Date()).format("HH:mm")
  );
  const [locationUuid, setLocationUuid] = React.useState();

  // events
  const startVisit = () => {
    let visitPayload: NewVisitPayload = {
      patient: patientUuid,
      startDatetime: toOmrsDateString(
        new Date(`${visitStartDate} ${visitStartTime}:00`)
      ),
      visitType: props.visitType.visitTypeUuid,
      location: locationUuid
    };
    saveVisit(visitPayload, new AbortController()).subscribe(
      (response: FetchResponse<any>) => {
        props?.onVisitStarted(response.data);
      },
      error => {
        console.error("error", error);
      }
    );
  };

  const onStartDateChanged = event => {
    setVisitStartDate(event.target.value);
  };

  const onStartTimeChanged = event => {
    setVisitStartTime(event.target.value);
  };

  const onLocationChanged = uuid => {
    setLocationUuid(uuid);
  };

  if (!patientUuid) {
    getCurrentPatientUuid().subscribe(uuid => {
      setPatientUuid(uuid);
    });
  }

  return (
    <div className="omrs-padding-8">
      <div
        className={`omrs-type-body-regular omrs-margin-left-8 omrs-padding-4 ${styles.inputLabelStyle}`}
        style={{
          borderBottom: "1px solid lightgray"
        }}
      >
        {props.visitType.visitDisplay}
      </div>
      <div className="omrs-margin-12">
        <label
          htmlFor="visitStartDate"
          className={`omrs-type-body-regular ${styles.inputLabelStyle}`}
        >
          Start Date/Time:
        </label>
        <div style={{ width: "100%" }}>
          <input
            style={{ width: "60%" }}
            id="visitStartDate"
            type="date"
            name="visitStartDate"
            defaultValue={visitStartDate}
            onChange={onStartDateChanged}
            className="omrs-type-body-regular omrs-padding-4 omrs-margin-4"
          />
          <input
            style={{ width: "34%" }}
            id="visitStartTime"
            type="time"
            name="visitStartTime"
            defaultValue={visitStartTime}
            onChange={onStartTimeChanged}
            className="omrs-type-body-regular omrs-padding-4 omrs-margin-4"
          />
        </div>
      </div>
      <div className="omrs-margin-12">
        <label
          htmlFor="visitLocation"
          className={`omrs-type-body-regular ${styles.inputLabelStyle}`}
        >
          Location:
        </label>
        <LocationSelectComponent
          onLocationChanged={location => onLocationChanged(location.uuid)}
        />
      </div>
      <div style={{ width: "100%" }}>
        <button
          className={`omrs-link omrs-outlined-neutral omrs-rounded omrs-padding-8 omrs-margin-8 omrs-type-body-regular ${styles.buttonStyle}`}
          onClick={() => props?.onCanceled()}
        >
          Cancel
        </button>
        <button
          className={`omrs-link omrs-outlined-action omrs-rounded omrs-padding-8 omrs-type-body-regular omrs-margin-8 ${styles.buttonStyle}`}
          onClick={() => startVisit()}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export type StartVisitProps = {
  visitType: VisitTypeProp;
  onVisitStarted(visit: any): void;
  onCanceled(): void;
};
