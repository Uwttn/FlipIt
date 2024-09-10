import React from "react";

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <main>
      <Box
        bg="#63b6c3"
        minH="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" align="center" justify="center" color="white">
          <Heading mb={4}>Welcome to FlipIt</Heading>
          <Flex>
            <Link to="/login">
              <Button colorScheme="teal" mr={4}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="teal">Signup</Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </main>
  );
};

export default LandingPage;
