class Twit < ActiveRecord::Base

  validates_presence_of :text, :screen_name, :name

  named_scope :by_time, :order => "twits.twitted_at DESC"
  named_scope :newer_than, lambda{|id| {:conditions => ["twits.id > ?", id]} }


  def text_without_reply_name
    text.gsub(/@[^ ]+/, '')
  end


end
