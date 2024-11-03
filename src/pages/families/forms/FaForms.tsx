import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heading, IconButton, List, Loader, Stack, VStack } from "rsuite";

import ArowBackIcon from "@rsuite/icons/ArowBack";

import FaFormCard from "./components/FaFormCard";
import { firebaseConfig } from "../../../firebase/config";
import { Form } from "../../../interfaces/Form";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FaForms = () => {
  const [loading, setLoading] = useState(true);
  const [forms, setForms] = useState<Form[]>([]);

  const navigate = useNavigate();

  const fetchForms = async () => {
    setLoading(true);
    const formsCollection = collection(db, "forms");
    const formsSnapshot = await getDocs(formsCollection);
    const formsList = formsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        formValues: data.formValues,
        creator: data.creator,
        formType: data.formType,
        createdAt: data.createdAt,
      } as Form;
    });
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
                <FaFormCard
                  form={form}
                  onClick={() => {
                    navigate(`/fa/forms/fill/${form.id}`);
                  }}
                />
              </List.Item>
            ))}
          </List>
        )}
      </VStack>
    </VStack>
  );
};

export default FaForms;
