$(function(){
    var getTxt = $('.content p').text();
    var realTxt = [getTxt]
    var textCol = [getTxt]
    var wordsCount = textCol[0].split(' ').length;
    var words = textCol[0].split(' ');
    var wordsLimit = 40;
    var limitCol;
    
    $('.readmore h3').click(function(){
    if ( $(this).text() === "show more") {
        $('.content p').text(realTxt.join(' '));
        $('.content').addClass('scroll');
        $(this).text('show less');
        $('.item').addClass('showfull');
      } else {
        $('.content p').text(limitCol);
         $(this).text('show more');
        $('.item').removeClass('showfull');
      }
  });
    
    if (wordsLimit <= wordsCount) {
      words.splice(wordsLimit, wordsCount - wordsLimit);
      words = words.join(' ');
      $('.content p').text(words + '...');
      limitCol = $('.content p').text();
    }
    
    $('.like').click(function(){
      $(this).toggleClass('clicked');
    });
    
    
    
    
    
  });