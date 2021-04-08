import os
import pandas as pd
import numpy as np
import re
import shutil

from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.metrics.pairwise import cosine_similarity


def most_similar(doc_id, docs_list):
    file_contents = []
    # docs_list = os.listdir("DUMP")
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
    documents_df["content"]=documents_df["content"].apply(lambda x: " ".join(re.sub(r'[^a-zA-Z]',' ',w).lower() for w in x.split() if re.sub(r'[^a-zA-Z]',' ',w).lower() not in stop_words_english))

    tfidf = TfidfVectorizer(max_features = 64)
    tfidf.fit(documents_df["content"])

    vectors = tfidf.transform(documents_df["content"])

    similarity_matrix = cosine_similarity(vectors, vectors)
    similar_ix=np.argsort(similarity_matrix[doc_id])[::-1]

    result = []
    
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



def main():
    dump_list = os.listdir("DUMP")    
    text_files = []

    for file in dump_list:
        if file.split('.')[-1] == 'txt':
            text_files.append(file)
    
    result_dict = []
    
    for ctr, file in enumerate(text_files):
        temp_dict = {
            "original": file.replace(".txt", ""),
            "results": most_similar(ctr, text_files)
        }
        result_dict.append(temp_dict)
        
    return result_dict
    
    
    
if __name__ == "__main__":
    results = main()
    print(results)
    