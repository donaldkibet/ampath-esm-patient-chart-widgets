import { openmrsObservableFetch } from "@openmrs/esm-api";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export function searchForms(searchText: string): Observable<Array<Form>> {
  let filter = "";
  if (searchText && searchText !== null && searchText.trim().length > 0) {
    filter = `&q=${searchText.trim()}`;
  }
  return openmrsObservableFetch(
    `/ws/rest/v1/form?v=custom:(uuid,name,encounterType:(uuid,name),version,published,retired,resources:(uuid,name,dataType,valueReference))${filter}`
  ).pipe(
    map(({ data }) => {
      const forms: Form[] = data["results"].map(form => toFormObject(form));
      return forms;
    })
  );
}

export type Form = {
  uuid: string;
  name: string;
  published: boolean;
  retired: boolean;
  encounterTypeUuid?: string;
  encounterTypeName?: string;
};

export function toFormObject(openmrsRestForm: any): Form {
  return {
    uuid: openmrsRestForm.uuid,
    name: openmrsRestForm.name || openmrsRestForm.display,
    published: openmrsRestForm.published,
    retired: openmrsRestForm.retired,
    encounterTypeUuid: openmrsRestForm.encounterType
      ? openmrsRestForm.encounterType.uuid
      : null,
    encounterTypeName: openmrsRestForm.encounterType
      ? openmrsRestForm.encounterType.name
      : null
  };
}
