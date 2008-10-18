class Twit < ActiveRecord::Base

  validates_presence_of :text, :screen_name, :name

end
