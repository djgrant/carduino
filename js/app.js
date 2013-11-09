var createModal = Modal($('#modal-createCard'));

$('#action-createCard').on('click', function() {
  createModal.open();
});

$('#form-createCard').on('submit', function(event) {
  var form = $(this);
  event.preventDefault();
  $.ajax({
    url: 'http://carduino.herokuapp.com/experiences',
    type: 'POST',
    data: form.serialize(),
    success: function() {
      $('.createCard-submit button').text('Done!');
    }
  });
});