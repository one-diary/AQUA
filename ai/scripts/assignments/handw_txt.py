import os
import time
from . import azure_blob_utils
from . import plag
from . import ocr


def convert_txt(subject: str, tag: str):
    URLS = azure_blob_utils.get_file_url(subject, tag)
    for file in URLS:
        filename = file.split('/')[-1]
        loc_id = ocr.get_operation_id(file)
                
        time.sleep(5)    
        
        content = ocr.run_ocr(loc_id)

        ocr.save_file(filename, content=content)
    
    
def run_plag_detection():
    results = plag.main()
    dump_files = os.listdir("DUMP")
    
    for file in dump_files:
        if file != '.gitignore':
                os.remove(os.path.join("DUMP", file))
                
    return results
    

