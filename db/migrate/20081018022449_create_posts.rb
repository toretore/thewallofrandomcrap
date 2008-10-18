class CreatePosts < ActiveRecord::Migration
  def self.up
    create_table :posts do |t|
      t.string :type, :title, :body, :original_filename, :content_type
      t.string :hash_string, :length => 32

      t.belongs_to :user

      t.timestamps
    end
  end

  def self.down
    drop_table :posts
  end
end
