FROM python:3.9
RUN pip install --upgrade pip
COPY requirements.txt .
COPY . .
CMD ["gunicorn", "myapp.wsgi:application"]
