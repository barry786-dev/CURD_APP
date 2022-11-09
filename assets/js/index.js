$('#add_user').submit(() => {
  alert('Data Inserted Successfully');
});

$('#update_user button').click(() => {
  $.ajax({
    type: 'PUT',
    url: $('#update_user').attr('action'),
    data: $('#update_user').serialize(),
    success: function (data, textStatus, jqXHR) {
      alert('everything was OK');
    },
  });
  window.location.href = '/';
});
