import { useState } from "react";
import { Container, Header, Heading, Stack, VStack } from "rsuite";

const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <Container>
      <VStack alignItems="stretch">
        <Header>
          <Stack spacing={10} alignItems="center">
            <img
              src="src/assets/img/logo_gs_guido_buffo.png"
              height={60}
              width={60}
            />
            <Heading>GS Guido Buffo</Heading>
            {user && (
              <img
                src={user.photoURL}
                alt="User Avatar"
                height={40}
                width={40}
                style={{ borderRadius: "50%" }}
              />
            )}
          </Stack>
        </Header>
        <main>{children}</main>
      </VStack>
    </Container>
  );
};

export default MainLayout;
