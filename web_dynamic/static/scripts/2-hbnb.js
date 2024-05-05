$('document').ready(function () {
  $('input[type=checkbox]').on('click', function () {
    let amenList = [];
    $('input:checked').each(function () {
      amenList.push($(this).attr('data-name'));
    });
    $('.amenities h4').text(amenList.join(', '));
    if (amenList.length === 0) {
      $('.amenities h4').html('&nbsp;');
    }
  });
  $.getJSON('http://127.0.0.1:5001/api/v1/status', function (val) { 
    if (val.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

});
    