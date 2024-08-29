import { useFormik } from "formik";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { Input, Button, Form } from "rsuite";
import * as Yup from "yup";

const Field = ({ error, ...rest }) => {
  return (
    <Form.Group>
      <Input {...rest} />
      <Form.ErrorMessage show={!!error} placement="bottomStart">
        {error}
      </Form.ErrorMessage>
    </Form.Group>
  );
};

Field.propTypes = {
  error: PropTypes.string,
};

const validationSchema = Yup.object().shape({
  localidad: Yup.string().required("Required"),
  departamento: Yup.string().required("Required"),
  provincia: Yup.string().required("Required"),
  dia: Yup.string().required("Required"),
  mes: Yup.string().required("Required"),
  anio: Yup.string().required("Required"),
  nombreAdulto: Yup.string().required("Required"),
  nacionalidadAdulto: Yup.string().required("Required"),
  diaNacimientoAdulto: Yup.string().required("Required"),
  mesNacimientoAdulto: Yup.string().required("Required"),
  anioNacimientoAdulto: Yup.string().required("Required"),
  dniAdulto: Yup.string().required("Required"),
  telefonoAdulto: Yup.string().required("Required"),
  domicilioAdulto: Yup.string().required("Required"),
  caracterAdulto: Yup.string().required("Required"),
  nombreMenor: Yup.string().required("Required"),
  nacionalidadMenor: Yup.string().required("Required"),
  diaNacimientoMenor: Yup.string().required("Required"),
  mesNacimientoMenor: Yup.string().required("Required"),
  anioNacimientoMenor: Yup.string().required("Required"),
  dniMenor: Yup.string().required("Required"),
  domicilioMenor: Yup.string().required("Required"),
});

const PermisoAcampe = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const formik = useFormik({
    initialValues: {
      localidad: "",
      departamento: "",
      provincia: "",
      dia: currentDay.toString(),
      mes: currentMonth.toString(),
      anio: currentYear.toString(),
      nombreAdulto: "",
      nacionalidadAdulto: "",
      diaNacimientoAdulto: "",
      mesNacimientoAdulto: "",
      anioNacimientoAdulto: "",
      dniAdulto: "",
      telefonoAdulto: "",
      domicilioAdulto: "",
      caracterAdulto: "",
      nombreMenor: "",
      nacionalidadMenor: "",
      diaNacimientoMenor: "",
      mesNacimientoMenor: "",
      anioNacimientoMenor: "",
      dniMenor: "",
      domicilioMenor: "",
    },
    validationSchema,
    onSubmit: (values) => {},
  });

  useEffect(() => {}, []);

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Field
        name="localidad"
        placeholder="Localidad"
        value={formik.values.localidad}
        error={formik.errors.localidad}
        onChange={(value) => formik.setFieldValue("localidad", value)}
      />

      <Field
        name="departamento"
        placeholder="Departamento"
        value={formik.values.departamento}
        error={formik.errors.departamento}
        onChange={(value) => formik.setFieldValue("departamento", value)}
      />

      <Field
        name="provincia"
        placeholder="Provincia"
        value={formik.values.provincia}
        error={formik.errors.provincia}
        onChange={(value) => formik.setFieldValue("provincia", value)}
      />

      <Field
        name="dia"
        placeholder="Día"
        value={formik.values.dia}
        error={formik.errors.dia}
        onChange={(value) => formik.setFieldValue("dia", value)}
      />

      <Field
        name="mes"
        placeholder="Mes"
        value={formik.values.mes}
        error={formik.errors.mes}
        onChange={(value) => formik.setFieldValue("mes", value)}
      />

      <Field
        name="anio"
        placeholder="Año"
        value={formik.values.anio}
        error={formik.errors.anio}
        onChange={(value) => formik.setFieldValue("anio", value)}
      />

      <Field
        name="nombreAdulto"
        placeholder="Nombre Adulto"
        value={formik.values.nombreAdulto}
        error={formik.errors.nombreAdulto}
        onChange={(value) => formik.setFieldValue("nombreAdulto", value)}
      />

      <Field
        name="nacionalidadAdulto"
        placeholder="Nacionalidad Adulto"
        value={formik.values.nacionalidadAdulto}
        error={formik.errors.nacionalidadAdulto}
        onChange={(value) => formik.setFieldValue("nacionalidadAdulto", value)}
      />

      <Field
        name="diaNacimientoAdulto"
        placeholder="Día Nacimiento Adulto"
        value={formik.values.diaNacimientoAdulto}
        error={formik.errors.diaNacimientoAdulto}
        onChange={(value) => formik.setFieldValue("diaNacimientoAdulto", value)}
      />

      <Field
        name="mesNacimientoAdulto"
        placeholder="Mes Nacimiento Adulto"
        value={formik.values.mesNacimientoAdulto}
        error={formik.errors.mesNacimientoAdulto}
        onChange={(value) => formik.setFieldValue("mesNacimientoAdulto", value)}
      />

      <Field
        name="anioNacimientoAdulto"
        placeholder="Año Nacimiento Adulto"
        value={formik.values.anioNacimientoAdulto}
        error={formik.errors.anioNacimientoAdulto}
        onChange={(value) =>
          formik.setFieldValue("anioNacimientoAdulto", value)
        }
      />

      <Field
        name="dniAdulto"
        placeholder="DNI Adulto"
        value={formik.values.dniAdulto}
        error={formik.errors.dniAdulto}
        onChange={(value) => formik.setFieldValue("dniAdulto", value)}
      />

      <Field
        name="telefonoAdulto"
        placeholder="Teléfono Adulto"
        value={formik.values.telefonoAdulto}
        error={formik.errors.telefonoAdulto}
        onChange={(value) => formik.setFieldValue("telefonoAdulto", value)}
      />

      <Field
        name="domicilioAdulto"
        placeholder="Domicilio Adulto"
        value={formik.values.domicilioAdulto}
        error={formik.errors.domicilioAdulto}
        onChange={(value) => formik.setFieldValue("domicilioAdulto", value)}
      />

      <Field
        name="caracterAdulto"
        placeholder="Carácter Adulto"
        value={formik.values.caracterAdulto}
        error={formik.errors.caracterAdulto}
        onChange={(value) => formik.setFieldValue("caracterAdulto", value)}
      />

      <Field
        name="nombreMenor"
        placeholder="Nombre Menor"
        value={formik.values.nombreMenor}
        error={formik.errors.nombreMenor}
        onChange={(value) => formik.setFieldValue("nombreMenor", value)}
      />

      <Field
        name="nacionalidadMenor"
        placeholder="Nacionalidad Menor"
        value={formik.values.nacionalidadMenor}
        error={formik.errors.nacionalidadMenor}
        onChange={(value) => formik.setFieldValue("nacionalidadMenor", value)}
      />

      <Field
        name="diaNacimientoMenor"
        placeholder="Día Nacimiento Menor"
        value={formik.values.diaNacimientoMenor}
        error={formik.errors.diaNacimientoMenor}
        onChange={(value) => formik.setFieldValue("diaNacimientoMenor", value)}
      />

      <Field
        name="mesNacimientoMenor"
        placeholder="Mes Nacimiento Menor"
        value={formik.values.mesNacimientoMenor}
        error={formik.errors.mesNacimientoMenor}
        onChange={(value) => formik.setFieldValue("mesNacimientoMenor", value)}
      />

      <Field
        name="anioNacimientoMenor"
        placeholder="Año Nacimiento Menor"
        value={formik.values.anioNacimientoMenor}
        error={formik.errors.anioNacimientoMenor}
        onChange={(value) => formik.setFieldValue("anioNacimientoMenor", value)}
      />

      <Field
        name="dniMenor"
        placeholder="DNI Menor"
        value={formik.values.dniMenor}
        error={formik.errors.dniMenor}
        onChange={(value) => formik.setFieldValue("dniMenor", value)}
      />

      <Field
        name="domicilioMenor"
        placeholder="Domicilio Menor"
        value={formik.values.domicilioMenor}
        error={formik.errors.domicilioMenor}
        onChange={(value) => formik.setFieldValue("domicilioMenor", value)}
      />

      <Button appearance="primary" type="submit">
        Crear Formulario
      </Button>
    </Form>
  );
};

export default PermisoAcampe;
