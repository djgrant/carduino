var createModal = Modal($('#modal-createCard'));

$('#action-createCard').on('click', function() {
  createModal.open();
});

$('#form-createCard').on('submit', function(event) {
  event.preventDefault();
  console.log( $('#form-createCard').serialize() );
});