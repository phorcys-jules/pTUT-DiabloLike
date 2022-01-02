import { User } from './User.js';

const form = document.getElementById('formUser');

form.onsubmit = () => {
    const formData = new FormData(form);
    const userLastName = formData.get('lastname');
    const userFirstName = formData.get('firstname');

    const userPassword = formData.get('mdp');
    const userPasswordConfirm = formData.get('mdpconfirm');
    const userPseudo = formData.get('pseudo');
    const userEmail = formData.get('mail');
    let u;
    let bool=(userPassword==userPasswordConfirm).toString();
    //console.log(bool);
    switch (bool) {
        case 'true':
            u = new User(userPseudo,userFirstName, userLastName, userPassword, userEmail);
            alert(u.toString())
            break;
        case 'false':
            alert('Erreur, veuillez vérifier que les mots de passes soient indentiques');
            break;
    
        default:
            throw new Error("Erreur creation");
            break;
    }
    return false; // prevent reload
};