import { User } from './User.js';

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
         displayError('Erreur, veuillez vérifier que les mots de passes soient indentiques');
    }

    let u:User = new User(userPseudo,userFirstName, userLastName, userPassword, userEmail);

    async function getCrypto ( query: string ): object {
        const url = new URL(...
        url.search = new URLSearchParams(...
        const headers = {...
        const response = await fetch( url.toString(), {headers} );
        return await response.json();
     };

    const errorMessage = document.getElementById('errorMessage') as HTMLElement;
    
    errorMessage.classList.add('d-none');
    errorMessage.classList.remove('show');

    return false; // prevent reload
};