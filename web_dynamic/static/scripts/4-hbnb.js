$('document').ready(function () {
  let amenList = [];
  $('input[type=checkbox]').on('click', function () {
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
  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    success: function (result) {
      $.each(result, function (index, value) {
        buildArticle(value);
      });
    }
  });
  $('button').on('click', function () {
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:5001/api/v1/places_search/',
      data: JSON.stringify({'amenities': Object.keys(amenList)}),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (result) {
        $('.places').empty();
        $('.places').append('<h1>Places</h1>');
        $.each(result, function (index, value) {
          buildArticle(value);
        });
      }
    });
  });
  function buildArticle (value) {
    $('.places').append("<article><div class = 'title'><h2>" +
                        value.name + "</h2> <div class ='price_by_night'> $" +
                        value.price_by_night + '</div> </div>' +
                        "<div class = 'information'>" +
                        "<div class='max_guest'>" +
                        "<i class='fa fa-users fa-3x' aria-hidden='true'>" +
                        '</i> <br />' + value.max_guest +
                        " Guests </div> <div class='number_rooms'>" +
                        "<i class='fa fa-bed fa-3x' aria-hidden='true'></i>" +
                        '<br />' + value.number_rooms +
                        " Bedrooms </div> <div class='number_bathrooms'>" +
                        "<i class='fa fa-bath fa-3x' aria-hidden='true'>" +
                        '</i> <br />' + value.number_bathrooms +
                        " Bathroom </div> </div> <div class='user'>" +
                        "</div> <div class='description'>" +
                        value.description + '</div> </article>');
  }
});
    