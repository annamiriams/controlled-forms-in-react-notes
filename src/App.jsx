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
    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    // refactoring to a single state object with two keys:
    // const [formData, setFormData] = useState({
    //     firstName: '',
    //     lastName: '',
    // });
    // refactoring again for level up content
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirmation: '',
    });

    // adding for level up content:
    // needs to be before handler functions because we'll use them in those functions
    // we only need the target property from the event, so we'll destructure it from the event parameter (this means we don't have to write event.target all the way through this function)
    const checkErrors = ({ target }) => {
        if (target.name === 'firstName') {
            setErrors({
                // using spread operator to ensure we're not overriding the original errors object/previous versions of errors
                ...errors,
                firstName:
                    target.value.length < 3
                        ? 'Your first name must be at least three characters long.'
                        : '',
            });
        }
        if (target.name === 'lastName') {
            setErrors({
                ...errors,
                lastName:
                    target.value.length < 2
                        ? 'Your last name must be at least two characters long.'
                        : '',
            });
        }
        if (target.name === 'password') {
            setErrors({
                ...errors,
                password:
                    target.value.length < 6
                        ? 'Your password must be at least six characters long.'
                        : '',
                passwordConfirmation:
                    formData.passwordConfirmation !== target.value
                        ? 'The passwords do not match.'
                        : '',
            });
        }
        if (target.name === 'passwordConfirmation') {
            setErrors({
                ...errors,
                passwordConfirmation:
                    formData.password !== target.value
                        ? 'The passwords do not match.'
                        : '',
            });
        }
    };

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
    // we could destructure these functions further (per level up content) so we don't have to reference event.target.name every time
    const handleChange = (event) => {
        // console.log('setting formData to: ', { ...formData, [event.target.name]: event.target.value });
        // When a user changes the data in this input, the [event.target.name]: event.target.value code is executed. The value of the <input> element’s name prop (firstName) is set as a key on the new formData state and has a value matching the new value.
        setFormData({ ...formData, [event.target.name]: event.target.value });
        // Now, our state changes when there is an error
        checkErrors(event);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('We no longer navigate away from this page');
        setTitle(`Your name is ${formData.firstName} ${formData.lastName}`);
        // clear the input fields upon clicking submit
        setFormData({ 
            firstName: '', 
            lastName: '',
            password: '',
            passwordConfirmation: '',
        });
    };

    // Here’s a quick explanation of this code, first for formIsInvalid:
    // Object.values() is used to create an array of the values in the errors object.In other words, this will be an array of the error message strings that users may see
    // .some(Boolean) checks if any values are truthy(non - empty strings).If so, .some() will return true.
    // Ultimately formIsInvalid is only true if there are error messages in state.
    const formIsInvalid = Object.values(errors).some(Boolean);
    // For formHasMissingData:
    // Again, Object.values() is used to create an array of the values in the formData object, or in other words, an array containing the data the user has entered into the form.
    // Check if every value in the array is truthy(non - empty strings) using.every(Boolean).
    // Then, use the bang operator to invert the boolean value returned by.every().
    // Ultimately, formHasMissingData is only true if any of the values in formData is an empty string.
    // We can’t derive this from the errors state because we only check for errors after the user has entered something into an input.
    const formHasMissingData = !Object.values(formData).every(Boolean);
    // ALL OF THIS IS FRONT END VALIDATION ONLY: Front-end validation is NOT a legitimate security measure but creates a better user experience. It should still be provided to save the backend from random bad requests and let the front-end user only submit forms without apparent errors. For example, it would not be difficult for a bad actor to circumvent a disabled button, so it’s crucial to not rely on front-end validation for security.

    return (
        <>
            <h2>{title}</h2>
            {/* attach handleSubmit to the form, not to the button itself */}
            <form onSubmit={handleSubmit}>
                <div>
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
                    {/* show if there is an error */}
                    {errors.firstName && <p className="error">{errors.firstName}</p>}
                </div>
                <div>
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
                    {errors.lastName && <p className="error">{errors.lastName}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="passwordConfirmation">Password Confirmation:</label>
                    <input
                        type="password"
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        value={formData.passwordConfirmation}
                        onChange={handleChange}
                    />
                    {errors.passwordConfirmation && <p className="error">{errors.passwordConfirmation}</p>}
                </div>
                {/* by default, a submit button causes the page to refresh */}
                <button type='submit' disabled={formIsInvalid || formHasMissingData}>Submit your name</button>
            </form>
        </>
    );
};

export default App;
