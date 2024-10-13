import { initializeApp } from "firebase/app";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Button, Heading, IconButton, List, Stack, VStack } from "rsuite";

import ArowBackIcon from "@rsuite/icons/ArowBack";

import { auth, firebaseConfig } from "../../firebase/config";
import FormCard from "./components/FormCard";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Forms = () => {
  const [forms, setForms] = useState<DocumentData[]>([]);

  const navigate = useNavigate();

  const fetchForms = async () => {
    const formsCollection = collection(db, "forms");
    const formsSnapshot = await getDocs(formsCollection);
    const formsList = formsSnapshot.docs.map((doc) => doc.data());
    setForms(formsList);
  };

  const addNewForm = async () => {
    navigate("new");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        redirect("/login");
      }
    });

    return () => unsubscribe();
  }, [auth]);

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
        <List bordered hover>
          {forms.map((form, index) => (
            <List.Item key={index}>
              <FormCard form={form} />
            </List.Item>
          ))}
        </List>
      </VStack>
      <Button appearance="primary" size="lg" onClick={addNewForm}>
        Crear Formulario
      </Button>
    </VStack>
  );
};

export default Forms;
