# Bayaran

Full-stack attendance and payment management app.

## Local Setup

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## Deployment

- Frontend: Vercel (connect GitHub repo)
- Backend: Render (Django static build + new service)


