class PostsController < ApplicationController


  def index
    @posts = if params[:last_id]
      Post.all(:limit => 30, :order => "posts.id DESC", :conditions => ["posts.id > ?", params[:last_id]])
    else
      Post.all(:limit => 30, :order => "posts.id DESC")
    end

    if request.xhr?
      @posts.empty? ? render(:text => ":(", :status => 404) : render(:partial => "post", :collection => @posts)
    else
      @posts.shift()
    end
  end


end
