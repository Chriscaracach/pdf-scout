interface Creator {
  id: string;
  name: string;
  email: string;
  photo: string;
}

export interface Form {
  formValues: FormValues;
  creator: Creator;
  formType: string;
  createdAt: Date;
  id: string;
}

export interface FormValues {
  type: string;
  startDate: string;
  endDate: string;
  location: string;
  gpNum: string;
  gpName: string;
  gpDist: string;
  gpZone: string;
}

export interface FormField {
  name: string;
  label: string;
  type?: string;
  component: string;
  options?: { label: string; value: string }[];
  placeholder: string;
}
