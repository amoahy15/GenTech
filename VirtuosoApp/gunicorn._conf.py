# gunicorn.conf.py

# Bind to 0.0.0.0 to make the server accessible externally
bind = '0.0.0.0:5000'

# Number of worker processes
workers = 2

# Number of threads per worker
threads = 2

# Log file configurations
accesslog = '-'
errorlog = '-'
