import { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';
import { ADD_CARD } from '../../utils/mutations';

export default function ModalForm() {

  const [addCard, {error, data}] = useMutation(ADD_CARD);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // State for Deck Name
  const [deckName, setDeckName] = useState('');

  // State for storing all flashcards
  const [flashcards, setFlashcards] = useState([]);

  // State for current flashcard values (front and back)
  const [currentFlashcard, setCurrentFlashcard] = useState({
    front: '',
    back: '',
  });

  // Handle input changes for current flashcard
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentFlashcard({
      ...currentFlashcard,
      [name]: value,
    });
  };

  // Add current flashcard to the array and reset inputs
  const addFlashcard = () => {
    if (currentFlashcard.front && currentFlashcard.back) {
      setFlashcards([...flashcards, currentFlashcard]); 
      setCurrentFlashcard({ front: '', back: '' }); 

      console.log('Flashcards Array:', flashcards);
    } else {
      alert('Please fill in both the front and back fields.');
    }
  };

  // Handle Save (collect all deck info)
  const handleSave = async () =>  {
    if (deckName) {
      
      console.log('Deck Name:', deckName);
      console.log('Flashcards:', flashcards);

      const variable = {
        question: flashcards[0].front,
        answers: flashcards.map(card => card.back)
      }
      console.log(variable);
      const {data} = await addCard({variables:variable})
      console.log(data)

      //console.log(variable)
      // Close the modal after saving
      onClose();
    } else {
      alert('Please enter a deck name.');
    }
  };

  return (
    <>
      <Button onClick={onOpen} rightIcon={<AddIcon />} colorScheme="teal" size="lg">
        Create a Deck
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your Deck</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mb={4}>
              <FormLabel>Name of Deck</FormLabel>
              <Input
                placeholder="Deck Name"
                value={deckName}
                onChange={(e) => setDeckName(e.target.value)}
              />
            </FormControl>

            {/* Current Flashcard - Front */}
            <FormControl mb={2}>
              <FormLabel>Front</FormLabel>
              <Input
                name="front"
                value={currentFlashcard.front}
                onChange={handleInputChange}
                placeholder="Front of flashcard"
              />
            </FormControl>

            {/* Current Flashcard - Back */}
            <FormControl mb={4}>
              <FormLabel>Back</FormLabel>
              <Input
                name="back"
                value={currentFlashcard.back}
                onChange={handleInputChange}
                placeholder="Back of flashcard"
              />
            </FormControl>

            {/* Button to save current flashcard */}
            <Button onClick={addFlashcard} colorScheme="teal" variant="outline" mb={4}>
              Add More
            </Button>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
