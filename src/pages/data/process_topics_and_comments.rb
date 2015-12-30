require 'rubygems'
require 'json'

### Load original data ###
topics = JSON.parse(open('topics.json') {|f| f.read })
comments = JSON.parse(open('comments.json') {|f| f.read }) #[0..10]


### Process data ###
# Setup topic's comment_ids
topics.each do |topic|
  topic["comment_ids"] = []
end


comments_count = 0
comments.each do |comment|
  matching_forms = []

  # Find all the matching forms for each topic
  topics.each do |topic|
    re = /\b(#{topic["forms"].split(";").join("|")})\b/i
    offset = 0
    
    p comment["text"]
    p offset
    while match = re.match(comment["text"], offset) do
      # while match = re.match(comment["text"]) do

      match.captures.each_index do |i|
        # Add the current match
        matching_forms << {
          "topic_id" => topic["id"],
          "form" => match.captures[i],
          "offset" => match.offset(i)
        }
        # Add the comment id to the topic

        topic["comment_ids"] << comment["id"]
        # Update the offset
        offset = match.offset(i)[0]+1
      end
    end
  end

  # Sort the matching forms by their occurrence in the comment
  # keeping the longest first if they occur at the same place
  matching_forms.sort!{|x, y| x["offset"][0] == y["offset"][0] ? y["offset"][1] <=> x["offset"][1] : x["offset"][0] <=> y["offset"][0]}

  # Remove overlapping forms
  mf0 = nil
  matching_forms.each do |mf|
    matching_forms.delete(mf) if mf0 && mf["offset"][0] < mf0["offset"][1]
    mf0 = mf
  end

  # Insert anchors on all the remaining forms
  matching_forms.map{|mf| mf["form"]}.uniq.each do |form|
    comment["text"].gsub!(/\b(#{form})\b/, '<a>\1</a>')
  end

  # Add extra info to the comment
  comment["topic_ids"] = matching_forms.map{|mf| mf["topic_id"]}

  p "#{(1.0*comments_count/comments.count*100).to_i}% - #{comments_count} of #{comments.count}" if comments_count % 100 == 0
  comments_count += 1
end

topics.each do |topic|
  topic["comment_ids"].sort!.uniq!
end

# p "TOPICS---------------------------------"
# p topics
# p "COMMENTS-------------------------------"
# p comments

### Write data ###
File.open("topics_processed.json", 'w') { |file| file.write(JSON.pretty_generate(topics)) }
p "#{topics.count} topics processed and written"

File.open("comments_processed.json", 'w') { |file| file.write(JSON.pretty_generate(comments)) }
p "#{comments.count} comments processed and written"

