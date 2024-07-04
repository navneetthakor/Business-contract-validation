# Business-contract-validation

## Team Namme : BVM Mavericks

## Project Title : Business Contract Validation

## Team Members : Ronak Vekariya, Rohanshu Banodha, Navneetkumar Thakor

### Idea:

- ◦ The user logs into our website and uploads the contract to be parsed along with the template for comparison.
- ◦ They can either upload a previous contract as a template from the same company the current contract is associated with, or use a standard template to identify deviations.  
- ◦ Once both the contract and template are uploaded, they are stored in cloud storage. We have used Cloudinary for storing the images of user and all their contracts as it provides secure urls which are not vulnerable to data leak. The contract is then parsed, with text and entities extracted from it.  
- ◦ The contract and template urls are then passed on to Django Backend from where they both are downloaded and kept temporarily in the storage.  
- ◦ The first component PDF Parser is now used. It parses the pdf to extract texts from it. Both the contract and template is passed to this component, giving us the extracted text of both.  
- ◦ Then extraction of entities happen. A Name Entity Recognition (NER) model is used to extract out entities present in the contract such as People involved, Organizations involved, Monetary details, Contract duration, etc. are extracted. This module helps to determine the key entities involved in the agreement.  
- ◦ The third component is Text Classification. Firstly, clauses are extracted from both contract and template. Using Levenshtein distance, the semantics of clauses are used to compare the clauses present in both the pdfs. After the clauses have been determined, the sub-clauses are then classified into their respective clauses.  
- ◦ Now, the data gathered after classifying the sub-clauses are then sent to a LLM which compares the data of contract and template and generate textual result of deviations which are present.  
- ◦ The deviations are then highlighted and the highlighted pdf is again stored at the cloud service provider and the secure link is obtained.  
- ◦ Finally, a summary is provided to the user, detailing the deviations and extracted entities.  
- ◦ Thus from Django side, entities recognized, deviations detected, summary and the url of highlighted pdf is sent to the NodeJS Backend which sends the response back to the React Frontend to the user.  
- ◦ The user can view the contents delivered to him and also can download the contract and the highlighted contract for future use.  
  

### Note : You may encounter errors while finding deviations. It depends on the API-KEY you use. The current API-KEY is of free plan and thus may lead to some missing deviations. A paid API-KEY will perform more efficiently.

# Steps to run:

### Head to Node backend and start the server.

```bash
$ cd /L5_Backend/Node
$ npm install
$ npm index
```

### Head to Django backend and start the server.

```bash
$ cd /L5_Backend/Django
$ pip install -r requirements.txt
$ python manage.py runserver
```


### Head to React frontend and start the development server.

```bash
$ cd /L6_Frontend/
$ npm install
$ npm run start
```

# Thank You !!!


