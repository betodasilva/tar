import swal from 'sweetalert2';
import cookie from './cookie';

class Controller {
    constructor(){
        this.dom = {
            form: document.querySelector('form#mc-embedded-subscribe-form'),
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
        if ( window.location.pathname !== '/') return;
        
        if ( cookie.hasItem('userRegistered') ) {
            this.dom.form.style.display = "none";
            this.dom.ctaText.innerText = "Looks like you already entered your email. Click the button to start reading."
            let button = document.createElement('button');
            button.classList.add('button', 'is-info', 'is-medium', 'is-margin-centered', 'is-block');
            button.innerText = 'Start reading';
            this.dom.ctaText.insertAdjacentElement('afterend', button);
            button.addEventListener('click', function(event){
                event.stopPropagation();
                window.location.href="/book/page-17";
            });
        }
    }

    submitForm( event ){
        event.preventDefault();
        let form = event.target;
        let url = form.getAttribute('action');
        let user = {
            FNAME: form.querySelector('input[name="FNAME"]').value,
            EMAIL: form.querySelector('input[name="EMAIL"]').value,
        };

        if ( !(user.EMAIL && user.FNAME) ) {
            swal({
                type: "error",
                titleText: "Please, check the fields and try again"
            });
            return;
        }

       

        this.subscribeUser( user ).then( message => {
            form.submit();
        }).catch( err => {
            swal({
                type: "error",
                titleText: err
            });
        });
    }

    subscribeUser( user ) {
        
        return new Promise( (resolve, reject) => {
            if ( user.FNAME && user.EMAIL ) {

                let date = new Date();
                date.setDate( date.getDate() + 7);
                cookie.setItem('userRegistered', user, date);
                resolve("Thank you, you can now read The Lost Art of Relationship for Free");
                return;
                
            } else {
                reject("Sorry for that, but something went wrong.");
            }
        });
    }

    showError( message ) {
        

        
    }
}

class Page {
    constructor(){
        this.dom = {
            page: document.querySelector('.page'),
            select: document.querySelector('.navigation select')
        }

        this.init();
    }

    init() {
        if ( !(window.location.href.indexOf('book') > -1) ) return;
        
        this.setEvent();
    }

    setEvent() {
        console.log('Event init');
        this.dom.select.addEventListener('change', this.navigateToSection.bind(this))
    }

    navigateToSection(event){
        const val = event.target.value;
        console.log( val );
        window.location.href = val;
    }


}

const controller = new Controller();
const page = new Page();

document.addEventListener('DOMContentLoaded', function(){
    const url = new URL( window.location.href );
    let subs = url.searchParams.get('subs');
    if ( subs == 'success' ) {
        swal({
            type: "success",
            titleText: "Thank you, you can now read The Lost Art of Relationship for Free",
            onClose: () => {
                window.location.href="/book/page-17";
            }
        })
    }

});