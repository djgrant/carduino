(function(w, d) {
  function Modal(el, options) {
    if (this === w) {
      return new Modal(el, options);
    }
    this.el = (el instanceof jQuery) ? el[0] : el;
    this.options = options || {};
  };

  Modal.prototype.open = function(){
    this.el.classList.add('is-open');
  };

  Modal.prototype.close = function(){
    this.el.classList.remove('is-open');
  };

  w.Modal = Modal;

})(window, document);