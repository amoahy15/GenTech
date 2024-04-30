# Backend Overview

The `app.py` file serves as the entry point for the VirtuosoApp Flask application. The application is configured to run with environment-specific variables for connecting to MongoDB and AWS S3. These variables are managed using a `.env` file.

## Requirements

* A [`.env` file](#environment-variables-configuration) must exist in the project root with necessary environment variables.
* The Flask and associated environments must be correctly configured for development.
* MongoDB connection via `MONGODB_URI` and `MONGODB_DATABASE` for data management.
* AWS S3 configuration for storage through `FLASK_S3_PORT`.

## Environment Variables Configuration

The following environment variables are required:

* `FLASK_APP=app.py` - Specifies the Flask application to run.
* `FLASK_ENV=development` - Sets the environment type for Flask.
* `FLASK_RUN_PORT` - Defines the port on which Flask will run. 
* `FLASK_S3_PORT` - Specifies the port for AWS S3 connections.
* `MONGODB_URI` - Provides the URI for connecting to MongoDB. Must put in your own URI
* `MONGODB_DATABASE='GenTech'` - Sets the MongoDB database name.

These variables must be set in a `.env` file located at the project root. The `database.py` uses `os.getenv` to load these variables, ensuring a secure and configurable setup.

## Development Environment

1. **Create a Virtual Environment:**
   - Navigate to the project directory.
   - Run `python3 -m venv venv` to create a virtual environment named `venv`.

2. **Activate the Virtual Environment:**
   - On Windows: `venv\Scripts\activate.bat`
   - On Unix or MacOS: `source venv/bin/activate`

3. **Install Required Packages:**
   - Ensure the `requirements.txt` file is present in the backend directory.
   - Run `pip install -r requirements.txt` to install the necessary packages.

4. **Configure the .env File:**
   - Create a `.env` file in the backend directory.
   - Add the required environment variables with your specific configuration values.

5. **Running the Flask Application:**
   - Ensure you are in the project backend directory.
   - Execute `flask run` to start the application. Flask will automatically load the configuration from the `.env` file.
  
## Links 
   * [Artwork Management](https://github.com/amoahy15/GenTech/blob/main/Docs/Backend%20docs/API/Artwork_managment_doc.md)
   * [Review Management](https://github.com/amoahy15/GenTech/blob/main/Docs/Backend%20docs/API/Review_managment_doc.md)
   * [User Management](https://github.com/amoahy15/GenTech/blob/main/Docs/Backend%20docs/API/User_management_doc.md)
   * [Annotation Management](https://github.com/amoahy15/GenTech/blob/main/Docs/Backend%20docs/API/Annotation_management.md)
   * [s3 Management]()
   * [email Management]()
