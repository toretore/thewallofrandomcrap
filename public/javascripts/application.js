StickyBoard = {

  labelify: function(){
    $$('form p.labelify').each(function(p){
      var label = p.down('label'),
          input = p.down('input');
      label.hide();
      input.value = label.innerHTML;
      input.observe('focus', function(){
        if (input.value == label.innerHTML) {
          input.value = '';
        }
      });
      input.observe('blur', function(){
        if (!input.value) {
          input.value = label.innerHTML;
        }
      });
    });
  }

};


document.observe('dom:loaded', function(){
  StickyBoard.labelify();
});
