<p float="left">

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) 
[![forthebadge](https://forthebadge.com/images/badges/made-with-python.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/uses-js.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)
</p>

<!-- PROJECT LOGO -->
<br/>
<p align="center">
  <a href="https://github.com/radioactive11/AQUA">
    <img src="STATIC/header.svg" alt="Logo" width="420" height="420">

    
  </a>

  <h1 align="center">Project AQUA</h1>

  <p align="center">
    <strong>A</strong>ssignment <strong>Q</strong>uizzes <strong>U</strong>tility <strong>A</strong>pplication
    <br />
    <a href="https://aqua-client.vercel.app/h"><strong>Visit the website »</strong></a>
    <br />
    <br />
    <a href="https://aqua-client.vercel.app/">View Demo</a>
    ·
    <a href="https://github.com/radioactive11/AQUA/issues">Report Bug</a>
    ·
    <a href="https://github.com/radioactive11/AQUA/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Question Generator](#Question-Generator)
  * [Plagiarism Detector](#plagiarism-detector)
  * [Keyword Checker](#keyword-checker)
  * [Handwriting to Text](#handwriting-to-text-conversion)
  * [Anti Burden System](#anti-burden-system)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Product Screenshots](#Product-Screenshots)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [Contact](#contact)




<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](http://aqua-app.now.sh/)



Project **AQUA** is a **Digital Evaluation Platform** which leverages the power of leading-edge frameworks paired with state of the art artificial intelligence algorithms to provide an seamless and organized experience both for educators and students alike. 

<br/>

:woman_teacher: **We provide the following services**: 

:robot: AI powered Question Generator

:nerd_face: Plagiarism Checker

:bookmark: Notice Board

:cloud: Assignment Upload/Download Portal

:upside_down_face: Anti Burden System



<br />


## Question Generator


Generate quizlets by just entering a keyword, which can be anything ranging from a the name of a famous personality to a concept in astrophysics.

We used *SQuADv1* dataset and and *T5 model* with *highlight* preprocessing format to generate question answer pairs from content scrapped from Wikipedia. This idea is proposed in the ["A Recurrent BERT-based Model for Question Generation"](https://www.aclweb.org/anthology/D19-5821.pdf)


<br />

## Plagiarism Detector
Often, one educator is responsible for evaluating assignments of around 120 students (2 batches of 60 students). In such cases, detecting plagiarism by a human is a up hill task which also requires a lot of time. In order to solve this problem, we thought of computerizing the entire process of plagiarism checking, and yes **it works on handwritten assignments too!**

We used TF-IDF to vectorize the documents and then calculated the cosine similarity between them to check for potential plagiarism.

<br />

## Keyword Checker
As mentioned earlier, checking assignments, specially handwritten ones can become a tedious task. In order to further simplify the lives of teachers, we have come up with an automatic keyword checker which verifies the presence of certain keywords in the assignment. This will if not completely erradicate manual verification, simplify the process of evaluation to a great extent.

We used TF-IDF to vectorize the documents and then calculated the cosine similarity between them to check for potential plagiarism.

<br />

## Handwriting to Text Conversion

Thanks to Azure's Cognitive Services OCR, we were able to implement a blazing fast and accurate OCR into our application without having to find a reliable dataset and train a CNN model from scratch. 

<br />

## Anti Burden System

Often, we students are bombarded with clashing deadlines which not only causes increased level of stress but also leads to malpractices like plagiarism. To overcome this problem, we have designed a simple solution in which there needs to be a gap of atleast 24 hours between two deadlines, thus giving students enough time to comlplete their work.

<br />
<br />

## Built With

</br>
<p float = "left">

<img alt="TF" src="https://img.shields.io/badge/Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white"/>

<img alt="PyTorch" src="https://img.shields.io/badge/Pytorch-D00000?style=for-the-badge&logo=pytorch&logoColor=white"/>

<img alt="SkL" src="https://img.shields.io/badge/SciKit%20Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white"/>

<img alt="SkL" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongoDB&logoColor=white"/>

<img alt="SkL" src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white"/>

<img alt="SkL" src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>

<img alt="SkL" src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>

<img alt="SkL" src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white"/>

<img alt="SkL" src="https://img.shields.io/badge/nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>

</p>


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* Node.js
* Python 3.7+


### Installation 

<br />

### Flask API
<br />

1. Clone the repo 
```sh
git clone https://github.com/radioactive11/AQUA
```


2. Create a Python 3 virtual environment (inside ai directory)
```sh
cd ai
python3 -m venv venv
source venv/bin/activate
```

3. Install requirements
```sh
pip install -r requirements.txt
```

4. Download Sentence Tokenizer
```sh
python -m nltk.downloader punkt
```

5. Make a ```secret.py``` file to hold API Keys
```python
AZURE_STORAGE_CONNECTION_STRING = <CONNECTION STRING>
API_KEY = <API KEY>
ENDPOINT = <ENDPOINT>
```

Refer to these pages on how to get [Azure Storage](https://docs.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string#:~:text=You%20can%20find%20your%20storage,primary%20and%20secondary%20access%20keys.) and [Cognitive Services](https://docs.microsoft.com/en-us/azure/cognitive-services/what-are-cognitive-services#:~:text=and%20spell%20checking.-,Get%20started%20with%20Cognitive%20Services,Azure%20SDK%20client%20libraries) API Keys

</br>
5. Start Flask server

```sh
python app.py
```


<br />

### Node & React 

<br />

1. Clone the repo 
```sh
git clone https://github.com/radioactive11/AQUA
```

2. Install requirements (server)
```sh
cd server
npm install
```

3. Start Node server (by default at `localhost:5000`)
```sh
npm run dev
```

4. Install requirements (client)
```sh
cd ../client
npm install
```

5. Start React server (by default at `localhost:3000`)
```sh
npm start
```

<br />

<!-- USAGE EXAMPLES -->
## Flowchart


<img src = "STATIC/AQUA Assignment.png">

<img src = "STATIC/deadline.png">

## Product Screenshots

<img src = "STATIC/Login.png">

<img src = "STATIC/Dash.png">

<img src = "STATIC/quiz.png">

<img src = "STATIC/upload.png">

<img src = "STATIC/005.png">

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/radioactive11/AQUA/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request





<!-- CONTACT -->
## Contact

Arijit Roy - [GitHub](https://github.com/radioactive11) - roy.arijit2001@gmail.com

Kartik Goel - [GitHub](https://github.com/kg-kartik) - goel.kartik39@gmail.com

Aman Kumar Jagdev - [GitHub](https://github.com/Boidushya) - amankumarjagdev@gmail.com

Aditya Yadav - [GitHub](https://github.com/aditya635) - adityayadav635@gmail.com

Boidushya Bhattacharyay - [GitHub](https://github.com/boidushya) - boidushyabhattacharya@gmail.com

Website: [https://aqua-client.vercel.app/](https://aqua-client.vercel.app/)


<img src = "https://imgs.xkcd.com/comics/students.png">


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/radiaoctive11/HealthBridge.svg?style=flat-square
[contributors-url]: https://github.com/radioactive11/AQUA/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/radiaoctive11/HealthBridge.svg?style=flat-square
[forks-url]: https://github.com/radioactive11/AQUA/network/members
[stars-shield]: https://img.shields.io/github/stars/radiaoctive11/HealthBridge.svg?style=flat-square
[stars-url]: https://github.com/radioactive11/AQUA/stargazers
[issues-shield]: https://img.shields.io/github/issues/radiaoctive11/HealthBridge.svg?style=flat-square
[issues-url]: https://github.com/radioactive11/AQUA/issues
[license-shield]: https://img.shields.io/github/license/radiaoctive11/HealthBridge.svg?style=flat-square
[license-url]: https://github.com/radioactive11/AQUA/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: STATIC/Landing.png

[node-js]: "https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"
