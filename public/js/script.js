$(document).ready(function () {
  var $bookmarkbtn = $('.bookmarkbtn')

  $bookmarkbtn.on('click', function () {
    // console.log($(this).val())
    var $bookmarkid = $(this).val()

    $.ajax({
      type: 'PUT',
      url: 'http://localhost:5000/bookmark.json',
      data: {
        articleid: $bookmarkid
      }
    }).done(function (data) {
      console.log('I am from ajax', data)
    })
  })
})
