#Generated by ActsAsImage
class <%= name %> < ActiveRecord::Base

  acts_as_image#This must come before any other methods defined by the plugin
  
  #Such as this one, which defines the sizes for the image scaling. See the
  #docs for SingletonMethods#image_sizes for more information on how it works.
  self.image_sizes = {
    :large => '800x600',
    :medium => '640x480',
    :small => '320x240',
    :thumb => ['100x100!', :crop]
  }
  
  #Where to save images
  self.image_save_path = File.join(RAILS_ROOT, 'public', 'images', 'uploads')
  #Where the browser can find them
  self.image_read_path = ['images', 'uploads'].join('/')

end