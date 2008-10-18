StickyBoard.Posts = ActiveElement.Collection.spawn('post', {

  extend: {
    findInDocument: function(){
      return new this($('posts'));
    },
    attach: function(posts){
      StickyBoard.posts = posts;
    }
  },

  afterInitialize: function(){
    this.watch();
  },
  
  insertNewPosts: function(html){
    this.element.insert({top:html});
    this.reload(this.first().get('id'));
  },
  
  reload: function(lastId){
    lastId = parseInt(lastId);
    this.items = this.findItems();
    this.each(function(post){
      if (parseInt(post.get('id')) > lastId) {
        post.highlight();
      }
    });
  },
  
  watch: function(){
    var posts = this;
    this._interval = setInterval(function(){
      new Ajax.Request('/', {
        method: 'get',
        parameters: {last_id:posts.first().get('id')},
        onSuccess: function(res){
          posts.insertNewPosts(res.responseText);
        }
      });
    }, 15000);
  }

});

StickyBoard.Post = ActiveElement.Base.spawn('post', {

  afterInitialize: function(){
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
