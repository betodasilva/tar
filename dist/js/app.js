"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Controller =
/*#__PURE__*/
function () {
  function Controller() {
    _classCallCheck(this, Controller);

    this.dom = {
      form: document.querySelector('form#register')
    };
    this.setEvents();
  }

  _createClass(Controller, [{
    key: "setEvents",
    value: function setEvents() {
      this.dom.form.addEventListener('submit', this.submitForm.bind(this));
    }
  }, {
    key: "submitForm",
    value: function submitForm(event) {
      event.preventDefault();
      alert('Nothing happens for now :) \nYou gonna see page one');
      window.location.href = "/book/page-01";
    }
  }]);

  return Controller;
}();

var Page = function Page() {
  _classCallCheck(this, Page);

  this.dom = {
    page: document.querySelector('.page')
  };
};

var controller = new Controller();