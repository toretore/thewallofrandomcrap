class PostsController < ApplicationController


  def index
    if params[:last_id]
      @posts = Post.all(:limit => 30, :order => "posts.id DESC", :conditions => ["posts.id > ?", params[:last_id]])
    else
      @posts = Post.all(:limit => 30, :order => "posts.id DESC")
      @twits = Twit.by_time(:limit => 20)
    end

    if request.xhr?
      @posts.empty? ? render(:text => ":(", :status => 404) : render(:partial => "post", :collection => @posts)
    end
  end


end
