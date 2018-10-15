import swal from 'sweetalert2';
class Controller {
    constructor(){
        this.dom = {
            form: document.querySelector('form#register')
        }

        this.setEvents();
    }

    setEvents(){
        if ( this.dom.form ) { 
            console.log( 'Event added for form' );
            this.dom.form.addEventListener('submit', this.submitForm.bind(this));
        };
    }

    submitForm( event ){
        event.preventDefault();
        let form = event.target;
        let data = new FormData( form );
        swal({
            type: "success",
            titleText: "Thank you for being interested. Click OK to start reading",
            onClose: () => {
                window.location.href="/book/page-01";
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