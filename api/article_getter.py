import requests
import json
from textblob import TextBlob
import constants
from constants import get_key


def get_articles(keyword, cc="us", lang="en", safeSearch="Off"):
	""" 
	Gets articles based on a keyword using the Bing News API
	"""
	url = "https://bing-news-search1.p.rapidapi.com/news/search"
	querystring = {"q":keyword, "count":"100", "cc":cc, "freshness":"Day", "textFormat":"Raw", "safeSearch":safeSearch}

	headers = {
		'x-bingapis-sdk': "true",
		'accept-language': lang,
    	'x-rapidapi-key': get_key(),
    	'x-rapidapi-host': "bing-news-search1.p.rapidapi.com"
  	}

	response = requests.request("GET", url, headers=headers, params=querystring)
	data = json.loads(response.text)	
	return data["value"]  

def get_subjectivity_score(article):
	""" 
	Gets the subjectivity score of an article in the list returned by get_articles
	"""
	desc = ""

	try:
		desc = article['description']
	except:
		return 1.0
  
	blob = TextBlob(desc)
	subj = blob.sentiment.subjectivity
	return subj
  

def sort_by_objectivity(article_list):
	"""
	Sorts the list of articles from get_articles based on the subjectivity of their descriptions
	"""
	return sorted(article_list, key=get_subjectivity_score)

def driver_get_articles(keyword, num_articles=25, cc="us", lang="en", safeSearch="Off"):
	"""
	End-to-End method for getting and sorting articles
	"""
	articles = get_articles(keyword, cc, lang, safeSearch)
	obj_sorted = sort_by_objectivity(articles)
	return obj_sorted[:num_articles]

def driver_get_articles_dict(keyword, num_articles=25, cc="us", lang="en", safeSearch="Off"):
	"""
	End-to-End method for getting and sorting articles
	"""
	article_list = driver_get_articles(keyword, num_articles=25, cc="us", lang="en", safeSearch="Off");
	article_dict = {}

	for article in article_list:
		article_dict[article["name"]] = article

	return article_dict

def make_html(article_list):
	res = "<!DOCTYPE html>"
	res += "<html>"
	res += "<body>"

	res += "<ul>"
	for article in article_list:
		res += "<li>"
		res += "<a href=\""
		res += article["url"]
		res += "\" target=\"_blank\">{}</a>".format(article["url"])
		res += "</li>"
	res += "</ul>"

	res += "</body>"
	res += "</html>"
	return res

	