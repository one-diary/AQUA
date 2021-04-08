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
        
        handw_txt.convert_txt(subject, topic)
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


class UploadQuestion(Resource):
    def post(self):
        app.logger.info("Upload Question hit") # log
        app.logger.info(request.get_json()) # log
        print(request.form) # log
        subject = request.form.get('subject')
        doc = request.files['doc']
        fname = doc.filename
        
        DIR = os.path.join(os.getcwd(), "DUMP")
        LOCAL_PATH = os.path.join(DIR, fname)
        ASSIGNMENT_NAME = fname.split('.')[0]
        REMOTE_FILE_DIR = 'assignments/{dir_name}/question/'.format(dir_name=ASSIGNMENT_NAME) + fname
        doc.save(LOCAL_PATH)
        doc_url = upload_file(subject, LOCAL_PATH, REMOTE_FILE_DIR)
        
        files = os.listdir(os.path.join(os.getcwd(), "DUMP"))
        for file in files:
            if file != '.gitignore':
                os.remove(os.path.join("DUMP", file))
        
        return jsonify({"url": doc_url})
    
api.add_resource(UploadQuestion, '/assignment/upload/question')


class UploadAnswer(Resource):
    def post(self):
        subject = request.form.get('subject')
        tag = request.form.get('tag')
        doc = request.files['doc']
        fname = doc.filename
        
        LOCAL_FILE_DIR = os.path.join("DUMP", fname)
        REMOTE_FILE_DIR = 'assignments/{atag}/answer/'.format(atag=tag) + fname
        
        doc.save(LOCAL_FILE_DIR)
        doc_url = upload_file(subject, LOCAL_FILE_DIR, REMOTE_FILE_DIR)
        
        files = os.listdir(os.path.join(os.getcwd(), "DUMP"))
        for file in files:
            if file != '.gitignore':
                os.remove(os.path.join("DUMP", file))
        

        return jsonify({"url": doc_url})

api.add_resource(UploadAnswer, '/assignment/upload/answer')



if __name__ == "__main__":
    app.run(debug=True)