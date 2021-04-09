import wiki_scraper
import neural_question_generator

QG = neural_question_generator.pipeline()
content = wiki_scraper.main("photosynthesis")
# print(content)
print(QG(content))