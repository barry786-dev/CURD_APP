$('#add_user').submit(() => {
  alert('Data Inserted Successfully');
});

// $('#update_user button').click(() => {
//   $.ajax({
//     type: 'PUT',
//     url: $('#update_user').attr('action'),
//     data: $('#update_user').serialize(),
//     success: function (data, textStatus, jqXHR) {
//       // console.log(this.data);
//       alert('everything was OK');
//     },
//   });
//   setTimeout(() => {
//     window.location.href = '/';
//   }, 1000);
// });

$('#update_user').submit(function (e) {
  e.preventDefault();
  const unIndexed_array = $(this).serializeArray();
  const data = {};
  $.map(unIndexed_array, (n, i) => {
    data[n['name']] = n['value'];
  });
  const request = {
    method: 'PUT',
    url: `api/users/${data.id}`,
    data: data,
  };
  $.ajax(request).done((response) => {
    alert('everything was OK');
  });
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
});
