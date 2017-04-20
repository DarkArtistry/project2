$(document).ready(function () {

  // function setloginbackground () {
  //
  // }

  var $bookmarkbtn = $('.bookmarkbtn')

  $bookmarkbtn.on('click', function () {
    // console.log($(this).val())
    var thebutton = $(this)
    var $bookmarkid = $(this).val()
    $.ajax({
      type: 'PUT',
      url: 'https://still-mesa-80925.herokuapp.com/bookmark.json',
      // url: 'http://localhost:5000/bookmark.json',
      data: {
        articleid: $bookmarkid
      }
    }).done(function (data) {
      console.log('I am from ajax', data)

      if (thebutton.val() === data) {
        thebutton.removeClass('bm')
      } else {
        thebutton.addClass('bm')
      }

    })
  })

  var $grid = $('.grid').masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  });
  // layout Isotope after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });
})
