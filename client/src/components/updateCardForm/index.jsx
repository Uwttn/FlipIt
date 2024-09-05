import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_CARD } from "../../utils/mutations";
import { QUERY_CARDS } from "../../utils/queries";

const UpdateCardForm = ({
  cardId,
  initialCardData,
  handleCloseUpdateCardModal,
}) => {
  const [formState, setFormState] = useState({
    cardName: initialCardData.cardName,
    type: initialCardData.type,
    question: initialCardData.question,
    answers: initialCardData.answers,
  });

  useEffect(() => {
    setFormState({
      cardName: initialCardData.cardName,
      type: initialCardData.type,
      question: initialCardData.question,
      answers: initialCardData.answers,
    });
  }, [initialCardData]);

  const [updateCard, { error }] = useMutation(UPDATE_CARD, {
    refetchQueries: [{ query: QUERY_CARDS }],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateCard({ variables: { cardId, ...formState } });
      setFormState({
        cardName: "",
        type: "",
        question: "",
        answers: [],
      });
      handleCloseUpdateCardModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleWeaknessChange = (event, index) => {
    const newWeaknesses = [...formState.answers];
    newWeaknesses[index] = event.target.value;
    setFormState({ ...formState, answers: newWeaknesses });
  };

  const handleRemoveWeakness = (index) => {
    const newWeaknesses = [...formState.answers];
    newWeaknesses.splice(index, 1);
    setFormState({ ...formState, answers: newWeaknesses });
  };

  const addWeakness = () => {
    setFormState({ ...formState, answers: [...formState.answers, ""] });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name='cardName'
        value={formState.cardName}
        onChange={handleChange}
        placeholder='Card Name'
      />
      <input
        name='type'
        value={formState.type}
        onChange={handleChange}
        placeholder='Type'
      />
      <input
        name='question'
        value={formState.question}
        onChange={handleChange}
        placeholder='Question'
      />
      {formState.answers.map((answer, index) => (
        <div key={index}>
          <input
            value={answer}
            onChange={(event) => handleWeaknessChange(event, index)}
            placeholder='Weakness'
          />
          <button type='button' onClick={() => handleRemoveWeakness(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type='button' onClick={addWeakness}>
        Add Weakness
      </button>
      <button type='submit'>Update Card</button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
};

export default UpdateCardForm;
