# MediScan AI — Intelligent Symptom Checker & Disease Risk Diagnosis Platform

A responsive medical triage and differential diagnosis web application built with **HTML5**, **Tailwind CSS**, and **vanilla JavaScript**. 

Enter symptoms through natural language text or the interactive symptom catalog to receive real-time differential disease predictions, clinical triage risk assessments, lab recommendations, and a printable doctor's consultation report.

---

## 🌟 Key Features

### 1. Multi-Modal Symptom Entry
- **Natural Language AI Symptom Parser:** Type how you feel in plain English (e.g. *"I have a high fever, severe headache, light sensitivity, and stiff neck"*). MediScan AI scans natural language keywords and extracts matching symptoms automatically.
- **Categorized Clinical Catalog (60+ Symptoms):** Filter symptoms across General/Systemic, Head & Neurological, Chest & Cardiovascular, Respiratory, Digestive & Abdomen, Muscles & Joints, and Skin & Allergies.
- **Live Search Filter:** Instant fuzzy search across names, medical terms, and clinical synonyms.
- **One-Click Clinical Scenarios:** Pre-loaded bundles for *Influenza*, *Acute Cardiac Emergency (Red Flag)*, *Gastroenteritis (Food Poisoning)*, *Acute Appendicitis*, *Migraine*, and *UTI*.

### 2. Clinical Triage Urgency Gauge & Red Flag Emergency Alert
- **4 Triage Urgency Tiers:**
  - 🔴 **Level 4 — Emergency (Call 911 / ER):** Acute myocardial infarction, pulmonary embolism, meningitis, anaphylaxis, etc.
  - 🟠 **Level 3 — Urgent Care (Within 24 Hours):** Pneumonia, kidney stones, asthma flare, streptococcal pharyngitis, etc.
  - 🟡 **Level 2 — Primary Care Physician Visit:** Influenza, COVID-19, gastroenteritis, migraine, etc.
  - 🟢 **Level 1 — Routine / Self-Care:** Common cold, tension headache, GERD, allergic rhinitis.
- **Automated Red Flag Alert Bar:** Triggers an emergency banner with direct `tel:911` dispatch button if dangerous symptom combinations appear (e.g., crushing chest pressure + arm pain + shortness of breath).
- **Interactive Multi-Segment Triage Meter:** Visual gauge indicating clinical urgency level with action guidance.

### 3. Probabilistic Differential Diagnosis Engine
- Scores 24+ comprehensive clinical conditions based on primary and secondary symptom alignments, demographic context (age, biological sex), symptom duration, and severity.
- **Ranked Disease Cards:** Displays match percentage ($0\% - 97\%$), clinical overview, aligned symptoms, and urgency classification.
- **Side-by-Side Comparison Matrix:** Compare top differential diagnoses side-by-side across match probability, urgency, typical duration, and key distinguishing factors.

### 4. Detailed Clinical Dossier
Click on any disease card to view:
- **Symptom Alignment:** Aligned symptoms (green checkmarks) vs. other common signs.
- **Recommended Diagnostic Tests:** Relevant clinical workup (e.g. 12-lead ECG, troponin, CT angiography, CBC, throat swab).
- **Specialist Referral:** Recommends the appropriate medical specialist (e.g., Cardiologist, Pulmonologist, Neurologist, ENT).
- **Home Care & Supportive Advice:** Evidence-based hydration, rest, and OTC considerations.
- **Emergency Warnings:** Specific red flags when to stop self-care and proceed to the ER.

### 5. Doctor's Consultation Note & PDF Print
- Generates a structured clinical triage report containing patient demographics, selected symptoms, top suspected diagnoses, clinical triage protocol, and suggested questions to ask your physician.
- One-click **Copy to Clipboard** and formatted print stylesheet (`@media print`) for medical visits.

---

## 📁 Project Structure

```text
disease-prediction-dashboard/
├── index.html        # Semantic HTML5 layout with Tailwind CSS & Lucide icons
├── styles.css        # Range sliders, emergency pulses, scrollbars, and print layout
├── app.js            # Symptom DB (60+), Disease DB (24+), Natural Language Parser & Triage Engine
└── README.md         # Documentation & feature overview
```

---

## 🚀 How to Run & Preview

### Open Directly in Browser
```bash
open /Users/blinks2780/.gemini/antigravity/scratch/disease-prediction-dashboard/index.html
```

### Local HTTP Server
```bash
cd /Users/blinks2780/.gemini/antigravity/scratch/disease-prediction-dashboard
python3 -m http.server 8080
```
Open **[http://localhost:8080](http://localhost:8080)** in your browser.

---

## 🔒 Privacy & Clinical Disclaimer
All symptom parsing, probability scoring, and diagnostic heuristics run **100% locally in your web browser**. No personal health information (PHI) is transmitted over external servers. 

*Disclaimer: This platform is designed for health literacy, triage education, and physician consultation preparation. It does not replace professional medical evaluation.*
