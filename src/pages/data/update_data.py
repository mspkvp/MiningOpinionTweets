#! /usr/bin/python
#
'''
Version     :    0.1
Author      :    Arian Pasquali
Summary     :    This program loads tweets from file
'''

import csv,os, sys, urllib,urllib2, datetime,requests,json,solr,time
from datetime import date
from json import loads
from urllib2 import urlopen
from optparse import OptionParser
from pprint import pprint

comments_processed_json = "comments_processed.json"
topics_processed_json = "topics_processed.json"
trends_json = "trends_processed.json"

fcomments = open(comments_processed_json, 'r+')
ftopics = open(topics_processed_json, 'r+')
ftrends = open(trends_json, 'r+')

f = open('data.js', 'w')
f.write('{')
f.write('\"topics\":')
f.write(ftopics.read())
f.write(',')
f.write('\"comments\":')
f.write(fcomments.read())
f.write(',')
f.write('\"trends\":')
f.write(ftrends.read())
f.write('}')

fcomments.close()
ftopics.close()
ftrends.close()
f.close()