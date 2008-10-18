class Photo < Post

  acts_as_image

  self.image_sizes = {
    :large => ["640x480!", :crop],
    :medium => ["320x240!", :crop],
    :small => ["200x150!", :crop],
    :thumb => ["100x100!", :crop],
    :tiny => ["50x50!", :crop],
    :micro => ["25x25!", :crop]
  }

  self.image_save_path = File.join(RAILS_ROOT, 'public', 'images', 'uploads')
  self.image_read_path = ['images', 'uploads'].join('/')

end
