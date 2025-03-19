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
    // commenting out next two lines to refactor below
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    // refactoring to a single state object with two keys:
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
    });

    // REQ 3: HANDLER FUNCTION
    // goal of handler function: update the firstName variable with the event.target.value (this, paired with the onChange inside the return, allows us to actually type into the form fields and see the text appear in that field)
    // refactoring the two separate event handlers
    // const handleFirstNameChange = (event) => {
    //     setFirstName(event.target.value);
    // }; 
    // const handleLastNameChange = (event) => {
    //     setLastName(event.target.value);
    // };

    // refactored event handler
    // ...formData at this point is the original object before we make this event change (in other words, it's the first and last names of the previous iteration of the state update). this allows us to keep lastName state if we update firstName (and vice versa).
    // event.target.name takes the value of the name prop in our input form by accessing the key dynamically through square bracket notation
    const handleChange = (event) => {
        // console.log('setting formData to: ', { ...formData, [event.target.name]: event.target.value });
        // When a user changes the data in this input, the [event.target.name]: event.target.value code is executed. The value of the <input> element’s name prop (firstName) is set as a key on the new formData state and has a value matching the new value.
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    return (
        <>
            <h2>{title}</h2>
            <form>
                <label htmlFor="firstName">First Name: </label>
                <input 
                    // The value of the name prop aligns with the firstName property in the formData state. The formData.firstName state is used as the value of the input
                    id="firstName" 
                    name="firstName" 
                    // REQ 2: VALUE
                    // value={firstName}
                    value={formData.firstName} 
                    // REQ 3 cont: HANDLER FUNCTION
                    // onChange={handleFirstNameChange}
                    onChange={handleChange}
                />

                <label htmlFor="lastName">Last Name: </label>
                <input
                    // The value of the name prop aligns with the firstName property in the formData state. The formData.firstName state is used as the value of the input
                    id="lastName"
                    name="lastName"
                    // REQ 2: VALUE
                    // value={lastName}
                    value={formData.lastName}
                    // REQ 3 cont: HANDLER FUNCTION
                    // onChange={handleLastNameChange}
                    onChange={handleChange}
                />
            </form>
        </>
    );
};

export default App;
