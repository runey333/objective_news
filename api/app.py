from flask import Flask
from flask import request, jsonify

import article_getter
from article_getter import driver_get_articles, make_html, driver_get_articles_dict

app = Flask(__name__)

#TODO: Add source and date of article
@app.route("/getArticles/<keyword>", methods=['GET'])
def process_keyword(keyword):
	if request.method == "GET":
		if keyword:
			articles = driver_get_articles_dict(keyword)
		else:
			articles = {'resp': '<p>Articles Not Found</p>'}

		return articles

def get_all_articles(keyword):
	articles = driver_get_articles(keyword)
	return make_html(articles)

#if __name__ == "__main__":
#    app.run(host="127.0.0.1", port=5000, debug=True)
#app.run(debug=True)
