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
    this.loadNew();
  },
  
  //Find new posts from inserted HTML
  //This is a bit hacky
  loadNew: function(){
    var posts = this;
    this.element.select('.post').each(function(element){
      if (!posts.any(function(p){ return p.element == element; })) {
        //Here comes the hacky bit, relying on and changing the internals of the collection
        var klass = posts.klass.fetchBaseClass();
        var post = new klass(element);
        post.collection = posts;
        posts.items.unshift(post);
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
    }, 5000);
  }

});

StickyBoard.Post = ActiveElement.Base.spawn('post', {

  afterInitialize: function(){
    this.hijackDeleteForm();
  },
  
  setHighlightedValue: function(b){ this.element[b ? 'addClassName' : 'removeClassName']('highlighted'); },
  getHighlightedValue: function(){ return this.element.hasClassName('highlighted'); },
  setDisabledValue: function(b){ this.element[b ? 'addClassName' : 'removeClassName']('disabled'); },
  getDisabledValue: function(){ return this.element.hasClassName('disabled'); },

  highlight: function(){
    var post = this;
    post.set('highlighted', true);
    setTimeout(function(){
      post.set('highlighted', false);
    }, 2000);
  },

  hijackDeleteForm: function(){
    var post = this,
        form = this.element.down('.tools .delete form');

    //There's no form if current_user != post.user
    if (!form) return;

    //Replace form with a link
    var link = new Element('a', {href:'#', 'class':'delete'});
    link.update(form.down('input[type=submit]').value);

    //Observe the link
    link.observe('click', function(e){
      e.stop();
      post.set('highlighted', true);
      if (confirm('Are you sure you want to delete this post?')) {
        new Ajax.Request(form.readAttribute('action'), {
          method: 'delete',
          parameters: {authenticity_token: form.down('[name=authenticity_token]').value},
          onSuccess: function(){
            post.fancyRemove();
          },
          onFailure: function(){
            alert("FAIL");
          },
          onComplete: function(){
            post.set('highlighted', false);
          }
        });
      } else {
        post.set('highlighted', false);
      }
    });

    form.insert({after:link});
    form.addClassName('disabled');
  },

  //Override to remove wrapper element as well
  remove: function(){
    this.element.up('.post-wrapper').remove();
    this.collection.removeItem(this);
  },

  //Disables the post, then removes after a short timeout (default 1 sec)
  fancyRemove: function(timeout){
    var post = this;
    post.set('disabled', true);
    setTimeout(function(){
      post.remove();
    }, timeout || 1000);
  }

});
