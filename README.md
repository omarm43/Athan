🕌 Athan – Muslim Prayer Times App (Work In Progress)
Athan is a lightweight mobile app built with React Native and Expo that shows daily Muslim prayer times based on your real-time location. It fetches data from the Aladhan API and supports pull-to-refresh, both Gregorian and Hijri calendars, and 12-hour formatting.

📱 Features
📍 Auto-detects location to display prayer times
🕰️ Fajr, Dhuhr, Asr, Maghrib, Isha + Sunrise
🔁 Pull-to-refresh to update times and location
📆 Shows both Gregorian and Hijri dates
⏱ Converts times to 12-hour AM/PM format

⚡ Built using Expo Router for fast routing and navigation

🧰 Tech Stack
React Native (via Expo)
Expo Router for file-based navigation
expo-location for GPS access
Aladhan API for prayer time data
TypeScript for static typing
Jest for testing

🛠️ Installation
bash
Copy
Edit
git clone https://github.com/your-username/athan.git
cd athan
npm install
npx expo start

You can also run it on:
Android: npm run android
iOS: npm run ios
Web: npm run web

🔐 Permissions
This app requests the following permission:
Location: To determine current coordinates for accurate prayer times.

🔮 To-Do
⏰ Local notifications for each prayer
⚙️ Customizable calculation methods (ISNA, MWL, Umm al-Qura)
🌙 Dark mode theme
🌐 Manual city search & offline support

📄 License
MIT © Omar Mostafiz

