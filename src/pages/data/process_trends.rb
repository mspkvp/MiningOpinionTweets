require 'open-uri'
require 'json'

trends_raw = JSON.parse(open('trends_raw.json') {|f| f.read })
trends = []

trends_raw.each do |timestamp, value|
  trends << {:timestamp => timestamp, :value => value}
end

File.open("trends.json", 'w') { |file| file.write(JSON.pretty_generate(trends)) }
p "#{trends.count} trends written"
