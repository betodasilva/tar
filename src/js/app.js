import swal from 'sweetalert2';
import cookie from './cookie';

class Controller {
    constructor(){
        this.dom = {
            form: document.querySelector('form#register'),
            ctaText: document.querySelector('.home__cta .subtitle')
        }

        this.setEvents();
        this.checkUserRegistered();
    }

    setEvents(){
        if ( this.dom.form ) { 
            this.dom.form.addEventListener('submit', this.submitForm.bind(this));
        };
    }

    checkUserRegistered(){
        if ( cookie.hasItem('userRegistered') ) {
            this.dom.form.style.display = "none";
            this.dom.ctaText.innerText = "Looks like you already entered your email. Click the button to start reading."
            let button = document.createElement('button');
            button.classList.add('button', 'is-info', 'is-inverted', 'is-margin-centered', 'is-block');
            button.innerText = 'Start reading';
            this.dom.ctaText.insertAdjacentElement('afterend', button);
            button.addEventListener('click', function(event){
                event.stopPropagation();

                window.location.href="/book/page-01";
            });
        }
    }

    submitForm( event ){
        event.preventDefault();
        let form = event.target;
        let user = {
            name: form.querySelector('input[name="name"]').value,
            email: form.querySelector('input[name="email"]').value,
        };
        this.storeUser( user ).then( message => {
            swal({
                type: "success",
                titleText: message,
                onClose: () => {
                    window.location.href="/book/page-01";
                }
            });
        }).catch( err => {
            swal({
                type: "error",
                titleText: err
            });
        });
    }

    storeUser( user ) {
        return new Promise( (resolve, reject) => {
            if ( user.name && user.email ) {
                //cookie.setItem();
                let date = new Date();
                date.setDate( date.getDate() + 7);
                cookie.setItem('userRegistered', user, date);
                resolve("Thank you for being interested. Click on the button to start reading.");
            } else {
                reject("Sorry for that, but something went wrong.");
            }
        });
    }
}

class Page {
    constructor(){
        this.dom = {
            page: document.querySelector('.page'),
        }
    }


}

const controller = new Controller();