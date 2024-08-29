import { useNavigate } from "react-router-dom";
import { Button, VStack } from "rsuite";

const Home = () => {
  const Navigate = useNavigate();
  return (
    <VStack alignItems="center" spacing={10}>
      <Button
        appearance="primary"
        onClick={() => {
          Navigate("permiso-acampe");
        }}
      >
        Permiso de acampe
      </Button>
    </VStack>
  );
};

export default Home;
