import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { Button, Heading, IconButton, List, Stack, Text, VStack } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import ArowBackIcon from "@rsuite/icons/ArowBack";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Forms = () => {
  const [forms, setForms] = useState<any[]>([]);

  const navigate = useNavigate();

  const fetchForms = async () => {
    const formsCollection = collection(db, "forms");
    const formsSnapshot = await getDocs(formsCollection);
    const formsList = formsSnapshot.docs.map((doc) => doc.data());
    setForms(formsList);
  };

  const addNewForm = async () => {
    navigate("new");
    const newForm = {
      /* form data */
    };
    try {
      const docRef = await addDoc(collection(db, "forms"), newForm);
      console.log("Document written with ID: ", docRef.id);
      fetchForms(); // Refresh the list of forms
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
        <List bordered>
          {[{}, {}, {}].map((form, index) => (
            <List.Item key={index}>
              <Stack justifyContent="space-between">
                <Text>Test label</Text>
                <Text>Creador</Text>
                <IconButton icon={<TrashIcon />} appearance="subtle" />
              </Stack>
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
