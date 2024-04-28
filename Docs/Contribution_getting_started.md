# Getting Started

* Prerequisites
  * Node.js 14.x^
  * npm
  * Python 3.8^
  * a modern web browser (Chrome, Firefox, etc.)
  * Git
    
* Clone the repository:
    ```bash 
    git clone https://github.com/amoahy15/GenTech.git
    cd VirtuosoApp/backend
    
    
* Starting the backend server (only necessary if working on endpoints directly) :
  * **request access to env file first**
  ```bash
  cd VirtuosoApp/backend
  pip install -r requirements.txt
  flask run -p 8000
  
  
* Starting the frontend server:
  * All the frontend requests to the backend are set to send via the env variable REACT_APP_API_BASE_URL to our hosted backend, so create a .env file
  that includes "REACT_APP_API_BASE_URL='https://virtuoso-419315.ue.r.appspot.com/api'" in VirtuosoApp/Frontend
  ```bash
  npm install react-router-dom@5.3.0 (in the virtuosoApp directory)
  npm start
  * Now you may access the local application at http://localhost:3000
  
* You should now be set up to contribute to this repository! For any questions, email gentech.emory@gmail.com
