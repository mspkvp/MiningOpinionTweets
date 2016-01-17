#
# ruby load_topics_and_comments.rb --startDate 2012-11-12T00:00:00Z --endDate 2012-11-12T23:59:59Z
# 

require 'rubygems'
require "csv"
require 'json'
require 'open-uri'
require 'fileutils'
require 'rubygems' # necessary for ruby v1.8.*
require 'micro-optparse'


sentimentDir = "../../sentiment/"
filtered_tweets_dir = "../../filtered_tweets"
raw_topics_dir = "raw/topics/"


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

dates = Dir.entries(filtered_tweets_dir).select {|entry| File.directory? File.join(filtered_tweets_dir,entry) and !(entry =='.' || entry == '..') }

dates.each do |day|
  curDir = filtered_tweets_dir + "/" + day + "/*"
  entityFiles = Dir.glob(curDir)
  entityFiles.each do |ef|
    entity = File.basename(ef, ".txt")
    
    topics = []
    load_topics_from_csv(topics, sentimentDir + "newPositives_" + entity + "_" + day + ".csv", "positive")
    load_topics_from_csv(topics, sentimentDir + "newNegatives_" + entity + "_" + day + ".csv", "negative")
    load_topics_from_csv(topics, sentimentDir + "newNeutrals_" + entity + "_" + day + ".csv", "neutral")
    topics.sort! {|x, y| y["count"] <=> x["count"] }
    total_topics_count = topics.count


    ### Ad ids to topics and comments ###
    topics.each_index {|i| topics[i]["id"] = i}

    FileUtils.mkpath raw_topics_dir + entity
    ### Write data ###
    File.open(raw_topics_dir + entity + "/" + day + ".json", 'w') { |file| file.write(JSON.pretty_generate(topics)) }
    p "#{topics.count} topics written from a total of #{total_topics_count}"
  end
end
