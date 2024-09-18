import { useNavigate } from "react-router-dom";
import { Button, VStack } from "rsuite";

const Home = () => {
  const Navigate = useNavigate();
  return (
    <VStack alignItems="center" spacing={10}>
      <Button
        appearance="primary"
        size="lg"
        block
        onClick={() => {
          Navigate("login");
        }}
      >
        Crear formulario(Educadores)
      </Button>
      <Button
        appearance="primary"
        size="lg"
        block
        onClick={() => {
          Navigate("forms");
        }}
      >
        Llenar formulario
      </Button>
    </VStack>
  );
};

export default Home;