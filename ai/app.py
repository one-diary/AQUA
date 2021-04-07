from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS, cross_origin
import logging
import os

from scripts.assignments import handw_txt
from scripts.quiz_generator import neural_question_generator
from scripts.quiz_generator import wiki_scraper

app = Flask(__name__)

app.config["CORS_SUPPORTS_CREDENTIALS"] = True
CORS(app, resources={r"*": {"origins": "*"}}, allow_headers="*", origin="*")


api = Api(app)


class Plagiarism(Resource):
    def post(self):
        subject = request.json['subject']
        topic = request.json['topic']
        
        # handw_txt.convert_txt(subject, topic)
        res = handw_txt.run_plag_detection()

        return jsonify(res)

api.add_resource(Plagiarism, '/plag')


class QuizGenerator(Resource):
    def post(self):
        keyword = request.json['keyword']
        QG = neural_question_generator.pipeline()
        content = wiki_scraper.main(keyword)
        
        return jsonify(QG(content))
        
api.add_resource(QuizGenerator, '/quiz')


if __name__ == "__main__":
    app.run(debug=True)