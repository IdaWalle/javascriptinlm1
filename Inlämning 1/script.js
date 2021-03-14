const regForm = document.querySelector('#regForm');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');

let users =[];


const validateText = id => {
    const input = document.querySelector('#' + id);
    const error = input.nextElementSibling;
  
    if(input.value.trim() === '') {
      error.innerText = 'Ange efternamn ';
      input.classList.add('is-invalid');
      return false;
    } else if(input.value.length < 2) {
      error.innerText = 'Ange förnamn';
      input.classList.add('is-invalid');
      return false;
    } else {
      input.classList.add('is-valid');
      input.classList.remove('is-invalid');
      return true;
    }
  }

const validateEmail = id => {
    const input = document.querySelector('#' + id);
    const error = input.nextElementSibling;

    const regEx = /^([\w-]+(?:\.[\a-z]+)*)@((?:[\w-]+\.)*\w[a-z]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

   if(!regEx.test(input.value)){
        error.innerText = 'Ange giltig e-mailadress';
        input.classList.add('is-invalid');
        return false;  
    } else {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    }

}

const validate = () => {
    document.querySelectorAll('input').forEach(input => {
        if(input.type === 'text') {
            validateText(input.id)
        } 

        if(input.type === 'email') {
            validateEmail(input.id)
        }
    })
}


const resetForm = () => {
    document.querySelectorAll('input').forEach(input => {
       input.value = '';
       input.classList.remove('is-valid')
    })
}


const createUser = (firstName, lastName, email) => {
    let user = {
        id: Date.now(). toString(),
        firstName,
        lastName,
        email
    }

    users.push(user);
    console.log(users)
}

const renderUsers = () => {

 output.innerHTML = '';

 users.forEach(user => {
     let template =`
     <div class=" border border-1 rounded-2 user d-flex justify-content-between align-items-center mt-3 p-2">
        <div class="text">
            <h4 class="mb-1">${user.firstName} ${user.lastName}</h4>
            <small type="email">${user.email}</small>
        </div>
        <div class="buttons">
            <button class="btn btn-primary">Ändra</button>
            <button class="btn btn-danger">Radera</button>
        </div>
    </div>
    `
    output.innerHTML += template;
 })
}


renderUsers();

regForm.addEventListener('submit', (e) => {
    e.preventDefault();

    validate();

    if(validateText('firstName') && validateText('lastName') && validateEmail('email')){
        createUser(firstName.value, lastName.value, email.value)
        renderUsers();
        resetForm();
    }
})

  