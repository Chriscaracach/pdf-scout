import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Stack, useToaster, VStack } from "rsuite";

import * as faGoogle from "@fortawesome/free-brands-svg-icons/faGoogle";
import { Icon } from "@rsuite/icons";

import FaSvgIcon from "../../components/FaSvgIcon";
import { auth } from "../../firebase/config";

const provider = new GoogleAuthProvider();

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toaster = useToaster();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        navigate("/forms");
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const loginWithPopup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log(token, user);
      //eslint-disable-next-line
    } catch (error: any) {
      toaster.push(<div>{error.message ?? "An error occurred"}</div>, {
        placement: "topCenter",
        duration: 5000,
      });
    }
  };

  if (isAuthenticated) {
    navigate("/forms");
  }

  return (
    <VStack alignItems="center">
      <Button
        appearance="ghost"
        type="submit"
        size="lg"
        onClick={loginWithPopup}
      >
        <Stack spacing={10}>
          <Icon as={FaSvgIcon} faIcon={faGoogle} /> Ingresar con Google
        </Stack>
      </Button>
    </VStack>
  );
};

export default Login;
