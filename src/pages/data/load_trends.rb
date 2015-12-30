#
# ruby load_trends.rb 
# ruby load_trends.rb --startDate 2012-11-12T00:00:00Z --endDate 2012-11-12T23:59:59Z
#

require 'rubygems'
require "csv"
require 'json'
require 'open-uri'
require 'rubygems' # necessary for ruby v1.8.*
require 'micro-optparse'

options = Parser.new do |p|
  p.banner = "load trends"
  p.version = "0.1 alpha"
  p.option :startDate, "start date", :default => ""
  p.option :endDate, "end date", :default => ""
  p.option :gap, "facet gap", :default => "1HOUR", :value_in_set => ["1HOUR","1DAY"]
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
p options[:gap]

params = "q=codebits&start=0&rows=0&wt=json&facet=true&facet.date=created_at&facet.date.start="+ _startDate +"&facet.date.end=" + _endDate

# p "http://pattie.fe.up.pt/solr/facebook/select/?#{params}"

uri = "http://localhost:8983/solr/select/?#{URI::encode(params)}&facet.date.gap=%2B" + options[:gap]
p uri
trends = []
open(uri) do |f|
  data = JSON.parse(f.read)
  facet_values = data["facet_counts"]["facet_dates"]['created_at']
    # p "#{comments_count} comments for #{topic["name"]}"
  facet_values.each do |facet_value|
    timestamp = facet_value[0]
    value = facet_value[1]
    
    if (timestamp != "gap") && (timestamp != "start") && (timestamp != "end")
      trends << {:timestamp => timestamp, :value => value}
    end  
  end
end

File.open("trends_processed.json", 'w') { |file| file.write(JSON.pretty_generate(trends)) }
p "#{trends.count} trends written"
