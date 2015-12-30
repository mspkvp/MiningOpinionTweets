require 'rubygems' # necessary for ruby v1.8.*
require 'micro-optparse'

options = Parser.new do |p|
  p.banner = "This is a fancy script, for usage see below"
  p.version = "fancy script 0.0 alpha"
  p.option :startDate, "start date", :default => ""
  p.option :endDate, "end date", :default => ""
  p.option :gap, "facet gap", :default => "+1HOUR", :value_in_set => ["+1HOUR","+1DAY"]
end.process!

p options[:startDate]
p options[:endDate]
p options[:gap]