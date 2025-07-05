# Netflix2o 🎬

Check it Out! [Netflix2o](https://netflix2o-14982.web.app/)


A modern Netflix clone built with React, Firebase, and Stripe. Users can sign up, log in, subscribe to different plans, and stream content (mock UI) based on their subscription.

## 🚀 Features

- 🔐 **User Authentication** (Firebase Auth)
- 💳 **Subscription Plans** with **Stripe**
- 🔥 **Real-time Firestore Integration**
- 🧾 View and manage **active subscriptions**
- ⚡ Responsive UI with dynamic plan selection

## 🖥️ Tech Stack

- **React** (Frontend)
- **Firebase** (Authentication + Firestore)
- **Stripe** (Payment gateway)
- **Redux** (State management)
- **React Router** (Routing)
- **TypeScript** (Static typing)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PranavTrip/Netflix2o.git
   cd Netflix2o

2. **Install Dependencies**
    ```bash
    npm install

## 🔧 Set up Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)

2. Create a new project

3. Enable **Email/Password Authentication** in the **Authentication** section

4. Create a **Firestore Database**

5. Set the following **Firestore security rules**:

   ```js
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /customers/{userId} {
         allow read, write: if request.auth.uid == userId;

         match /subscriptions/{subId} {
           allow read: if request.auth.uid == userId;
         }

         match /checkout_sessions/{sessionId} {
           allow read, write: if request.auth.uid == userId;
         }
       }
     }
   }

## 🔧 Set up .env file
1. Create a .env file in the root of your project and add the following:
      ```env
      VITE_FIREBASE_API_KEY=your_key
      VITE_FIREBASE_AUTH_DOMAIN=your_domain
      VITE_FIREBASE_PROJECT_ID=your_project_id
      VITE_FIREBASE_STORAGE_BUCKET=your_bucket
      VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
      VITE_FIREBASE_APP_ID=your_app_id
      VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key

## Start the app

```bash 
    npm run dev
