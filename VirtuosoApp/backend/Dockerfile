# Use an official Python runtime as a parent image
FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# ARG declarations for build-time environment variables
ARG FLASK_S3_PORT
ARG MONGODB_URI
ARG MONGODB_DATABASE
ARG JWT_SECRET_KEY
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG S3_BUCKET_NAME
ARG AWS_DEFAULT_REGION

# ENV declarations to set the runtime environment variables
ENV FLASK_S3_PORT=$FLASK_S3_PORT \
    MONGODB_URI=$MONGODB_URI \
    MONGODB_DATABASE=$MONGODB_DATABASE \
    JWT_SECRET_KEY=$JWT_SECRET_KEY \
    AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
    AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
    S3_BUCKET_NAME=$S3_BUCKET_NAME \
    AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5100

# Run app.py when the container launches using Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5100", "app:app"]
