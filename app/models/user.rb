class User < ActiveRecord::Base

  has_many :posts, :dependent => :destroy
  has_many :photos
  has_many :notes

  validates_presence_of :openid_url, :identifier
  validates_uniqueness_of :openid_url

  before_validation_on_create :generate_identifier

  attr_protected :openid_url


  def display_name
    name.blank? ? openid_url : name
  end


private

  def generate_identifier
    chars = ("a".."z").to_a
    begin
      self.identifier = Array.new(8).map{ chars[rand(chars.size)] }.join
    end while self.class.find_by_identifier(identifier)
  end


end
