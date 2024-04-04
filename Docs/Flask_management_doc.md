= SPEC-4: Flask Application Setup and Environment Configuration
:sectnums:
:toc:

== Background

The `app.py` file serves as the entry point for the VirtuosoApp Flask application. To ensure a smooth development experience, the application is configured to run with environment-specific variables, which are crucial for connecting to services such as MongoDB and AWS S3. These variables are securely managed using a `.env` file.

== Requirements

* A `.env` file must exist in the project root with necessary environment variables.
* The Flask and associated environments must be correctly configured for development.
* MongoDB connection via `MONGODB_URI` and `MONGODB_DATABASE` for data management.
* AWS S3 configuration for storage through `FLASK_S3_PORT`.

== Method

=== Environment Variables Configuration

The following environment variables are required:

* `FLASK_APP=app.py` - Specifies the Flask application to run.
* `FLASK_ENV=development` - Sets the environment type for Flask.
* `FLASK_RUN_PORT` - Defines the port on which Flask will run. 
* `FLASK_S3_PORT` - Specifies the port for AWS S3 connections.
* `MONGODB_URI` - Provides the URI for connecting to MongoDB. Must put in your own URI
* `MONGODB_DATABASE='GenTech'` - Sets the MongoDB database name.

These variables must be set in a `.env` file located at the project root. The `database.py` utilizes `os.getenv` to load these variables, ensuring a secure and configurable setup.

=== Recreating the Development Environment

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

== Implementation

Following the steps outlined in the "Recreating the Development Environment" section ensures that all necessary dependencies are installed and the Flask application is correctly configured to connect to MongoDB and AWS S3 services. This setup is crucial for both development and testing purposes.

== Milestones

1. Creation and activation of the virtual environment.
2. Successful installation of dependencies from `requirements.txt`.
3. Configuration of the `.env` file with appropriate environment variables.
4. Launch of the Flask application without errors.

== Gathering Results

* Verification that the Flask application runs as expected on the specified port.
* Confirmation of successful connections to MongoDB and AWS S3 services.
* Validation of environment setup through testing of endpoint functionalities.
