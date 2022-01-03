import { User } from './User.js';


function validateEmail(mail:string){
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

const form: HTMLFormElement = document.getElementById('formUser') as HTMLFormElement;


form.onsubmit = () => {
    const formData = new FormData(form);
    const userLastName = formData.get('lastname') as string;
    const userFirstName = formData.get('firstname') as string;

    const userPassword = formData.get('mdp') as string;
    const userPasswordConfirm = formData.get('mdpconfirm') as string;
    const userPseudo = formData.get('pseudo') as string;
    const userEmail = formData.get('mail') as string;
    let bool=(userPassword==userPasswordConfirm).toString();
    let verifmail=validateEmail(userEmail)!.toString();

    let u;
    
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
