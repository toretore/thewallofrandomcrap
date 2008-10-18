# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper


  def title(t)
    content_for(:title){ t }
  end


  def javascript(*files)
    content_for :head do
      files.map{|f| javascript_include_tag f }.join("\n")
    end
  end


  def random_class_name
    %w(koda basanda bosoya tikki)[rand(4)]
  end


end
