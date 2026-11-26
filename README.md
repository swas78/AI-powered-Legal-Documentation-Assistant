# Nyay Saathi (न्याय साथी) ⚖️
### AI-Powered Legal Documentation Assistant

[![React Native](https://img.shields.io/badge/React%20Native-v0.88-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2058-black.svg)](https://expo.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Clear, legally sound documentation in plain words. Simple, fast, privacy-first, and 100% offline for India.**

Nyay Saathi is a mobile application built with **React Native** and **Expo**. It empowers tenants, landlords, freelancers, and small business owners in India to easily draft, understand, and export standard legal contracts (Rent Agreements, NDAs, and Freelance Contracts) through an intuitive step-by-step form wizard.

---

## 🚀 Key Features

* 📜 **Plain Words vs. Formal Legal Toggle**: Switch with one tap between plain, understandable language and formal court-ready covenants.
* ⚠️ **Indian Legal Compliance Warnings**:
  * **Section 17, Registration Act 1908**: Automatically flags leases exceeding 11 months requiring compulsory registration at the Sub-Registrar's office.
  * **Model Tenancy Act**: Flags excessive security deposit demands exceeding recommended limits.
  * **Section 27, Indian Contract Act 1872**: Alerts on lengthy NDAs that could be deemed unreasonable restraint of trade.
* 🔒 **100% Offline-First & Private**: No cloud database or third-party servers storing private contracts. All drafts persist securely on the user's phone using `AsyncStorage`.
* 📄 **Native PDF Export & Print**: Compiles clean A4 legal documents with signature blocks and witness sections via `expo-print` and `expo-sharing`.
* 🇮🇳 **Bilingual Support (English & Hindi)**: Instant interface and document translation powered by `i18next`.
* 🛡️ **Free Legal Aid (NALSA & DLSA)**: One-tap dialer for the **15100 NALSA National Free Legal Helpline** and District Legal Services Authorities front offices.

---

## 📂 Project Architecture

```
AI-powered-Legal-Documentation-Assistant/
├── App.js                   # Application entry & stack navigation
├── app.json                 # Expo project configuration
├── package.json             # Dependencies and scripts
├── VIVA_GUIDE.md            # Comprehensive Viva presentation & examiner guide
├── docs/                    # Specifications (PRD, TRD, design specs)
│   ├── PRD.md
│   ├── TRD.md
│   └── design.md
├── assets/                  # Icons, splash screens, and images
└── src/
    ├── theme.js             # Tactile control panel design tokens
    ├── locales/             # Localization resources (en.json, hi.json, i18n.js)
    ├── templates/           # Offline agreement templates & rule engines
    │   ├── rent.json        # Residential Rent Agreement
    │   ├── nda.json         # Non-Disclosure Agreement
    │   ├── freelance.json   # Freelance Service Contract
    │   └── index.js         # Interpolation engine & legal warning checks
    ├── components/          # Reusable tactile UI components
    │   ├── TactileButton.js # Large 56px buttons with haptics
    │   ├── StatusLight.js   # Glowing status indicator lights
    │   ├── ProgressStrip.js # Multi-step form progress dots
    │   ├── DocCard.js       # Agreement selection cards
    │   ├── WarningCard.js   # Amber compliance alert cards
    │   └── PlainLegalToggle.js # Two-segment switch (Plain / Legal)
    ├── screens/             # Application screens
    │   ├── HomeScreen.js    # Document picker & language switch
    │   ├── FormScreen.js    # One-question-at-a-time form wizard
    │   ├── DraftScreen.js   # Interactive draft viewer & warnings
    │   ├── ShareScreen.js   # Export PDF, WhatsApp share, & Print
    │   └── HelpScreen.js    # NALSA 15100 helpline & DLSA portal
    └── services/            # Storage and document export services
        ├── storage.js       # AsyncStorage local persistence
        └── pdfGenerator.js  # HTML-to-PDF compiler & sharing
```

---

## 🛠️ Quick Start & Running the Project

### Prerequisites
- Node.js (v18 or newer)
- npm or yarn
- Mobile phone with the free **Expo Go** app ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) or [iOS](https://apps.apple.com/app/expo-go/id982107779))

### Installation & Launch

```bash
# Clone the repository
git clone https://github.com/swas78/AI-powered-Legal-Documentation-Assistant.git
cd AI-powered-Legal-Documentation-Assistant

# Install dependencies
npm install

# Start the Expo development server
npm start
```

### Preview Options
- **Mobile (Recommended)**: Scan the QR code displayed in the terminal using the **Expo Go** app on your phone.
- **Web Browser**: Press `w` in the terminal (or run `npm run web`).
- **Android Emulator**: Press `a` in the terminal (or run `npm run android`).
- **iOS Simulator**: Press `i` in the terminal (macOS only, or run `npm run ios`).

---

## 🎓 Preparing for Viva Presentation?
Refer to [VIVA_GUIDE.md](file:///Users/swastikmishra1425/Desktop/AI-legal%20Assistance/VIVA_GUIDE.md) for:
- 30-Second Elevator Pitch
- Indian Legal Background & Statutes
- Answers to Top 10 Viva Questions
- 2-Minute Live Demo Step-by-Step Script

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
