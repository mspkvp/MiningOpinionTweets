
function update(entity, day) {

$.getJSON('data/raw/lda_topics/' + entity + '/' + day + '.json', function(lda_topics_response){
  $('#lda_topic')
         .html("");
  lda_topics_response.words.forEach(function(word){
    
    $('#lda_topic')
         .append($("<li></li>")
         .text(word));
  }); 
});

/**
 * Data
 */
var data = {};

$.getJSON('data/processed/topics/' + entity + '/' + day + '.json', function(topics_response){
  $("#no-results").hide();
  data.topics = topics_response;

  if(data.topics.length == 0) $("#no-results").show();

  // Topic index for a faster access
  data.topicIndex = {};
  data.topics.forEach(function(topic) { data.topicIndex[topic.id] = topic; });

  // Only topics shown as bubbles
  data.bubble_topics = data.topics.slice(0, 50);

  // The ids of comments containing the topics shown as bubbles
  data.bubble_topic_comment_ids = [];
  data.bubble_topics.forEach(function(topic) {
    topic.comment_ids.forEach(function(id) {
      if (data.bubble_topic_comment_ids.indexOf(id) == -1) {
        data.bubble_topic_comment_ids.push(id);
      }
    });
  });

  // All the comments
  $.getJSON('data/processed/comments/' + entity + '/' + day + '.json', function(comments_response){
    data.comments = comments_response;

    // Comment index for a faster access
    data.commentIndex = {};
    data.comments.forEach(function(comment) { data.commentIndex[comment.id] = comment; });
  
    $.getJSON('data/raw/trends/' + entity + '.json', function(trends_response){
      data.trends = trends_response;

      (function() {
        var width = 512,
            height = 512;

        var padding = 4, // collision padding
            maxRadius = 62, // collision search radius
            maxComments = 12, // limit displayed mentions
            activeTopic; // currently-displayed topic

        var r = d3.scale.sqrt()
            .domain([0, d3.max(data.bubble_topics, function(d) { return d.count; })])
            .range([0, maxRadius]);

        var force = d3.layout.force()
            .gravity(0)
            .charge(0)
            .size([width, height])
            .on("tick", tick);

        var node = d3.select(".g-nodes").selectAll(".g-node"),
            label = d3.select(".g-labels").selectAll(".g-label");

        d3.select(".g-nodes").append("rect")
            .attr("class", "g-overlay")
            .attr("width", width)
            .attr("height", height)
            .on("click", clear);

        d3.select(window)
            .on("hashchange", hashchange);

        updateTopics(data.bubble_topics);
        hashchange();

        // Update the known topics.
        function updateTopics(topics) {
          topics.forEach(function(d, i) { d.r = Math.max(12, r(d.count)); }); // min. collision
          force.nodes(data.bubble_topics = topics).start();
          updateNodes();
          updateLabels();
        }

        // Update the displayed nodes.
        function updateNodes() {
          node = node.data(data.bubble_topics, function(d) { return d.name; });

          node.exit().remove();

          node.enter().append("a")
              .attr("class", function(d) { return "g-node "+d.sentiment; })
              .attr("xlink:href", function(d) { return "#" + encodeURIComponent(d.name); })
              .call(force.drag)
              .call(linkTopic)
            .append("circle");

          node.select("circle")
              .attr("r", function(d) { return r(d.count); });
        }

        // Update the displayed node labels.
        function updateLabels() {
          label = label.data(data.bubble_topics, function(d) { return d.name; });

          label.exit().remove();

          var labelEnter = label.enter().append("a")
              .attr("class", "g-label")
              .attr("href", function(d) { return "#" + encodeURIComponent(d.name); })
              .call(force.drag)
              .call(linkTopic);

          labelEnter.append("div")
              .attr("class", "g-name")
              .text(function(d) { return d.name; });

          labelEnter.append("div")
              .attr("class", "g-value");

          label
              .style("font-size", function(d) { return Math.max(8, r(d.count) / 2) + "px"; })
              .style("width", function(d) { return r(d.count) * 2.5 + "px"; });

          // Create a temporary span to compute the true text width.
          label.append("span")
              .text(function(d) { return d.name; })
              .each(function(d) { d.dx = Math.max(2.5 * r(d.count), this.getBoundingClientRect().width); })
              .remove();

          label
              .style("width", function(d) { return d.dx + "px"; })
            .select(".g-value")
              .text(function(d) { return d.count + (d.r > 60 ? " menções" : ""); });

          // Compute the height of labels when wrapped.
          label.each(function(d) { d.dy = this.getBoundingClientRect().height; });
        }

        // Update the active topic.
        function updateActiveTopic(topic) {
          if (activeTopic = topic) {
            node.classed("g-selected", function(d) { return d === topic; });
            updateMentions(topic);
            // d3.select("#g-topic").text((topic.commentsCount > maxComments ? "Uma amostra dos " : topic.commentsCount || "Não há") + " comentários que utilizam a palavra “" + topic.name + "”");
          } else {
            node.classed("g-selected", false);
            updateMentions()
            // d3.select("#g-topic").text("Uma amostra dos comentários");
          }
        }

        // Update displayed comments.
        function updateMentions(topic) {
          // Display all the comments containing topics shown on bubbles
          // if no topic is given or the comments containing the given topic otherwise.
          var comments = (topic ? topic.comment_ids : data.bubble_topic_comment_ids).map(function(id) { return data.commentIndex[id]; });

          // If too many comments, a random sample is used
          if (comments.length > maxComments) {
            comments = shuffle(comments).slice(0, maxComments);
          }

          // Rather than compute a data-join, just blow away the entire layout.
          // With wider support for multi-column layout, a data-join would work.
          var column = d3.selectAll(".g-mentions")
              .datum(0)
              .html(null);

          var heights = column.data(),
              indexes = d3.range(heights.length);

          // Incrementally add each new speaker to the shortest column untill filling the available space
          var overflow = false;
          comments.forEach(function(comment) {
            if (overflow) return;

            var index = d3.first(indexes, function(a, b) { return heights[a] - heights[b]; });

            var div = d3.select(column[0][index]).append("div")
                .attr("class", "g-mention");

            // div.append("p")
            //     .attr("class", "date")
            //     .text("YYYY-MM-DD");

            var p = div.append("p")
                .attr("class", "mention")
                .html(comment.text);

            p.selectAll("a")
              .data(comment.topic_ids.map(function(id) { return data.topicIndex[id]; }))
                .attr("href", function(d) { return "#" + encodeURIComponent(d.name); })
                .attr("class", function(d) { return d == topic ? d.sentiment+" active" : d.sentiment; })
                .call(linkTopic);

            heights[index] += div.node().getBoundingClientRect().height;

            if (heights[index] > 370) {
              div.remove();
              overflow = true;
            }
          });
        }

        // Assign event handlers to topic links.
        function linkTopic(a) {
          a   .on("click", click)
              .on("mouseover", mouseover)
              .on("mouseout", mouseout);
        }

        // Returns the topic matching the specified name, approximately.
        // If no matching topic is found, returns undefined.
        function findTopic(name) {
          for (var i = 0, n = data.topics.length, t; i < n; ++i) {
            if ((t = data.topics[i]).name === name) {
              return t;
            }
          }
        }

        // Simulate forces and update node and label positions on tick.
        function tick(e) {
          node
              .each(gravity(e.alpha * .1))
              .each(collide(.5))
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

          label
              .style("left", function(d) { return (d.x - d.dx / 2) + "px"; })
              .style("top", function(d) { return (d.y - d.dy / 2) + "px"; });
        }

        // Custom gravity to favor a non-square aspect ratio.
        function gravity(alpha) {
          var cx = width / 2,
              cy = height / 2,
              ax = alpha / 4,
              ay = alpha / 4;
          return function(d) {
            d.x += (cx - d.x) * ax;
            d.y += (cy - d.y) * ay;
          };
        }

        // Resolve collisions between nodes.
        function collide(alpha) {
          var q = d3.geom.quadtree(data.bubble_topics);
          return function(d) {
            var r = d.r + maxRadius + padding,
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            q.visit(function(quad, x1, y1, x2, y2) {
              if (quad.point && (quad.point !== d) && d.other !== quad.point && d !== quad.point.other) {
                var x = d.x - quad.point.x,
                    y = d.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = d.r + quad.point.r + padding;
                if (l < r) {
                  l = (l - r) / l * alpha;
                  d.x -= x *= l;
                  d.y -= y *= l;
                  quad.point.x += x;
                  quad.point.y += y;
                }
              }
              return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
          };
        }

        // Fisher–Yates shuffle.
        function shuffle(array) {
          var m = array.length, t, i;
          while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
          }
          return array;
        }

        // Update the active topic on hashchange, perhaps creating a new topic.
        function hashchange() {
          var name = decodeURIComponent(location.hash.substring(1)).trim();
          updateActiveTopic(name && name != "!" ? findTopic(name) : null);
        }

        // Clear the active topic when clicking on the chart background.
        function clear() {
          location.replace("#!");
        }

        // Rather than flood the browser history, use location.replace.
        function click(d) {
          location.replace("#" + encodeURIComponent(d === activeTopic ? "!" : d.name));
          d3.event.preventDefault();
        }

        // When hovering the label, highlight the associated node and vice versa.
        // When no topic is active, also cross-highlight with any mentions in excerpts.
        function mouseover(d) {
          node.classed("g-hover", function(p) { return p === d; });
          d3.selectAll(".g-mention a").classed("g-hover", function(a) { return a === d; });
        }

        // When hovering the label, highlight the associated node and vice versa.
        // When no topic is active, also cross-highlight with any mentions in excerpts.
        function mouseout(d) {
          node.classed("g-hover", false);
          d3.selectAll(".g-mention a").classed("g-hover", false);
        }

        })();


        /**
         * Trendline visualization
         */
        (function() {

        var settings = {
          animatinoDuration: 1000,
          eventTextHeight: 0,
          eventIconSize: 0,
          eventMargin: 2,
          markerColor: "#444",
          fillColor: "#FECEA8",
          strokeColor: "#E5BA94",
          strokeWidth: 2
        };

        function drawTrendline(svg, width, height, granularity, trends, options) {
          trends.forEach(function(trend) {
            if (typeof(trend.timestamp) == "string") {
              trend.timestamp = new Date(trend.timestamp);
            }
          });

          var xMin = d3.first(trends).timestamp;
          var xMax = d3.last(trends).timestamp;
          var yMin = 0;
          var yMax = d3.max(trends, function(d) { return d.value; });
          var xScale = d3.time.scale().domain([xMin, xMax]).range([0, width]);
          var yScale = d3.scale.linear().domain([yMin, yMax]).range([0, height-settings.eventTextHeight-settings.eventIconSize-2*settings.eventMargin]);
          var innerSvg = svg.append("svg:g").attr("class", "trendline").attr("transform", "translate(0,"+height+")");


          // Events
          innerSvg.selectAll(".event").remove();

          var prevEventX = 0;
          var prevEventY = 0;

          trends.forEach(function(trend) {
            var x = xScale(trend.timestamp);
            var y;

            if (trend.event) {
              y = x-prevEventX < settings.eventIconSize ? prevEventY-settings.eventIconSize : height;

              var eventSvg = innerSvg.append("svg:g")
              .attr("class", "event up "+trend.event.type)
              .attr("data-timestamp", trend.timestamp);

              eventSvg.append("svg:line")
              .attr("x1", x)
              .attr("x2", x)
              .attr("y1", 0)
              .attr("y2", -(y-settings.eventTextHeight-settings.eventIconSize-2*settings.eventMargin));

              eventSvg.append("svg:image")
              .attr("x", x-settings.eventIconSize/2)
              .attr("y", -(y-settings.eventTextHeight-settings.eventMargin))
              .attr("width", settings.eventIconSize+"px")
              .attr("height", settings.eventIconSize+"px")
              .attr("xlink:href", "img/trendline-event-icons/"+trend.event.type+".png")
              .on("mouseover", function() {
                highlightEvent(d3.event.target.parentNode);
              })
              .on("mouseout", function() {
                highlightEvent();
              })
              .on("click", function() {
                if (trend.event.type === "Match") {
                  switch (currentPage.type) {
                    case "home":
                    window.location.hash = "home&match="+trend.event.id;
                    break;
                    case "team":
                    case "player":
                    window.location.hash = currentPage.type+"="+currentPage.id+"&match="+trend.event.id;
                    break;
                  }
                }
              });

              eventSvg.append("svg:text")
              .attr("x", x)
              .attr("y", -height)
              .attr("text-anchor", "middle")
              .attr("alignment-baseline", "baseline")
              .text(trend.event.text);

              prevEventX = x;
              prevEventY = y;
            }

          });

          // Adjust text x position to be always visible
          innerSvg.selectAll("text")[0].forEach(function(text) {
            var bbox = text.getBBox();
            if (bbox.x < 0) {
              d3.select(text).attr("x", bbox.width/2);
            } else if (bbox.x + bbox.width > width) {
              d3.select(text).attr("x", width-bbox.width/2);
            }
          });

          //// Generators
          var areaGenerator = d3.svg.area()
          .x(function(d) { return xScale(d.timestamp); })
          .y1(function(d) { return -yScale(d.value); })
          .interpolate("linear");

          var lineGenerator = d3.svg.line()
          .x(function(d) { return xScale(d.timestamp); })
          .y(function(d) { return -yScale(d.value); })
          .interpolate("linear");

          var hitAreaGenerator = d3.svg.area()
          .x(function(d) { return xScale(d.timestamp); })
          .y1(function(d) { return -yScale(d.value)-20; })
          .interpolate("linear");

          //// Area/line
          var area = innerSvg.selectAll("path.area").data([trends]);
          updatePath(area, areaGenerator);

          var line = innerSvg.selectAll("path.line").data([trends]);
          updatePath(line, lineGenerator);

          var hitArea = innerSvg.selectAll("path.hit-area").data([trends]);
          updatePath(area, hitAreaGenerator);

          // Enter
          var newArea = area.enter()
          .append("svg:path")
          .attr("class", "area")
          .attr("fill", settings.fillColor);
          updatePath(newArea, areaGenerator);

          var newLine = line.enter()
          .append("svg:path")
          .attr("class", "line")
          .attr("fill", "transparent")
          .attr("stroke", settings.strokeColor)
          .attr("stroke-width", settings.strokeWidth);
          updatePath(newLine, lineGenerator);

          var marker = innerSvg.append("svg:circle")
          .attr("class", "marker")
          .attr("r", "4")
          .attr("fill", settings.markerColor);

          var newHitArea = hitArea.enter()
          .append("svg:path")
          .attr("class", "hit-area")
          .attr("fill", "transparent");
          updatePath(newHitArea, hitAreaGenerator);

          // Exit
          area.exit().remove(); // TODO check this
          line.exit().remove(); // TODO check this
          hitArea.exit().remove(); // TODO check this


          // Interactivity
          var trendsDict = {};
          trends.forEach(function(trend) {
            var timestamp = getDateRoundedToGranularity(trend.timestamp, granularity);
            trendsDict[timestamp] = trend;
          });

          var timeFormat = d3.time.format("%e %b %y")
          var maxTrend = trends.reduce(function(prevTrend, currentTrend) {
            return !prevTrend || currentTrend.value > prevTrend.value ? currentTrend : prevTrend;
          });

          function setMarker(timestamp) {
            var value = trendsDict[timestamp].value,
                tooltipText = value+" tweets, "+timeFormat(timestamp);
            marker.attr("cx", xScale(timestamp)).attr("cy", -yScale(value));
            d3.select("#trendline-tooltip").html(tooltipText);
            highlightEvent(".event[data-timestamp='"+timestamp+"']");
          }


          newHitArea
          .on("mouseout", function() {
            setMarker(maxTrend.timestamp);
          })
          .on("mousemove", function() {
            var timestamp = getDateRoundedToGranularity(xScale.invert(d3.mouse(d3.event.target)[0]), granularity);
            setMarker(timestamp);
          });

          setMarker(maxTrend.timestamp);
        }

        function updatePath(area, generator) {
          area.transition()
          .duration(settings.animatinoDuration)
          .attr("d", generator);
        }

        function highlightEvent(selector) {
          d3.selectAll(".event").classed("highlighted", false);
          if (selector) {
            d3.select(selector).classed("highlighted", true);
          }
        }

        function getDateRoundedToGranularity(date, granularity) {
          return new Date(Math.round(date.getTime()/granularity)*granularity);
        }

        drawTrendline(d3.select("#g-trendline"), 512, 80, 3600e3, data.trends);

        })();

    });

  });

});

}

function noResultsFound(){
  $("#no-results").show()
};


$(document).ready(function(){
  var entity = 'paulo_bento';
  var day = '2015-01-01';

  $.getJSON('data/entities.json', function(entities_response){
    entities_response.forEach(function(entity){
      $('#entity_select')
         .append($("<option></option>")
         .attr("value", entity['code'])
         .text(entity['name']));
    });

    $('#day').val(day);
    $('#entity_select').val(entity).change();
  });

  $('#entity_select').on('change', function() {
    entity = this.value
    update(entity, day);
  });

  $('#day').on('change', function() {
    day = this.value
    update(entity, day);
  });
});