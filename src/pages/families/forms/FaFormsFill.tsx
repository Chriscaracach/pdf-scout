import * as Yup from "yup";
import FormGenerator from "../../newForm/components/FormGenerator";
import { FormField } from "../../../interfaces/Form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";

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
        name: "localidad",
        label: "Localidad",
        component: "text",
        placeholder: "Localidad del Joven Protagonista",
      },
      {
        name: "departamento",
        label: "Departamento/Partido",
        component: "text",
        placeholder: "Departamento/Partido del Joven Protagonista",
      },
      {
        name: "provincia",
        label: "Provincia",
        component: "text",
        placeholder: "Fecha de fin del acampe",
      },
      {
        name: "fecha",
        label: "Fecha",
        component: "date",
        placeholder: "Fecha de llenado del formulario",
      },
      {
        name: "nombreAdulto",
        label: "Nombre del Adulto",
        component: "text",
        placeholder: "Nombre del Adulto",
      },
      {
        name: "nacionalidadAdulto",
        label: "Nacionalidad",
        component: "text",
        placeholder: "Nacionalidad del Adulto",
      },
      {
        name: "fechaNacAdulto",
        label: "Fecha de Nacimiento",
        component: "date",
        placeholder: "Fecha de Nacimiento del Adulto",
      },
      {
        name: "dniAdulto",
        label: "DNI",
        component: "text",
        placeholder: "DNI del Adulto",
      },
      {
        name: "telefonoAdulto",
        label: "Teléfono",
        component: "text",
        placeholder: "Teléfono del Adulto",
      },
      {
        name: "domicilioAdulto",
        label: "Domicilio",
        component: "text",
        placeholder: "Domicilio del Adulto",
      },
      {
        name: "rolAdulto",
        label: "Rol",
        component: "text",
        placeholder: "Rol del Adulto",
      },
      {
        name: "nombreJoven",
        label: "Nombre completo",
        component: "text",
        placeholder: "Nombre del Joven Protagonista",
      },
      {
        name: "nacionalidadJoven",
        label: "Nacionalidad",
        component: "text",
        placeholder: "Nacionalidad del Joven",
      },
      {
        name: "fechaNacJoven",
        label: "Fecha de Nacimiento",
        component: "date",
        placeholder: "Fecha de Nacimiento del Joven",
      },
      {
        name: "dniJoven",
        label: "DNI",
        component: "text",
        placeholder: "DNI del Joven",
      },
      {
        name: "domicilioJoven",
        label: "Domicilio",
        component: "text",
        placeholder: "Domicilio del Joven",
      },
    ],
    initialValues: {
      localidad: "",
      departamento: "",
      provincia: "",
      fecha: "",
      nombreAdulto: "",
      nacionalidadAdulto: "",
      fechaNacAdulto: "",
      dniAdulto: "",
      telefonoAdulto: "",
      domicilioAdulto: "",
      rolAdulto: "",
      nombreJoven: "",
      nacionalidadJoven: "",
      fechaNacJoven: "",
      dniJoven: "",
      domicilioJoven: "",
    },
    validationSchema: Yup.object().shape({
      localidad: Yup.string().required("La localidad es requerida"),
      departamento: Yup.string().required("El departamento es requerido"),
      provincia: Yup.string().required("La provincia es requerida"),
      fecha: Yup.string().required("La fecha es requerida"),
      nombreAdulto: Yup.string().required("El nombre es requerido"),
      nacionalidadAdulto: Yup.string().required("La nacionalidad es requerida"),
      fechaNacAdulto: Yup.string().required(
        "La fecha de nacimiento es requerida"
      ),
      dniAdulto: Yup.string().required("El DNI es requerido"),
      telefonoAdulto: Yup.string().required("El teléfono es requerido"),
      domicilioAdulto: Yup.string().required("El domicilio es requerido"),
      rolAdulto: Yup.string().required("El rol es requerido"),
      nombreJoven: Yup.string().required("El nombre es requerido"),
      nacionalidadJoven: Yup.string().required("La nacionalidad es requerida"),
      fechaNacJoven: Yup.string().required(
        "La fecha de nacimiento es requerida"
      ),
      dniJoven: Yup.string().required("El DNI es requerido"),
      domicilioJoven: Yup.string().required("El domicilio es requerido"),
    }),
  },
};

const FaFormsFill = () => {
  const [loading, setLoading] = useState(false);
  const [pickedForm, setPickedForm] = useState("autorizacionAcampe");
  const { formId } = useParams<{ formId: string }>();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    // Fill Form and return pdf
    setLoading(false);
  };

  useEffect(() => {
    const fetchForm = async () => {
      if (formId) {
        setLoading(true);
        try {
          const formDoc = await getDoc(doc(db, "forms", formId));
          if (formDoc.exists()) {
            const formData = formDoc.data() as FormConfig;
            setPickedForm(formData.formType);
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchForm();
  }, [formId]);

  return loading ? (
    <Loader />
  ) : (
    <FormGenerator
      fields={forms[pickedForm].fields}
      initialValues={forms[pickedForm].initialValues}
      validationSchema={forms[pickedForm].validationSchema}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};

export default FaFormsFill;
