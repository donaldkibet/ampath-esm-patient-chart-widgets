import { FetchResponse, openmrsObservableFetch } from "@openmrs/esm-api";

import { Observable } from "rxjs";
import { take } from "rxjs/operators";

export function getVisitsForPatient(
  patientUuid: string,
  abortController: AbortController,
  v?: string
): Observable<FetchResponse<any>> {
  const custom =
    v ||
    "custom:(uuid,encounters:(uuid,encounterDatetime," +
      "form:(uuid,name),location:ref," +
      "encounterType:ref,encounterProviders:(uuid,display," +
      "provider:(uuid,display))),patient:(uuid,uuid)," +
      "visitType:(uuid,name),attributes:(uuid,display,value),location:ref,startDatetime," +
      "stopDatetime)";

  return openmrsObservableFetch(
    `/ws/rest/v1/visit?patient=${patientUuid}&v=${custom}`,
    {
      signal: abortController.signal,
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    }
  ).pipe(take(1));
}

export function saveVisit(
  payload: NewVisitPayload,
  abortController: AbortController
): Observable<FetchResponse<any>> {
  return openmrsObservableFetch(`/ws/rest/v1/visit`, {
    signal: abortController.signal,
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: payload
  });
}

export function updateVisit(
  uuid: string,
  payload: UpdateVisitPayload,
  abortController: AbortController
): Observable<any> {
  return openmrsObservableFetch(`/ws/rest/v1/visit/${uuid}`, {
    signal: abortController.signal,
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: payload
  });
}

export type NewVisitPayload = {
  location: string;
  patient: string;
  startDatetime: string;
  visitType: string;
};

export type UpdateVisitPayload = NewVisitPayload & {};
