(function() {

  var els = {
    createModal:      $('#modal-createCard'),
    actionCreateCard: $('#action-createCard'),
    formCreateCard:   $('#form-createCard'),
    submitCreateCard: $('.createCard-submit button'),
    dropZone:         document.getElementById('drop_zone'),
    inputPhoto:       document.getElementById('input-photo'),
    buttonUploadPhoto:document.getElementById('button-upload-photo')
  };

  var config = {
    apiUrl: 'http://carduino.herokuapp.com/experiences',
    stickyStreetApiUrl: 'https://api.clienttoolbox.com/api.php'
  };

  var helpers = {
    transitionEndings: function() {
      return 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
    },
  };

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
          formDone(formClose);
        });
      }
    });
    var name = $(els.formCreateCard).find('[name="name"]').val();
    var phone = $(els.formCreateCard).find('[name="phone"]').val();
    var coffee = $(els.formCreateCard).find('[name="coffee"]').val();
    var track = $(els.formCreateCard).find('[name="track"]').val();
    var card_number = $(els.formCreateCard).find('[name="card_number"]').val();
    $.ajax({
      url: config.stickyStreetApiUrl,
      type: 'GET',
      data: {
        user_id: 'birdback',
        user_password: '7c4a8d09ca3762af61e59520943dc26494f8941b',
        type: 'record_customer',
        customer_action: 'new',
        campaign_id: '7333593371419969',
        account_id: 'birdback',
        code: '89838',
        phone: phone,
        first_name: name,
        custom_field_1: coffee,
        custom_field_2: track,
        card_number: card_number
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


  // Photo upload
  // ------------
  // Based on http://www.html5rocks.com/en/tutorials/file/dndfiles/

  els.inputPhoto.addEventListener('change', handleFileSelect, false);
  els.buttonUploadPhoto.addEventListener('click', function(e) {
    e.preventDefault();
    $(els.inputPhoto).trigger('click');
  });

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                  f.size, ' bytes, last modified: ',
                  f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                  '</li>');
    }
    document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('preview').insertBefore(span, null);
          $('input[name="photo"]')[0].setAttribute('value', e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }



})();
