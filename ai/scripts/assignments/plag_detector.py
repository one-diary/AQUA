import os
import numpy as np
import pandas as pd
import re
import shutil
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.metrics.pairwise import cosine_similarity



def most_similar(doc_id):
    file_contents = []
    docs_list = os.listdir("DUMP")
    for file in docs_list:
        if file.split('.')[-1] == 'txt':
            with open(os.path.join("DUMP", file), "r") as f:
                content = f.read()
            temp_dict = {
                "name": file.split(".")[0],
                "content": content
            }
            file_contents.append(temp_dict)

    documents_df = pd.DataFrame(file_contents)

    stop_words_english=stopwords.words('english')
    # print(documents_df.head())
    documents_df["content"]=documents_df["content"].apply(lambda x: " ".join(re.sub(r'[^a-zA-Z]',' ',w).lower() for w in x.split() if re.sub(r'[^a-zA-Z]',' ',w).lower() not in stop_words_english))

    tfidf = TfidfVectorizer(max_features = 64)
    tfidf.fit(documents_df["content"])

    vectors = tfidf.transform(documents_df["content"])

    similarity_matrix = cosine_similarity(vectors, vectors)

    similar_ix=np.argsort(similarity_matrix[doc_id])[::-1]

    result = []
    # print(similarity_matrix)
    # print("Documents similar to: ", documents_df.iloc[doc_id]['name'])

    for ix in similar_ix:
        if ix==doc_id:
            continue
        # print(documents_df.iloc[ix]["name"], similarity_matrix[doc_id][ix])
        name_sim_dict = {
        "name": documents_df.iloc[ix]['name'],
        "sim_score": str(similarity_matrix[doc_id][ix]*100)
        }
        result.append(name_sim_dict)
    return result


def run_script():
    # ctr = len(os.listdir('DUMP'))
    ctr = 0
    file_list = []
    for file in os.listdir("DUMP"):
        if file.split('.')[-1] == 'txt':
            ctr += 1
            file_list.append(file)
    result_dict = []

    for i in range(ctr):

        temp_dict = {
            "original": file_list[i][:-4],
            "results": most_similar(i)
        }
        result_dict.append(temp_dict)
    
    return result_dict

run_script()