import {
  ChakraProvider,
  Container,
  Stack,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
const axios = require("axios");

function App() {
  const [link, setLink] = useState("");

  const handleChange = (event) => {
    setLink(event.target.value);
  };

  const handleClick = async (event) => {
    const baseURL = "https://geeurl-server.herokuapp.com/";
    try {
      const response = await axios.post(baseURL, {
        long: link,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ChakraProvider>
      <Center padding={5}>
        <Container>
          <Center padding={10}>
            <Text fontSize="6xl">geeparaURL</Text>
          </Center>
          <Stack spacing={4}>
            <InputGroup size="sm">
              <InputLeftAddon children="Link: " />
              <Input onChange={handleChange} />
            </InputGroup>
            <Center>
              <Button w="5rem" h="2rem" padding={1} onClick={handleClick}>
                Shorten
              </Button>
            </Center>
          </Stack>
        </Container>
      </Center>
    </ChakraProvider>
  );
}

export default App;
