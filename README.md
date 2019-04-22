# letterboxd-for-games
A [letterboxd](https://letterboxd.com) for video games.

## Development
The app is built upon React powered by a Django Rest Framework API.

### Setup

* Obtain your key from [IGDB](https://api.igdb.com/) and paste it in the `.env` file:

```
cp .env.default .env
```

* Set up the backend:

```bash
cd backend/
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

* Set up the frontend: 

```bash
cd frontend/
npm install
npm start
```

## Acknowledgements
Data from the [IGDB API](https://igdb.com).