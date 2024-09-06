import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
// import { QUERY_SINGLE_PROFILE } from '../utils/queries';
import Auth from "../utils/auth";

const user = Auth.getProfile();
const userId = user.data._id;
console.log(userId);

// Define keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

    <main>
        <Heading as='h1' color="gray.600" align='center'>Study Mode</Heading>
        <Heading as='h4' color="gray.600" align='center'>Choose a Deck</Heading>
                
        <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="#f7fafc"
        height="58vh"
      >

    </Box>
    </main>

const DeckSelect = ({ decks }) => {
    if (!decks.length) {
      return <h3>No decks Yet</h3>;
    }
  
    return (
      <div>
        <div className="flex-row justify-space-between my-4">
          {decks &&
            decks.map((skill) => (
              <div key={skill} className="col-12 col-xl-6">
                <div className="card mb-3">
                  <h4 className="card-header bg-dark text-light p-2 m-0">
                    {skill} <br />
                  </h4>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  };
  
  export default DeckSelect;
  