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

// $('.delete').click(function () {
//   userId = $(this).attr('data-userId');
//   const request = {
//     method: 'DELETE',
//     url: `api/users/${userId}`,
//   };
//   $.ajax(request).done((response) => {
//     alert('the user deleted');
//   });
//   setTimeout(() => {
//     window.location.href = '/';
//   }, 1000);
// });

if (window.location.pathname == '/') {
  $onDelete = $('.table tbody td a.delete');
  $onDelete.click(function () {
    const userId = $(this).attr('data-userId');
    const request = {
      method: 'DELETE',
      url: `api/users/${userId}`,
    };
    if (confirm('Are you sure?')) {
      $.ajax(request).done((response) => {
        alert('the user deleted');
        location.reload();
      });
    }
  });
}
