class CreateTwits < ActiveRecord::Migration
  def self.up
    create_table :twits do |t|
      t.string :name, :screen_name, :text, :profile_image_url, :url
      t.integer :twitter_id

      t.timestamps
    end
  end

  def self.down
    drop_table :twits
  end
end
