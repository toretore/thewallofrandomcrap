class PostsController < ApplicationController


  def index
    @posts = Post.all(:limit => 30, :order => "posts.created_at DESC")
  end


end
