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
  InputRightAddon,
  InputRightElement,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useState } from "react";
import copy from "copy-to-clipboard";
const axios = require("axios");

function App() {
  const [link, setLink] = useState("");
  const [short, setShort] = useState("");
  const baseURL = "http://localhost:5050/";
  // const baseURL = "https://geeurl-server.herokuapp.com/";

  const handleChange = (event) => {
    setLink(event.target.value);
  };

  const handleClick = async () => {
    if (link !== "") {
      try {
        const response = await axios.post(baseURL, {
          long: link,
        });
        setShort(response.data.data.short);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const copyClick = () => {
    copy(baseURL + short);
  };

  return (
    <ChakraProvider>
      <Center padding={5}>
        <Container>
          <Center padding={10}>
            <Text fontSize="6xl">geeparaURL</Text>
          </Center>
          <Stack spacing={4}>
            <Center>
              <InputGroup size="md">
                <InputLeftAddon children="Link: " />
                <Input onChange={handleChange} />
                <InputRightAddon w="5rem">
                  <Button size="md" onClick={handleClick}>
                    Shorten
                  </Button>
                </InputRightAddon>
              </InputGroup>
            </Center>
            <Center padding={5}></Center>
            <Center>
              <InputGroup w={"25rem"}>
                <Input
                  isReadOnly={true}
                  onChange={handleChange}
                  value={baseURL + short}
                />
                <InputRightElement w="5rem" paddingRight={".5rem"}>
                  <Button
                    paddingRight="1rem"
                    size="sm"
                    rightIcon={<CopyIcon />}
                    onClick={copyClick}
                  >
                    Copy
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Center>
          </Stack>
        </Container>
      </Center>
    </ChakraProvider>
  );
}

export default App;
