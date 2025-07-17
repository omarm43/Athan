# 🕌 Athan – Muslim Prayer Times App (work in progress)

Athan is a mobile app built with React Native and Expo that displays daily Muslim prayer times based on your real-time location. It uses the Aladhan API (https://aladhan.com/prayer-times-api) to fetch accurate timings and displays both Gregorian and Hijri dates.

## 📱 Features

- 📍 Auto-detects location via GPS  
- 🕰️ Displays daily prayer times: Fajr, Sunrise, Dhuhr, Asr, Maghrib, Isha  
- 🔁 Pull-to-refresh for real-time updates  
- 🗓️ Shows both Gregorian and Hijri calendar dates  
- 🕒 Converts times to 12-hour AM/PM format  
- ⚡ Built with Expo Router and TypeScript  

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.x  
- npm ≥ 9.x  
- Expo CLI:  
  npm install -g expo-cli

### Installation

git clone https://github.com/your-username/athan.git  
cd athan  
npm install  
npx expo start

### Run on Device or Simulator

npm run android   # Run on Android  
npm run ios       # Run on iOS  
npm run web       # Run in browser  

## 📂 Project Structure

athan/  
├── app/                   # App screens and routes  
│   └── index.tsx          # Main prayer times screen  
├── scripts/  
│   └── reset-project.js   # Custom cleanup script  
├── package.json  
├── README.md  
└── ...  

## 🔐 Permissions

- **Location** – used to fetch coordinates for calculating prayer times.  
  Make sure location services are enabled on your device.


## 🧭 To-Do

- [ ] Add local notifications for each prayer  
- [ ] Allow manual location input  
- [ ] Add dark mode  
- [ ] Add multiple calculation methods  
- [ ] Offline support with caching  

## 📄 License

MIT License  
© 2025 Your Name

## 🙏 Acknowledgments

- Aladhan API (https://aladhan.com/prayer-times-api)  
- React Native (https://reactnative.dev/)  
- Expo (https://expo.dev/)
