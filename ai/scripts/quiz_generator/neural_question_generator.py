from typing import Optional, Dict, Union

from transformers import(
    AutoModelForSeq2SeqLM, 
    AutoTokenizer,
    PreTrainedModel,
    PreTrainedTokenizer,
)

import docx2txt
try:
    from qgpipeline import QuestionGenerator
except:
    from .qgpipeline import QuestionGenerator

def pipeline(
    model: Optional = None,
    tokenizer: Optional[Union[str, PreTrainedTokenizer]] = None,
    qg_format: Optional[str] = "highlight",
    ans_model: Optional = None,
    ans_tokenizer: Optional[Union[str, PreTrainedTokenizer]] = None,
    use_cuda: Optional[bool] = True,
    **kwargs,
):
    
    model = "valhalla/t5-small-qg-hl"
    
    tokenizer = model

    if isinstance(tokenizer, (str, tuple)):
        if isinstance(tokenizer, tuple):
            # For tuple we have (tokenizer name, {kwargs})
            tokenizer = AutoTokenizer.from_pretrained(tokenizer[0], **tokenizer[1])
        else:
            tokenizer = AutoTokenizer.from_pretrained(tokenizer)
    
    # Instantiate model if needed
    if isinstance(model, str):
        model = AutoModelForSeq2SeqLM.from_pretrained(model)
    
    # load default ans model
    ans_model = "valhalla/t5-small-qa-qg-hl"
    ans_tokenizer = AutoTokenizer.from_pretrained(ans_model)
    ans_model = AutoModelForSeq2SeqLM.from_pretrained(ans_model)

    
    # Instantiate tokenizer if needed
    if isinstance(ans_tokenizer, (str, tuple)):
        if isinstance(ans_tokenizer, tuple):
            # For tuple we have (tokenizer name, {kwargs})
            ans_tokenizer = AutoTokenizer.from_pretrained(ans_tokenizer[0], **ans_tokenizer[1])
        else:
            ans_tokenizer = AutoTokenizer.from_pretrained(ans_tokenizer)

    if isinstance(ans_model, str):
        ans_model = AutoModelForSeq2SeqLM.from_pretrained(ans_model)
    
    return QuestionGenerator(model=model, tokenizer=tokenizer, ans_model=ans_model, ans_tokenizer=ans_tokenizer, qg_format=qg_format, use_cuda=use_cuda)
