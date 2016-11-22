$('.about_user_social_views, .about_user_social_talks, .about_user_social_like').mouseenter( function() {
  $( this ).animate({
    'margin-top': '-7px'
  }, 100,  function () {
   $( this ).animate({
    'margin-top': '0px'
    });
  });
});

$('.about_user_avatar').mouseenter ( function() {
  $(this).animate ( {
      'margin' : '11px',
      'width': '65px',
      'height': '65px' 
  }, 300, function () {
    $(this).animate ( {
      'margin' : '6px',
      'width': '75px',
      'height': '75px' 
    });
  });
});