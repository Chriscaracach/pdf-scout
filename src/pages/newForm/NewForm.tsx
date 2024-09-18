import { useState } from "react";
import { Button, VStack } from "rsuite";
import FormGenerator from "./components/FormGenerator";

const forms = [
  {
    label: "Autorización de Acampe",
    value: "autorizacionAcampe",
    fields: [
      {
        name: "type",
        label: "Tipo",
        type: "text",
        placeholder: "Tipo de acampe",
      },
      {
        name: "startDate",
        label: "Fecha de inicio",
        type: "text",
        placeholder: "Fecha de inicio del acampe",
      },
      {
        name: "endDate",
        label: "Fecha de fin",
        type: "text",
        placeholder: "Fecha de fin del acampe",
      },
      {
        name: "location",
        label: "Ubicación",
        type: "text",
        placeholder: "Ubicación del acampe",
      },
      {
        name: "gpNum",
        label: "Número de Grupo",
        type: "text",
        placeholder: "Número de Grupo",
      },
      {
        name: "gpName",
        label: "Nombre del Grupo",
        type: "text",
        placeholder: "Nombre del Grupo",
      },
      {
        name: "gpDist",
        label: "Distrito del Grupo",
        type: "text",
        placeholder: "Distrito del Grupo",
      },
      {
        name: "gpZone",
        label: "Zona del Grupo",
        type: "text",
        placeholder: "Zona del Grupo",
      },
    ],
  },
];

const NewForm = () => {
  const [step, setStep] = useState("pickForm");
  const [formData, setFormData] = useState({ form: {} });

  const steps = {
    pickForm: (
      <VStack alignItems="stretch">
        {forms.map((form, index) => (
          <Button
            key={index}
            appearance="primary"
            size="lg"
            onClick={() => {
              setStep("prefillForm");
              setFormData({ ...formData, form: forms[form.value] });
            }}
          >
            {form.label}
          </Button>
        ))}
      </VStack>
    ),
    prefillForm: <FormGenerator fields={formData.form.fields} />,
  };

  return steps[step];
};

export default NewForm;
