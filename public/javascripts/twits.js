StickyBoard.Twits = ActiveElement.Collection.spawn('twit', {

  extend: {
    findInDocument: function(){
      return new this($('twits'));
    },
    attach: function(twits){
      StickyBoard.twits = twits;
    }
  },

  afterInitialize: function(){
    this.watch();
  },
  
  insertNewTwits: function(html){
    this.first().element.insert({before:html});
    this.reload(this.first() && this.first().get('id'));
  },
  
  reload: function(lastId){
    lastId = parseInt(lastId);
    this.items = this.findItems();
    this.each(function(twit){
      if (parseInt(twit.get('id')) > lastId) {
        twit.highlight();
      }
    }); 
    this.applyClassNames();
  },

  applyClassNames: function(){
    this.each(function(twit, index){
      twit.element.removeClassName('odd');
      twit.element.removeClassName('even');
      twit.element.addClassName(index % 2 ? 'odd' : 'even');
    });
  },

  watch: function(){
    var twits = this;
    setTimeout(function(){
      twits._interval = setInterval(function(){
        new Ajax.Request('/twits', {
          method: 'get',
          parameters: {last_id:(twits.first() && twits.first().get('id'))},
          onSuccess: function(res){
            twits.insertNewTwits(res.responseText);
          }
        });
      }, 14000);
    }, 7000);
  }

});

StickyBoard.Twit = ActiveElement.Base.spawn('twit', {

  getScreenNameValue: function(){
    //Remove @
    return this.getValueFromElement('screen_name').substring(1);
  },

  setHighlightedValue: function(b){
    this.element[b ? 'addClassName' : 'removeClassName']('highlighted');
  },

  getHighlightedValue: function(){
    return this.element.hasClassName('highlighted');
  },

  highlight: function(){
    var post = this;
    post.set('highlighted', true);
    setTimeout(function(){
      post.set('highlighted', false);
    }, 2000);
  }

});
