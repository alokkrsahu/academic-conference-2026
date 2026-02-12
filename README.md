
# Academic Conference 2026

A full-stack web application for an academic conference built with Django (REST Framework) and React.

## Quick Start (Docker)
1. Ensure you have Docker and Docker Compose installed.
2. Run `docker-compose up --build`.
3. The frontend will be at `http://localhost:3000` and the backend at `http://localhost:8000`.

## Manual Setup

### Backend (Django)
1. `cd backend`
2. `python -m venv venv && source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
3. `pip install -r requirements.txt`
4. `python manage.py migrate`
5. `python manage.py loaddata conference/fixtures/sample_data.json`
6. `python manage.py createsuperuser`
7. `python manage.py runserver`

### Frontend (React)
1. `cd frontend`
2. `npm install`
3. `npm start`

## API Endpoints
- `GET /api/event/` - Conference details
- `GET /api/speakers/` - Speaker list
- `GET /api/sessions/` - Schedule details
- `POST /api/registrations/` - Register as an attendee
