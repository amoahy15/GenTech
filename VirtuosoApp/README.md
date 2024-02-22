Follow this file strucutre

MyFlaskVueApp/
|-- Dockerfile
|-- docker-compose.yml
|-- app.py (or main.py)
|-- models/
|   |-- __init__.py
|   |-- user.py
|   |-- post.py
|-- routes/
|   |-- __init__.py
|   |-- api.py
|-- templates/
|   |-- index.html
|-- static/
|   |-- css/
|   |-- js/
|   |-- images/
|   |-- dist/ (compiled Vue.js app)
|-- services/
|   |-- aws_s3.py
|-- config.py
|-- .env (for environment variables)
