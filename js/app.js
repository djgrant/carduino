(function() {

  var els = {
    createModal:      $('#modal-createCard'),
    actionCreateCard: $('#action-createCard'),
    formCreateCard:   $('#form-createCard'),
    submitCreateCard: $('.createCard-submit button')
  };

  var config = {
    apiUrl: 'http://carduino.herokuapp.com/experiences'
  };

  var helpers = {
    transitionEndings: function() {
      return 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    },
  }

  var createModal = Modal(els.createModal);

  els.actionCreateCard.on('click', function() {
    createModal.open();
  });

  els.formCreateCard.on('submit', function(event) {
    var self = $(this);
    event.preventDefault();
    $.ajax({
      url: config.apiUrl,
      type: 'POST',
      data: self.serialize(),
      success: function() {
        formSending(function() {
          formDone(formClose)
        });
      }
    });
  });

  function formSending(callback) {
    els.submitCreateCard.text('Sending card...');
    setTimeout(function() {
      callback();
    }, 1250);
  }

  function formDone(callback) {
    els.submitCreateCard.text('Done!');
    setTimeout(function() {
      callback();
    }, 850);
  }

  function formClose(callback) {
    createModal.close();
    els.createModal.one(helpers.transitionEndings(), function() {
      els.submitCreateCard.text('Create');
    });
  }
})();
