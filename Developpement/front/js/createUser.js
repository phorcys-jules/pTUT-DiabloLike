var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { User } from './User.js';
function validateEmail(mail) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(mail);
}
function displayError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = `<strong>Error!</strong> ${message}`;
    errorMessage.classList.add('show');
    errorMessage.classList.remove('d-none');
    throw new Error(message);
}
const form = document.getElementById('formUser');
if (form === null) {
    throw new Error("Cannot get formUser");
}
function validate(u) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = { username: 'example' };
        //POST request with body equal on data in JSON format
        fetch(`http://localhost:8752/createUser/${u.pseudo}/${u.firstname}/${u.lastname}/${u.password}/${u.email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
            console.log('Success:', data);
            window.location.href = './createChar.html';
        })
            //Then with the error genereted...
            .catch((error) => {
            console.error('Error:', error);
        });
    });
}
;
/**
 * Main
 * @param e event (confirm button of form)
 * @returns false
 */
form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const userLastName = formData.get('lastname');
    const userFirstName = formData.get('firstname');
    const userPassword = formData.get('mdp');
    const userPasswordConfirm = formData.get('mdpconfirm');
    const userPseudo = formData.get('pseudo');
    const userEmail = formData.get('mail');
    console.log(userLastName);
    if (userLastName === '' || userFirstName === '' || userPassword === '' || userPasswordConfirm === '' ||
        userPseudo === '' || userEmail === '') {
        displayError("Au moin un champ n'est pas remplit");
    }
    if (!validateEmail(userEmail)) {
        displayError("Email invalide");
    }
    if (!(userPassword === userPasswordConfirm)) {
        displayError('Erreur, veuillez vérifier que les mots de passes soient indentiques');
    }
    let u = new User(userPseudo, userFirstName, userLastName, userPassword, userEmail);
    validate(u);
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.classList.add('d-none');
    errorMessage.classList.remove('show');
    return false; // prevent reload
};
