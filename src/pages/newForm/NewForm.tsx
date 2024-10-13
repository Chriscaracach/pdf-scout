import { useState } from "react";
import { Button, Heading, VStack } from "rsuite";
import FormGenerator from "./components/FormGenerator";

import { v4 as uuidv4 } from "uuid";

import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { auth, db } from "../../firebase/config";

const forms = {
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
      gpZone: "42",
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

const NewForm = () => {
  const [step, setStep] = useState("pickForm");
  const [pickedForm, setPickedForm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      console.log(user);

      await addDoc(collection(db, "forms"), {
        formValues: values,
        creator: { id: user.uid, name: user.displayName, photo: user.photoURL },
        formType: pickedForm,
        createdAt: new Date(),
        id: uuidv4(),
      });

      navigate("/forms");
    } catch (error) {
      console.error("Error submitting form: ", error);
    }
  };

  const steps = {
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
      />
    ) : null,
  };

  return steps[step];
};

export default NewForm;
