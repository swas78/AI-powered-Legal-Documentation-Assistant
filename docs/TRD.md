# TRD: Nyay Saathi (React Native, simple tech)

## Idea
Keep it small. Documents are templates. AI is only an extra.

## Tech stack
| Part | Tool |
|---|---|
| App | React Native with Expo |
| Navigation | React Navigation |
| Document templates | JSON files inside the app |
| PDF | expo-print |
| Share (WhatsApp etc.) | expo-sharing |
| Saved drafts | AsyncStorage (on the phone) |
| Hindi | i18next |
| Voice input (later) | expo-speech-recognition |
| AI (optional) | Small FastAPI backend that calls the Claude API |
| Database | None |

## How it works
```
User fills form -> app fills JSON template -> Draft screen (plain / legal)
                                                  |
                                    expo-print -> PDF -> Share
(optional) AI box -> FastAPI backend -> Claude API
```
The document part works fully offline. Only the AI box needs internet.

## Template format (JSON)
```json
{
  "title": "Security deposit",
  "plain": "The tenant gives {deposit} as a deposit...",
  "legal": "The Lessee has deposited {deposit} as security...",
  "note": "Keep the payment receipt."
}
```
Each document is a list of clauses like this. Warnings are simple if-checks in code (example: months over 11).

## Folders
```
/app
  /screens     Home.js, Form.js, Draft.js, Share.js, Help.js
  /templates   rent.json, nda.json, freelance.json
  /locales     en.json, hi.json
  App.js
/backend       main.py (only if we add AI)
/docs          PRD.md, TRD.md, RULES.md
```

## Privacy
- No database. Drafts are saved only on the phone.
- The API key is never inside the app. The app calls our backend, and the backend calls Claude.
- If AI is used, remove names and phone numbers before sending.

## Run it
```
npx create-expo-app nyay-saathi
cd nyay-saathi
npx expo install expo-print expo-sharing @react-native-async-storage/async-storage
npm install @react-navigation/native @react-navigation/native-stack i18next react-i18next
npx expo start
```
Scan the QR code with the Expo Go app to open it on a phone.

Build an APK later with: `eas build -p android --profile preview`

## Test
Fill each document with sample data and check: no blanks, warnings show, plain/legal toggle works, PDF opens, WhatsApp share works on a real phone.