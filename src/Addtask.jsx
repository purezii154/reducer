import { useReducer } from 'react';

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phoneNumber: '',
    message: '',
  },
  people: []
};

function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value
        }
      };
    case 'ADD_PERSON':
      const newPerson = {
        firstName: state.formData.firstName,
        lastName: state.formData.lastName,
        company: state.formData.company || 'N/A',
        email: state.formData.email,
        phoneNumber: state.formData.phoneNumber,
        imageUrl: 'https://via.placeholder.com/256'
      };
      return {
        ...state,
        people: [...state.people, newPerson],
        formData: initialState.formData // Reset form
      };
    default:
      console.error('Unknown action:', action);
      return state;
  }
}

export { initialState, formReducer };