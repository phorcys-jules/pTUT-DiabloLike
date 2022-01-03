import { User } from './User.js';

function validateEmail(mail){
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let res = regex.test(mail).toString();

    switch(res){
        case 'true':
            return true;
            break;

        case 'false':
            return false;
            break;

        default:
            alert("erreur");
            break;
    }
}

const form = document.getElementById('formUser');

form.onsubmit = () => {
    const formData = new FormData(form);
    const userLastName = formData.get('lastname');
    const userFirstName = formData.get('firstname');

    const userPassword = formData.get('mdp');
    const userPasswordConfirm = formData.get('mdpconfirm');
    const userPseudo = formData.get('pseudo');
    const userEmail = formData.get('mail');
    let bool=(userPassword==userPasswordConfirm).toString();
    let verifmail=validateEmail(userEmail).toString();

    let u;
    //console.log(verifmail);
    switch (bool) {
        case 'true':
            if(verifmail=='true'){
                u = new User(userPseudo,userFirstName, userLastName, userPassword, userEmail);
                alert(u.toString());
            }else{
                alert("Email invalide");
            }
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