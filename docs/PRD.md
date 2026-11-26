# PRD: Nyay Saathi (Mobile App)

## What is it?
A phone app where a person fills a short form and gets a legal document (like a rent agreement) in simple language.

## Why?
Legal papers are costly and full of hard words. Small people and small businesses sign things they do not understand, or skip them completely.

## Who is it for?
- Tenants and landlords
- Freelancers
- Small shop and business owners

## Platform
Mobile app (Android first, iOS later), built with React Native.

## Screens
1. **Home:** cards for Rent Agreement, NDA, Freelance Agreement. Language switch (English / Hindi).
2. **Form:** one question per screen, with a progress bar.
3. **Draft:** document in simple language. A toggle switches to legal language. Blanks are highlighted. Warning cards show under the clauses.
4. **Share:** Save as PDF, Share on WhatsApp, Print.
5. **Help:** call a lawyer or open free legal aid (DLSA).

## What it does
1. User picks a document.
2. User fills a simple form (names, amount, dates).
3. App makes the draft in simple language.
4. One tap shows the legal wording.
5. App shows short warnings (example: "Rent agreements over 11 months need registration").
6. User saves the PDF or shares it on WhatsApp.
7. App links to a lawyer or free legal aid for hard cases.

## Extra features (if time)
- Hindi language
- Voice input
- AI box: "add a clause for pets"
- Stamp duty info by state

## What it is NOT
- Not a lawyer and not legal advice.
- No court cases or property sale deeds.

## Safety and privacy
- Drafts stay on the phone. No user data on a server.
- Every draft shows: "This is a draft, not legal advice."

## Success
A new user makes a correct draft in under 10 minutes and understands every clause.

## Plan (48 hours)
- Day 1: Home, Form and Draft screens, 3 documents, simple/legal toggle, warnings
- Day 2: PDF and WhatsApp share, Hindi, testing, slides