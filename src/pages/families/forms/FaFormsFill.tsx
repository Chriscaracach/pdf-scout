import { useState } from "react";
import { Button, Heading, VStack } from "rsuite";

import * as Yup from "yup";
import FormGenerator from "../../newForm/components/FormGenerator";
import { FormField } from "../../../interfaces/Form";

type FormConfig = {
  label: string;
  value: string;
  fields: FormField[];
  initialValues: Record<string, string>;
  validationSchema: Yup.ObjectSchema<any>;
};

const forms: Record<string, FormConfig> = {
  autorizacionAcampe: {
    label: "Autorización de Acampe",
    value: "autorizacionAcampe",
    fields: [
      {
        name: "type",
        label: "Tipo",
        type: "text",
        component: "select",
        options: [
          { label: "Salida", value: "salida" },
          { label: "Acantonamiento", value: "acantonamiento" },
          { label: "Campamento", value: "campamento" },
        ],
        placeholder: "Tipo de acampe",
      },
      {
        name: "startDate",
        label: "Fecha de inicio",
        component: "date",
        placeholder: "Fecha de inicio del acampe",
      },
      {
        name: "endDate",
        label: "Fecha de fin",
        component: "date",
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
    initialValues: {
      type: "",
      startDate: "",
      endDate: "",
      location: "",
      gpNum: "1600",
      gpName: "Guido Buffo",
      gpDist: "2",
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required("El tipo es requerido"),
      startDate: Yup.string().required("La fecha de inicio es requerida"),
      endDate: Yup.string().required("La fecha de fin es requerida"),
      location: Yup.string().required("La ubicación es requerida"),
      gpNum: Yup.string().required("El número de grupo es requerido"),
      gpName: Yup.string().required("El nombre del grupo es requerido"),
      gpDist: Yup.string().required("El distrito del grupo es requerido"),
      gpZone: Yup.string().required("La zona del grupo es requerida"),
    }),
  },
};

const FaFormsFill = () => {
  const [step, setStep] = useState<"pickForm" | "prefillForm">("pickForm");
  const [pickedForm, setPickedForm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // Fill Form and return pdf
    setLoading(false);
  };

  const steps: Record<"pickForm" | "prefillForm", JSX.Element | null> = {
    pickForm: (
      <VStack alignItems="stretch">
        <Heading level={5}>Seleccioná un formulario</Heading>
        {Object.keys(forms).map((key, index) => {
          const form = forms[key];
          return (
            <Button
              key={index}
              appearance="primary"
              size="lg"
              onClick={() => {
                setPickedForm(form.value);
                setStep("prefillForm");
              }}
            >
              {form.label}
            </Button>
          );
        })}
      </VStack>
    ),
    prefillForm: pickedForm ? (
      <FormGenerator
        fields={forms[pickedForm].fields}
        initialValues={forms[pickedForm].initialValues}
        validationSchema={forms[pickedForm].validationSchema}
        onSubmit={handleSubmit}
        loading={loading}
      />
    ) : null,
  };

  return steps[step];
};

export default FaFormsFill;
