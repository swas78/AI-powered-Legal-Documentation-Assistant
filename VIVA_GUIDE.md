# 🎓 Nyay Saathi — Faculty Viva & Presentation Guide

This guide is designed to help you confidently present **Nyay Saathi** to your faculty/examiners during your project viva. It covers project motivation, architecture, key code highlights, a 2-minute demo script, and answers to common examiner questions.

---

## 1. Project Overview in 30 Seconds (Elevator Pitch)
> *"Nyay Saathi is an offline-first mobile application built with React Native and Expo that democratizes legal documentation in India. Most tenants, landlords, freelancers, and small business owners sign contracts they do not understand because of high legal fees and complex legalese. Nyay Saathi lets users answer a simple step-by-step questionnaire to generate legally sound agreements in **plain, everyday language**, with a one-tap toggle to view the formal legal phrasing, real-time Indian compliance warnings (like the 11-month lease registration rule), and instant export to PDF or WhatsApp."*

---

## 2. Key Problem Solved & Indian Legal Context
In India:
1. **The 11-Month Lease Rule (Section 17, Registration Act 1908)**: Leases exceeding 11 months must be compulsorily registered with the Sub-Registrar and stamped. Many people sign 1-year or 2-year unregistered agreements, making them legally invalid in court. Our app actively detects this and alerts the user!
2. **Exorbitant Security Deposits (Model Tenancy Act)**: Landlords often demand 6–10 months of deposit. The Model Tenancy Act recommends capping residential deposits at 2 months' rent.
3. **Restraint of Trade (Section 27, Indian Contract Act 1872)**: Overly long NDAs (>5 years) can be considered void in Indian courts as restraint of lawful trade.
4. **Digital Divide & Privacy**: Many citizens do not want to upload sensitive personal agreements to external cloud servers. Our app is **100% offline-first**; all drafts remain on the phone using device storage.

---

## 3. System Architecture & Tech Stack

```
                +---------------------------------------+
                |          React Native UI              |
                |   (Tactile Buttons, Glow Lights)      |
                +-------------------+-------------------+
                                    |
          +-------------------------+-------------------------+
          |                         |                         |
          v                         v                         v
+-------------------+     +-------------------+     +-------------------+
|  Question Wizard  |     |   Clause Engine   |     |    Legal Rules    |
|   (FormScreen)    |     | (Plain vs Legal)  |     |  (Warning Checks) |
+---------+---------+     +---------+---------+     +---------+---------+
          |                         |                         |
          +-------------------------+-------------------------+
                                    |
                +-------------------+-------------------+
                |                                       |
                v                                       v
      +-------------------+                   +-------------------+
      | Local Persistence |                   |   Export Engine   |
      |  (AsyncStorage)   |                   | (expo-print / PDF)|
      +-------------------+                   +-------------------+
```

| Layer | Technology | Why Chosen? |
|---|---|---|
| **Framework** | React Native (Expo SDK 58) | Single cross-platform codebase for Android, iOS, and Web. |
| **Navigation** | `@react-navigation/native-stack` | Native 60 FPS transitions between screens. |
| **Styling & Design** | Tactile Control System (`theme.js`) | Minimalist, retro-modern interface with 56px touch targets and haptics. |
| **Document Engine** | JSON Templates + Dynamic Interpolation | 100% offline, zero server latency, zero cloud API costs. |
| **PDF Generation** | `expo-print` + `expo-sharing` | Converts clean semantic HTML into formatted A4 PDFs natively on device. |
| **Localization** | `i18next` + `react-i18next` | Instant bilingual toggling between English and Hindi. |
| **Storage** | `@react-native-async-storage/async-storage` | Privacy-first local phone storage. |

---

## 4. Code Walkthrough (Where to look in the code)

If the examiner asks:
* *"Where are the legal documents defined?"*
  👉 Open **`src/templates/rent.json`**, **`nda.json`**, or **`freelance.json`**. Show them the `questions` array and `clauses` array containing both `"plain"` and `"legal"` texts.
* *"How does the variable replacement work?"*
  👉 Open **`src/templates/index.js`** and point to `interpolateText()`:
  ```javascript
  // Replaces placeholders like {tenantName} with user form responses
  templateText.replace(/\{(\w+)\}/g, (match, key) => formData[key] || `[ ${key} ]`);
  ```
* *"Where are the legal warning checks?"*
  👉 Open **`src/templates/index.js`** and point to `evaluateWarnings()`:
  ```javascript
  // Registration Act 1908: Lease > 11 months must be registered
  if (warning.id === 'registration_check' && durationMonths > 11) {
    activeWarnings.push(warning);
  }
  ```
* *"How does Plain vs Legal toggling work?"*
  👉 Open **`src/screens/DraftScreen.js`**:
  ```javascript
  const [mode, setMode] = useState('plain'); // 'plain' or 'legal'
  const clauseRaw = isPlain ? clause.plain : clause.legal;
  ```
* *"How is the PDF generated?"*
  👉 Open **`src/services/pdfGenerator.js`**:
  ```javascript
  // Compiles HTML with formal signature and witness blocks, then prints to PDF
  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
  ```

---

## 5. Top 10 Viva Questions & Expert Answers

### Q1: Why React Native instead of native Android (Java/Kotlin) or Flutter?
**Answer:**
React Native allows writing a single declarative JavaScript/React codebase that runs natively on Android, iOS, and Web. Expo provides standardized access to native device APIs (like haptics, printing, and file sharing) without writing verbose platform-specific bridge code.

### Q2: Why is the application offline-first without a cloud database?
**Answer:**
Legal documents contain sensitive Personal Identifiable Information (PII) such as full names, Aadhaar/PAN references, residential addresses, and rental amounts. Storing drafts locally on the device using `AsyncStorage` guarantees 100% data privacy, complies with data protection norms, and allows users in low-connectivity areas across India to generate documents without internet.

### Q3: How are the dynamic compliance warnings evaluated?
**Answer:**
We implemented a lightweight deterministic rule engine in `src/templates/index.js`. As the user fills form fields (e.g., duration of stay or deposit amount), the engine runs conditional checks mapped to Indian legal statutes (such as Section 17 of the Registration Act). If a rule triggers, an amber warning card appears with the specific legal issue and recommended remedy.

### Q4: How does the Plain Language vs Legal Language toggle benefit users?
**Answer:**
Standard legal documents use arcane Latin terms and complex sentence structures (legalese like *"Lessor hereby demises unto Lessee"*). Most citizens sign without understanding. Nyay Saathi provides a side-by-side comprehension bridge: users read and verify what they agree to in plain English or Hindi, but can switch to formal legal phrasing for printing and signing.

### Q5: How is PDF generation handled without a backend server?
**Answer:**
We use Expo's native `expo-print` module. The app constructs a print-ready A4 HTML document with standard styling, page break handling, signature lines, and disclaimers. The native OS webview engine converts this HTML into a clean vector PDF file stored in the app's cache, which is then passed to `expo-sharing` for WhatsApp or system sharing.

### Q6: What design philosophy was followed for the user interface?
**Answer:**
We followed a "Tactile Control Panel" paradigm (specified in `docs/design.md`). Legal tasks are often stressful, so the UI uses calm forest green (`#0E5A4F`), large 56px pressable buttons with physical spring animations, and status indicator lights (Green, Amber, Red) so the user always has clear feedback on what is complete and what needs attention.

### Q7: How does bilingual translation work?
**Answer:**
We integrated `i18next` with `react-i18next`. Translation keys are separated into `src/locales/en.json` and `src/locales/hi.json`. Toggling the language re-renders the UI components and swaps both the interface labels and document clauses instantaneously without requiring a reload.

### Q8: What if a user has a complex dispute or court case?
**Answer:**
The app explicitly includes non-goals: it is a documentation assistant, not a lawyer. Every screen includes a disclaimer, and the app includes a dedicated **Help Screen** with a direct one-tap dialer for the **NALSA National Free Legal Helpline (15100)** and links to District Legal Services Authorities (DLSA).

### Q9: What are the current limitations of the project?
**Answer:**
Currently, document templates are predefined JSON schemas for standard agreements (Rent, NDA, Freelance). It does not yet include automated e-stamp duty purchasing or direct Aadhaar-based e-Sign integrations.

### Q10: What are the future enhancements you plan to add?
**Answer:**
1. **AI Clause Customization**: An optional backend connecting to an LLM (e.g. Gemini API) to generate custom rider clauses (like a pet clause or terrace access) with PII stripping.
2. **Voice-to-Text Input**: Speech recognition in regional Indian languages (Tamil, Bengali, Marathi) for rural citizens.
3. **State-specific Stamp Duty Calculator**: Automated estimation of stamp paper requirements by state (e.g. Maharashtra eSBTR vs Karnataka e-Stamping).

---

## 6. Two-Minute Live Demo Script for Faculty

1. **Step 1 (Home Screen)**:
   - *"Good morning/afternoon Professors. This is Nyay Saathi. Notice the clean tactile interface and the language toggle at the top."*
   - Tap the **Hindi / English** button to demonstrate instant translation.
   - Show the 3 agreement cards: Rent Agreement, NDA, and Freelance Contract.
2. **Step 2 (Form Wizard)**:
   - Tap on **Rent Agreement**.
   - *"The form presents one question at a time to reduce cognitive load. The progress strip at the top updates as we proceed."*
   - Enter Landlord Name: `Ramesh Kumar`, Tenant: `Priya Sharma`, Address: `Flat 204, New Delhi`.
   - Enter Rent: `15000`. Enter Deposit: `60000`. Enter Duration: `12` (intentionally enter >11 to trigger warning!).
   - Tap **Create Agreement**.
3. **Step 3 (Draft Screen & Legal Warnings)**:
   - Point to the Amber warning card: *"Notice that the app immediately flagged that a 12-month lease requires compulsory registration under the Indian Registration Act 1908."*
   - Tap the **Plain Words / Legal Language** toggle: *"With one tap, the user can toggle between simple explanation and court-ready legal phrasing."*
   - Point to the highlighted fill-in values and guidance notes.
4. **Step 4 (Export & Sharing)**:
   - Tap **Export & Share**.
   - Show the 3 tactile buttons: **Save PDF**, **Share on WhatsApp**, and **Print**.
   - Tap **Save / Export as PDF** to show the generated A4 contract complete with signature boxes.
5. **Step 5 (Legal Aid Help)**:
   - Go back to Home and open the **Legal Aid & Help** screen.
   - Explain the DLSA information and direct dialer to NALSA Helpline (15100).
   - Conclude: *"Thank you. We are now open for questions."*
