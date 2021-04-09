import os


def check_keywords(keywords: list):
    dump_files = os.listdir("DUMP")
    txt_files = []
    results = []
    for file in dump_files:
        if file.split('.')[1] == 'txt':
            txt_files.append(file)    
    
    content = ""
    for file in txt_files:
        temp_dict = {}
        temp_dict['name'] = file.split('.')[0]
        with open(os.path.join("DUMP", file), "r") as f:
            content = f.read()
            
        for word in keywords:
            if word in content:
                temp_dict[word] = "true"
            else:
                temp_dict[word] = "false"

        results.append(temp_dict)
    
    for file in dump_files:
        if file != '.gitignore':
                os.remove(os.path.join("DUMP", file))
    
    
    return results


