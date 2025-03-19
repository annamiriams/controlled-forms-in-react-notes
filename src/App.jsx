// src/App.jsx

import './App.css';
import { useState } from 'react';

// FIRST EXAMPLE BELOW THAT SPELLS OUT CONTROLLED INPUT REQUIREMENTS

// const App = () => {
//     // FIRST REQUIREMENT FOR CONTROLLED INPUT = STATE
//     // construct cityInput state
//     const [cityInput, setCityInput] = useState('');

//     // THIRD REQUIREMENT FOR CONTROLLED INPUT = HANDLER FUNCTION
//     const handleChange = (event) => {
//         setCityInput(event.target.value);

//     }; 

//     return (
//         <>
//             <label htmlFor="cityInput">City: </label>
//             <input 
//                 id="cityInput" 
//                 name="cityInput" 
//                 type="text" 
//                 // SECOND REQUIREMENT FOR CONTROLLED INPUT = VALUE/FORM INPUT
//                 // we can add a value prop to our input and set the value of that prop to cityInput. In standard HTML, value is an attribute of the input element. However, when you’re working with JSX in React, these attributes are treated as props. Despite the difference in name, there is functionally very little difference for us as we interact with value.
//                 // The input field’s value prop is now bound to the cityInput state. This binding ensures that the displayed value in the input field always matches the current state, and is updated in real-time as the user types.
//                 value={cityInput}
//                 // THIRD REQUIREMENT CONT.
//                 // When a user types or deletes a character in the input, the onChange event fires off. React automatically sends an event object to the handleChange() handler function. This object contains information about the event, including the element the user changed, found on event.target.
//                 onChange={handleChange}
//             />
//         </>
//     );
// };

// export default App;


// SECOND EXAMPLE BELOW THAT EXPLAINS CONTROLLED FORMS
const App = () => {
    // add placeholder text for the title
    // we'll use the form to update this state by the end of this lesson
    const [title, setTitle] = useState('The full name will appear here.');
    
    // REQ 1: STATE
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // REQ 3: HANDLER FUNCTION
    // goal of handler function: update the firstName variable with the event.target.value (this, paired with the onChange inside the return, allows us to actually type into the form fields and see the text appear in that field)
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }; 
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    
    return (
        <>
            <h2>{title}</h2>
            <form>
                <label htmlFor="firstName">First Name: </label>
                <input 
                    id="firstName" 
                    name="firstName" 
                    // REQ 2: VALUE
                    value={firstName} 
                    // REQ 3 cont: HANDLER FUNCTION
                    onChange={handleFirstNameChange}
                />

                <label htmlFor="lastName">Last Name: </label>
                <input
                    id="lastName"
                    name="lastName"
                    // REQ 2: VALUE
                    value={lastName}
                    // REQ 3 cont: HANDLER FUNCTION
                    onChange={handleLastNameChange}
                />
            </form>
        </>
    );
};

export default App;
