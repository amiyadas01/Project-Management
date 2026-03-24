# How to Run This Project

Okay so this project has 2 folders:

frontend/  
backend/  

You need to run both 👍

---

## First — MongoDB Atlas (Important)

You’ll need a MongoDB connection string.

If you already have Atlas → just copy it  
If not → create a free cluster (takes 2–3 mins)

Connection string looks like this:

mongodb+srv://username:password@cluster.mongodb.net/dbname

---

## Backend Setup

Go inside backend:

cd backend  
npm install  

Now create a `.env` file (there is already `.env.example`):

cp .env.example .env  

Open `.env` and just add your values:

PORT=5000  
MONGO_URI=your_atlas_connection_string  
JWT_SECRET=anything_random  

Now run backend:

npm run dev  

If everything is correct, backend will start + DB will connect 👍

---

## Frontend Setup

Open another terminal:

cd frontend  
npm install  
npm run dev

App should open in browser automatically.

---

## Done 🎉

- frontend running  
- backend running  
- mongodb connected  

Just use the app 👍

---

## If something breaks 😅

MongoDB not connecting → check MONGO_URI + whitelist your IP in Atlas  

Port already in use → change PORT in `.env`  

Make sure both frontend and backend are running at the same time  