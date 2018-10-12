class Controller {
    constructor(){
        this.dom = {
            form: document.querySelector('form#register')
        }

        this.setEvents();
    }

    setEvents(){
        if ( this.dom.form ) this.dom.form.addEventListener('submit', this.submitForm.bind(this));
    }

    submitForm( event ){
        event.preventDefault();
        alert('Nothing happens for now :) \nYou gonna see page one');
        window.location.href="/book/page-01"
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