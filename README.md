<<<<<<< HEAD
# Securechatapp
=======
# SecureChat

A full-stack, modular, and scalable secure chat and video calling app inspired by Instagram's direct messaging, built with React Native (Expo), Node.js, Express, MongoDB, Socket.io, and WebRTC. Includes robust authentication, real-time chat, video calls, and offline support.

---

## Features

- **Cross-platform Mobile App**: Built with React Native (Expo)
- **Secure User Authentication**: JWT, bcrypt, TLS-ready
- **Real-time Chat**: Socket.io for instant messaging
- **Video Calling**: WebRTC (free alternative to VideoSDK.live)
- **Call Controls**: Mute, end call, etc.
- **Offline Support**: Local storage, P2P fallback for chat/calls
- **Third-party API Integration**: Modular API service
- **Scalable Backend**: Node.js, Express, MongoDB
- **Modular, Clean Codebase**: Organized for maintainability

---

## Architecture Overview

- **Frontend**: React Native (Expo)
- **Backend**: Node.js + Express + MongoDB
- **Real-time Communication**: Socket.io
- **Video Calls**: WebRTC (SimplePeer)
- **Authentication**: JWT + bcrypt
- **Offline**: AsyncStorage, P2P

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm / yarn
- Expo CLI (`npm install -g expo-cli`)
- MongoDB (local or Atlas)

---

### Backend Setup

```bash
cd server
npm install
cp .env.example .env # Edit with your Mongo URI and JWT secret
npm run dev
```

---

### Frontend Setup

```bash
cd SecureChatApp
npm install
expo start
```

---

### Building APK (Expo EAS)

```bash
eas build -p android --profile preview
```

---

## Folder Structure

```
/SecureChatApp     # React Native frontend
/server            # Node.js backend
```

---

## .env Example (Backend)

```
MONGO_URI=mongodb://localhost:27017/securechatapp
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

## Main Packages Used
- React Native (Expo)
- Express
- MongoDB & Mongoose
- Socket.io
- WebRTC (SimplePeer)
- JWT, bcrypt, helmet, cors

---

## License
MIT

---

## Credits
- [VideoSDK.live](https://www.videosdk.live/) (optional)
- [WebRTC](https://webrtc.org/)
- [React Native](https://reactnative.dev/)
- [Socket.io](https://socket.io/)

---

## Contributing
Pull requests welcome! For major changes, please open an issue first to discuss what you would like to change.
>>>>>>> 4721b30 (Initial commit)
