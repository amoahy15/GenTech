# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container to /backend
WORKDIR /backend

# Copy the current directory contents into the container at /backend
COPY . /backend

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5001

# Define environment variable to inform the code about the running environment
ENV FLASK_ENV=production

# Run app.py when the container launches
CMD ["python", "app.py"]
