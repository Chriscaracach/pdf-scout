import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button, Heading, Stack, VStack } from "rsuite";
import * as faGoogle from "@fortawesome/free-brands-svg-icons/faGoogle";

import { useNavigate } from "react-router-dom";
import { Icon } from "@rsuite/icons";
import { auth } from "../../firebase/config";

const provider = new GoogleAuthProvider();

// const Field = ({ error, ...rest }) => {
//   return (
//     <Form.Group>
//       <Input {...rest} />
//       <Form.ErrorMessage show={!!error} placement="bottomStart">
//         {error}
//       </Form.ErrorMessage>
//     </Form.Group>
//   );
// };

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email().required("Required"),
//   password: Yup.string().required("Required"),
// });

const Login = () => {
  const navigate = useNavigate();
  // const formik = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   validationSchema,
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });

  const loginWithPopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      navigate("/forms");
      console.log(token, user);
    } catch (error) {
      console.log(error);
    }
  };

  const FaSvgIcon = ({ faIcon, ...rest }) => {
    const { width, height, svgPathData } = faIcon;
    return (
      <svg
        {...rest}
        viewBox={`0 0 ${width} ${height}`}
        width="1.5em"
        height="1.5em"
        fill="currentColor"
      >
        <path d={svgPathData}></path>
      </svg>
    );
  };

  return (
    <VStack alignItems="center">
      {/* <Form onSubmit={formik.handleSubmit}>
        <Field
          name="email"
          placeholder="Email"
          value={formik.values.email}
          error={formik.errors.email}
          onChange={(value) => formik.setFieldValue("email", value)}
        />

        <Field
          name="password"
          placeholder="Contraseña"
          type="password"
          value={formik.values.password}
          error={formik.errors.password}
          onChange={(value) => formik.setFieldValue("password", value)}
        />
        <Button appearance="primary" type="submit">
          Ingresar
        </Button>
      </Form> */}
      <Button
        appearance="ghost"
        type="submit"
        size="lg"
        onClick={() => {
          loginWithPopup();
        }}
      >
        <Stack spacing={10}>
          <Icon as={FaSvgIcon} faIcon={faGoogle} /> Ingresar con Google
        </Stack>
      </Button>
    </VStack>
  );
};

export default Login;
