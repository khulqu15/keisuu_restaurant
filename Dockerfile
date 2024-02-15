FROM python:3.9
RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install gunicorn
COPY . .
CMD ["gunicorn", "order.wsgi:application"]