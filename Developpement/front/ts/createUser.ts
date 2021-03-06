import Game from './engine/Game.js';
import { User } from './User.js';

User.whoIsConnected();

function validateEmail(mail:string):boolean{
    let regex:RegExp = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(mail);
}

function displayError(message:string) {
    const errorMessage = document.getElementById('errorMessage') as HTMLElement;
    errorMessage.innerHTML = `<strong>Error!</strong> ${message}`;
    
    errorMessage.classList.add('show');
    errorMessage.classList.remove('d-none');
    throw new Error(message);
}

const form:HTMLFormElement  = document.getElementById('formUser') as HTMLFormElement ;

if (form ===null ) {
    throw new Error("Cannot get formUser");
    
}

async function validate ( u: User ){
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
      Game.player = u;
      window.location.href = './createChar.html';
    })
    //Then with the error genereted...
    .catch((error) => {
      console.error('Error:', error);
      displayError("Erreur, nous n'avons pas pus contacter le serveur");
    });
};

/**
 * Main
 * @param e event (confirm button of form)
 * @returns false
 */

form.onsubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const userLastName = formData.get('lastname') as string;
    const userFirstName = formData.get('firstname') as string;

    const userPassword = formData.get('mdp') as string;
    const userPasswordConfirm = formData.get('mdpconfirm') as string;
    const userPseudo = formData.get('pseudo') as string;
    const userEmail = formData.get('mail') as string;

    console.log(userLastName);
    if ( userLastName==='' || userFirstName==='' || userPassword==='' || userPasswordConfirm==='' || 
        userPseudo==='' || userEmail==='') {
            displayError("Au moin un champ n'est pas remplit");      
    }

    if( ! validateEmail(userEmail)){
         displayError("Email invalide");
    }
    if(! (userPassword===userPasswordConfirm)){
         displayError('Erreur, veuillez v??rifier que les mots de passes soient indentiques');
    }

    
    let u:User = new User(userPseudo,userFirstName, userLastName, userPassword, userEmail);

    //TODO : display error impossible de joindre l'api
    try {
      validate(u);
      
    } catch (error) {
      console.log("coucou");
      
    }

    const errorMessage = document.getElementById('errorMessage') as HTMLElement;
    
    errorMessage.classList.add('d-none');
    errorMessage.classList.remove('show');

    return false; // prevent reload
};