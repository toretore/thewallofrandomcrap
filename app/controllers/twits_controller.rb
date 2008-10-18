class TwitsController < ApplicationController


  def index
    @twits = if params[:last_id]
      Twit.by_time(:limit => 20).newer_than(params[:last_id])
    else
      Twit.by_time(:limit => 20)
    end

    if @twits.empty?
      render :text => ":(", :status => 404
    else
      render :partial => "twit", :collection => @twits
    end
  end


end
