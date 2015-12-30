#
# ruby load_topics_and_comments.rb --startDate 2012-11-12T00:00:00Z --endDate 2012-11-12T23:59:59Z
# 

require 'rubygems'
require "csv"
require 'json'
require 'open-uri'

require 'rubygems' # necessary for ruby v1.8.*
require 'micro-optparse'

opinionizerResultsDir = "/Users/arian/Developer/workspace/codebits/sentibubbles_pipeline/Opinionizer/Results/"

options = Parser.new do |p|
  p.banner = "load topics and comments"
  p.version = "0.1 alpha"
  p.option :startDate, "start date", :default => ""
  p.option :endDate, "end date", :default => ""
end.process!

if(options[:startDate] == nil || options[:startDate] == "")
  _startDate = "NOW-2DAY"
else
  _startDate = options[:startDate]
end

if(options[:endDate] == nil || options[:endDate] == "")
  _endDate = "NOW"  
else
  _endDate = options[:endDate]
end
  
p options[:startDate]
p options[:endDate]

### Load all topics fom CSV files ###
def load_topics_from_csv(topics, path, sentiment)
  CSV.foreach(path) do |row|
    
    if(row[1].to_i >= 2)
      topics << {
        "name" => row[0],
        "count" => row[1].to_i,
        "forms" => row[2].chomp(";"),
        "sentiment" => sentiment
      }
    end
    
  end
end

topics = []
load_topics_from_csv(topics, opinionizerResultsDir+ "newPositives.csv", "positive")
load_topics_from_csv(topics, opinionizerResultsDir+ "newNegative.csv", "negative")
topics.sort! {|x, y| y["count"] <=> x["count"] }
total_topics_count = topics.count


### Load comments containing topics ###
comments = []
comment_ids = []

topics.each do |topic|
  forms = topic["forms"].split(";").join(" OR ")

  #params = "q=merkel AND (text:(#{forms}))&rows=24&indent=off&wt=json&fl=id,text,created_at"
  #params = "fq=merkel&q=-\"RT%20@\" AND created_at:[NOW-7DAY TO NOW] AND (text:(#{forms}))&rows=24&indent=off&wt=json&fl=id,text,created_at
  
  params = "fq=codebits&q=-'RT%20@' AND created_at:["+ _startDate +" TO "+ _endDate + "] AND (text:(#{forms}))&rows=24&indent=off&wt=json&fl=id,text,created_at"
  # params = "fq=merkel&q=-'RT%20@' AND created_at:[NOW-7DAY TO NOW] AND (text:(#{forms}))&rows=24&indent=off&wt=json&fl=id,text,created_at"

  # p "http://pattie.fe.up.pt/solr/facebook/select/?#{params}"

#http://pattie.fe.up.pt/solr/portuguese/select/?fq=merkel%20AND%20-"RT%20@"&q=created_at:[NOW-7DAY TO NOW] AND (text:(#{forms}))&rows=24&indent=off&wt=json&fl=id,text,created_at

  uri = "http://localhost:8983/solr/select/?#{URI::encode(params)}"
  
  p uri

  open(uri) do |f|
    data = JSON.parse(f.read)
    comments_count = data["response"]["docs"].count
    if comments_count == 0
      topics.delete(topic)
    else
      # p "#{comments_count} comments for #{topic["name"]}"
      data["response"]["docs"].each do |comment|
        next if comment_ids.include?(comment["id"]) # skip if the comment was already added
        p comment["text"]
        comments << comment
        comment_ids << comment["id"]
      end
    end
  end
end


### Ad ids to topics and comments ###
topics.each_index {|i| topics[i]["id"] = i}
comments.each_index {|i| comments[i]["id"] = i}


### Write data ###
File.open("topics.json", 'w') { |file| file.write(JSON.pretty_generate(topics)) }
p "#{topics.count} topics written from a total of #{total_topics_count}"

File.open("comments.json", 'w') { |file| file.write(JSON.pretty_generate(comments)) }
p "#{comments.count} comments written"

# "27 topics written from a total of 52"
# "25 comments written"
# 
# "36 topics written from a total of 52"
# "38 comments written"
