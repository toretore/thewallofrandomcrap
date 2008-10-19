class PostReceiver < ActionMailer::Base


  def receive(email)
    if user = User.find_by_identifier(email.to.first[/^(.+?)@/, 1])
      image_part = email.parts.detect{|p| p.content_type =~ /image/ }

      post = if image_part
        image_part.base64_decode
        user.photos.build(:file => StringIO.new(image_part.body))
      else
        user.notes.build
      end

      post.title = email.subject

      text_parts = email.parts.select{|p| p.content_type == "text/plain" }
      if text_parts.any?
        post.body = text_parts.map(&:body).join("\n\n")
      else
        post.body = email.body
      end
        
      post.body = post.body.gsub(/^Attachment:.*$/, '').strip

      unless post.save
        logger.error("POST SAVE FAILED: #{post.errors.full_messages.join(',')}")
      end
    else
      logger.error("COULD NOT FIND USER: #{email.to.inspect}")
    end
  ensure
    logger.flush
  end


end
