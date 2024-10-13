import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Heading,
  IconButton,
  List,
  Loader,
  Stack,
  VStack,
} from "rsuite";

import ArowBackIcon from "@rsuite/icons/ArowBack";

import FaFormCard from "./components/FaFormCard";
import { firebaseConfig } from "../../../firebase/config";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FaForms = () => {
  const [forms, setForms] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchForms = async () => {
    setLoading(true);
    const formsCollection = collection(db, "forms");
    const formsSnapshot = await getDocs(formsCollection);
    const formsList = formsSnapshot.docs.map((doc) => doc.data());
    setForms(formsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <VStack justifyContent="space-between" alignItems="stretch">
      <VStack alignItems="stretch">
        <Stack.Item alignSelf="flex-start">
          <IconButton
            icon={<ArowBackIcon />}
            appearance="subtle"
            onClick={() => {
              navigate("/");
            }}
          />
        </Stack.Item>
        <Heading>Formularios creados</Heading>
        {loading ? (
          <Loader
            center
            vertical
            size="lg"
            content="Cargando formularios creados"
          />
        ) : (
          <List bordered hover>
            {forms.map((form, index) => (
              <List.Item key={index}>
                <FaFormCard form={form} />
              </List.Item>
            ))}
          </List>
        )}
      </VStack>
      <Button
        appearance="primary"
        size="lg"
        onClick={() => {
          navigate("new");
        }}
      >
        Crear Formulario
      </Button>
    </VStack>
  );
};

export default FaForms;