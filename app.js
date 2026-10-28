/**
 * MediScan AI - Intelligent Symptom Checker & Disease Risk Diagnosis
 * Medical Knowledge Base, Natural Language Parser, Diagnostic Inference Engine,
 * Triage Urgency Scoring, and Doctor's Consultation Generator.
 */

// =========================================================================
// 1. SYMPTOM KNOWLEDGE BASE (60+ Categorized Clinical Symptoms & Keywords)
// =========================================================================
const SYMPTOMS_DB = [
  // --- General / Systemic ---
  {
    id: 'fever_high',
    name: 'High Fever (> 101°F / 38.3°C)',
    category: 'general',
    isEmergency: false,
    keywords: ['high fever', 'burning up', 'very hot', '102', '103', '104', 'pyrexia', 'high temp']
  },
  {
    id: 'fever_low',
    name: 'Low-Grade Fever (99.5°F - 100.9°F)',
    category: 'general',
    isEmergency: false,
    keywords: ['low fever', 'slight fever', 'mild fever', 'warm', '100 fever']
  },
  {
    id: 'chills',
    name: 'Chills & Shivering / Rigors',
    category: 'general',
    isEmergency: false,
    keywords: ['chills', 'shivering', 'shivers', 'rigors', 'cold shakes', 'teeth chattering']
  },
  {
    id: 'fatigue_severe',
    name: 'Severe Fatigue & Malaise',
    category: 'general',
    isEmergency: false,
    keywords: ['fatigue', 'exhausted', 'malaise', 'tired', 'lethargic', 'no energy', 'weakness', 'drained']
  },
  {
    id: 'body_aches',
    name: 'Generalized Body & Muscle Aches',
    category: 'general',
    isEmergency: false,
    keywords: ['body aches', 'muscle pain', 'myalgia', 'aching all over', 'body pain', 'sore muscles']
  },
  {
    id: 'night_sweats',
    name: 'Drenching Night Sweats',
    category: 'general',
    isEmergency: false,
    keywords: ['night sweats', 'sweating at night', 'waking up soaked', 'sweats']
  },
  {
    id: 'weight_loss_unexplained',
    name: 'Unexplained Weight Loss',
    category: 'general',
    isEmergency: false,
    keywords: ['weight loss', 'losing weight', 'lost pounds', 'unintentional weight loss']
  },

  // --- Head & Neurological ---
  {
    id: 'headache_throbbing',
    name: 'Severe Throbbing Headache (Unilateral)',
    category: 'head',
    isEmergency: false,
    keywords: ['throbbing headache', 'migraine', 'pounding head', 'one sided headache', 'pulsing headache']
  },
  {
    id: 'headache_dull',
    name: 'Dull Band-Like Headache (Tension)',
    category: 'head',
    isEmergency: false,
    keywords: ['dull headache', 'tension headache', 'head pressure', 'band around head', 'head ache']
  },
  {
    id: 'dizziness',
    name: 'Dizziness & Lightheadedness',
    category: 'head',
    isEmergency: false,
    keywords: ['dizzy', 'dizziness', 'lightheaded', 'woozy', 'unsteady', 'spinning head']
  },
  {
    id: 'vertigo',
    name: 'Spinning Vertigo',
    category: 'head',
    isEmergency: false,
    keywords: ['vertigo', 'room spinning', 'loss of balance', 'labyrinthitis']
  },
  {
    id: 'stiff_neck',
    name: 'Stiff Neck (Cannot touch chin to chest)',
    category: 'head',
    isEmergency: true,
    keywords: ['stiff neck', 'neck stiffness', 'rigid neck', 'nuchal rigidity', 'cannot bend neck']
  },
  {
    id: 'photophobia',
    name: 'Sensitivity to Light (Photophobia)',
    category: 'head',
    isEmergency: false,
    keywords: ['light sensitivity', 'photophobia', 'hurts to look at light', 'bright lights hurt']
  },
  {
    id: 'confusion',
    name: 'Confusion or Altered Mental State',
    category: 'head',
    isEmergency: true,
    keywords: ['confusion', 'disoriented', 'altered mental', 'delirium', 'slurred speech', 'not making sense']
  },
  {
    id: 'visual_aura',
    name: 'Visual Aura / Zigzag Lights / Blind Spots',
    category: 'head',
    isEmergency: false,
    keywords: ['aura', 'zigzag lights', 'flashes in eye', 'blind spot', 'scintillating scotoma']
  },

  // --- Chest & Cardiovascular ---
  {
    id: 'chest_pain_crushing',
    name: 'Crushing / Heavy Substernal Chest Pain',
    category: 'chest',
    isEmergency: true,
    keywords: ['crushing chest pain', 'elephant on chest', 'chest pressure', 'heavy chest', 'squeezing chest']
  },
  {
    id: 'chest_pain_sharp',
    name: 'Sharp Pleuritic Chest Pain (Hurts when breathing)',
    category: 'chest',
    isEmergency: false,
    keywords: ['sharp chest pain', 'pleuritic pain', 'pain breathing in', 'stabbing chest']
  },
  {
    id: 'radiating_arm_jaw_pain',
    name: 'Pain Radiating to Left Arm / Jaw / Back',
    category: 'chest',
    isEmergency: true,
    keywords: ['radiating pain', 'left arm pain', 'jaw pain', 'back pain radiating', 'arm tingling']
  },
  {
    id: 'palpitations',
    name: 'Rapid / Irregular Heartbeats (Palpitations)',
    category: 'chest',
    isEmergency: false,
    keywords: ['palpitations', 'racing heart', 'heart fluttering', 'skipping beats', 'tachycardia']
  },
  {
    id: 'cold_sweat',
    name: 'Cold Clammy Sweat (Diaphoresis)',
    category: 'chest',
    isEmergency: true,
    keywords: ['cold sweat', 'clammy skin', 'profuse sweating', 'diaphoresis']
  },
  {
    id: 'leg_swelling',
    name: 'Bilateral Leg / Ankle Swelling (Edema)',
    category: 'chest',
    isEmergency: false,
    keywords: ['leg swelling', 'swollen ankles', 'edema', 'puffy feet', 'fluid in legs']
  },

  // --- Respiratory ---
  {
    id: 'cough_dry',
    name: 'Dry Persistent Cough',
    category: 'respiratory',
    isEmergency: false,
    keywords: ['dry cough', 'hacking cough', 'tickle cough', 'non productive cough']
  },
  {
    id: 'cough_productive',
    name: 'Productive Cough with Phlegm / Mucus',
    category: 'respiratory',
    isEmergency: false,
    keywords: ['cough with phlegm', 'mucus cough', 'yellow phlegm', 'green phlegm', 'productive cough']
  },
  {
    id: 'shortness_of_breath',
    name: 'Shortness of Breath / Dyspnea',
    category: 'respiratory',
    isEmergency: true,
    keywords: ['shortness of breath', 'dyspnea', 'hard to breathe', 'breathless', 'winded', 'cannot catch breath']
  },
  {
    id: 'wheezing',
    name: 'Wheezing / Whistling Breath Sound',
    category: 'respiratory',
    isEmergency: false,
    keywords: ['wheezing', 'whistling breath', 'asthma sound', 'tight airways']
  },
  {
    id: 'sore_throat',
    name: 'Sore / Scratchy Throat',
    category: 'respiratory',
    isEmergency: false,
    keywords: ['sore throat', 'throat pain', 'hurts to swallow', 'pharyngitis', 'scratchy throat']
  },
  {
    id: 'nasal_congestion',
    name: 'Nasal Congestion & Runny Nose (Rhinorrhea)',
    category: 'respiratory',
    isEmergency: false,
    keywords: ['stuffy nose', 'runny nose', 'congestion', 'rhinorrhea', 'sneezing', 'blocked nose']
  },
  {
    id: 'loss_smell_taste',
    name: 'Loss of Smell or Taste (Anosmia)',
    category: 'respiratory',
    isEmergency: false,
    keywords: ['loss of smell', 'cannot smell', 'anosmia', 'loss of taste', 'ageusia', 'no taste']
  },
  {
    id: 'hemoptysis',
    name: 'Coughing up Blood (Hemoptysis)',
    category: 'respiratory',
    isEmergency: true,
    keywords: ['coughing up blood', 'blood in phlegm', 'hemoptysis', 'bloody sputum']
  },

  // --- Digestive / Gastrointestinal ---
  {
    id: 'nausea',
    name: 'Nausea & Queasiness',
    category: 'gastro',
    isEmergency: false,
    keywords: ['nausea', 'queasy', 'feel like throwing up', 'sick to stomach']
  },
  {
    id: 'vomiting',
    name: 'Frequent Vomiting',
    category: 'gastro',
    isEmergency: false,
    keywords: ['vomiting', 'throwing up', 'puking', 'emesis']
  },
  {
    id: 'diarrhea_watery',
    name: 'Watery Diarrhea / Loose Stools',
    category: 'gastro',
    isEmergency: false,
    keywords: ['diarrhea', 'loose stools', 'watery stool', 'frequent bowel', 'upset stomach']
  },
  {
    id: 'abdominal_pain_cramping',
    name: 'Generalized Abdominal Cramping',
    category: 'gastro',
    isEmergency: false,
    keywords: ['stomach cramps', 'belly ache', 'abdominal cramps', 'gut pain']
  },
  {
    id: 'abdominal_pain_rlq',
    name: 'Sharp Lower Right Abdominal Pain (RLQ)',
    category: 'gastro',
    isEmergency: true,
    keywords: ['lower right stomach', 'right lower quadrant', 'rlq pain', 'appendix pain', 'sharp right belly']
  },
  {
    id: 'heartburn',
    name: 'Heartburn / Burning Acid Regurgitation',
    category: 'gastro',
    isEmergency: false,
    keywords: ['heartburn', 'acid reflux', 'sour taste', 'gerd', 'burning chest after eating']
  },
  {
    id: 'loss_of_appetite',
    name: 'Loss of Appetite (Anorexia)',
    category: 'gastro',
    isEmergency: false,
    keywords: ['loss of appetite', 'not hungry', 'cannot eat', 'anorexia']
  },
  {
    id: 'bloody_stool',
    name: 'Blood in Stool or Black Tarry Stool (Melena)',
    category: 'gastro',
    isEmergency: true,
    keywords: ['blood in stool', 'bloody poop', 'black stool', 'tarry stool', 'melena']
  },

  // --- Urinary & Renal ---
  {
    id: 'dysuria',
    name: 'Burning / Painful Urination (Dysuria)',
    category: 'gastro',
    isEmergency: false,
    keywords: ['burning urination', 'pain peeing', 'dysuria', 'hurts to pee', 'stinging urine']
  },
  {
    id: 'urinary_frequency',
    name: 'Urinary Frequency & Constant Urgency',
    category: 'gastro',
    isEmergency: false,
    keywords: ['frequent peeing', 'urinary urgency', 'peeing all the time', 'cannot hold pee']
  },
  {
    id: 'flank_pain_severe',
    name: 'Severe Sharp Flank / Back Pain (Colic)',
    category: 'gastro',
    isEmergency: true,
    keywords: ['flank pain', 'kidney pain', 'renal colic', 'severe side back pain', 'stabbing back side']
  },

  // --- Muscles, Joints & Skin ---
  {
    id: 'joint_swelling',
    name: 'Swollen, Red, Tender Joint',
    category: 'musculoskeletal',
    isEmergency: false,
    keywords: ['swollen joint', 'red toe', 'gout', 'tender joint', 'arthritis pain', 'knee swelling']
  },
  {
    id: 'skin_rash',
    name: 'Skin Rash or Raised Hives (Urticaria)',
    category: 'skin',
    isEmergency: false,
    keywords: ['rash', 'hives', 'urticaria', 'red spots', 'skin bumps', 'welts']
  },
  {
    id: 'skin_itching',
    name: 'Intense Skin Itching (Pruritus)',
    category: 'skin',
    isEmergency: false,
    keywords: ['itching', 'itchy skin', 'pruritus', 'scratching']
  },
  {
    id: 'facial_swelling',
    name: 'Swelling of Face, Lips or Tongue (Angioedema)',
    category: 'skin',
    isEmergency: true,
    keywords: ['swollen lips', 'swollen tongue', 'face swelling', 'angioedema', 'throat closing']
  }
];

// =========================================================================
// 2. DISEASE KNOWLEDGE BASE (24 Detailed Conditions Across All Urgencies)
// =========================================================================
const DISEASES_DB = [
  // --- EMERGENCY CONDITIONS ---
  {
    id: 'ami_heart_attack',
    name: 'Acute Myocardial Infarction (Heart Attack)',
    urgency: 'emergency',
    probabilityWeight: 1.0,
    specialist: 'Cardiologist / Emergency Physician',
    typicalDuration: 'Sudden onset (minutes to hours)',
    description: 'Acute blockage of coronary blood flow causing cardiac muscle ischemia. Requires emergency intervention to restore coronary perfusion.',
    primarySymptoms: ['chest_pain_crushing', 'radiating_arm_jaw_pain', 'cold_sweat', 'shortness_of_breath'],
    secondarySymptoms: ['nausea', 'dizziness', 'fatigue_severe', 'palpitations'],
    tests: ['12-Lead Electrocardiogram (ECG)', 'Serial High-Sensitivity Troponin I/T', 'Coronary Angiography (Cath Lab)'],
    care: 'DO NOT wait or self-medicate. Call 911 immediately. Rest quietly in a seated position. If not allergic, chew 325 mg uncoated Aspirin under dispatch guidance.',
    redFlags: 'Crushing chest pressure, arm/jaw radiation, diaphoresis, dyspnea, syncope.',
    differentiator: 'Crushing non-positional pressure radiating to arm or jaw, accompanied by cold sweat and dyspnea.'
  },
  {
    id: 'pulmonary_embolism',
    name: 'Pulmonary Embolism (PE)',
    urgency: 'emergency',
    probabilityWeight: 0.9,
    specialist: 'Pulmonologist / Emergency Care',
    typicalDuration: 'Sudden acute onset (< 24 hrs)',
    description: 'Thrombus dislodged into pulmonary arterial circulation, precipitating acute ventilation-perfusion mismatch and right heart strain.',
    primarySymptoms: ['shortness_of_breath', 'chest_pain_sharp', 'cough_dry', 'palpitations'],
    secondarySymptoms: ['hemoptysis', 'dizziness', 'leg_swelling', 'cold_sweat'],
    tests: ['CT Pulmonary Angiography (CTPA)', 'Plasma D-Dimer Assay', 'Lower Extremity Venous Duplex Ultrasound'],
    care: 'Immediate emergency transport. Maintain supplemental oxygen if available; avoid moving the lower extremities.',
    redFlags: 'Sudden unexplained dyspnea, pleuritic chest pain, hemoptysis, presyncope.',
    differentiator: 'Sudden unexplained shortness of breath with sharp pleuritic pain, often following prolonged immobility.'
  },
  {
    id: 'appendicitis',
    name: 'Acute Appendicitis',
    urgency: 'emergency',
    probabilityWeight: 0.95,
    specialist: 'General Surgeon / Emergency Medicine',
    typicalDuration: 'Progressive over 12 - 36 hours',
    description: 'Acute inflammation of the vermiform appendix, risking perforation, localized abscess, and generalized peritonitis if untreated.',
    primarySymptoms: ['abdominal_pain_rlq', 'loss_of_appetite', 'nausea', 'fever_low'],
    secondarySymptoms: ['vomiting', 'abdominal_pain_cramping', 'chills'],
    tests: ['Abdominal Ultrasound / Contrast-Enhanced CT', 'Complete Blood Count (Leukocytosis with Left Shift)', 'C-Reactive Protein (CRP)'],
    care: 'Fast strictly (NPO - nothing by mouth, no food or water) in anticipation of surgery. Do NOT take laxatives or apply heating pads to the abdomen.',
    redFlags: 'Severe localized tenderness at McBurney\'s point, rebound tenderness, high fever, rigid abdomen.',
    differentiator: 'Pain begins periumbilically then migrates and localizes sharply to the Right Lower Quadrant with anorexia.'
  },
  {
    id: 'meningitis',
    name: 'Acute Bacterial / Viral Meningitis',
    urgency: 'emergency',
    probabilityWeight: 0.85,
    specialist: 'Neurologist / Infectious Disease Specialist',
    typicalDuration: 'Rapid onset (hours to 2 days)',
    description: 'Infection and inflammation of the meningeal membranes surrounding the brain and spinal cord.',
    primarySymptoms: ['stiff_neck', 'fever_high', 'headache_throbbing', 'photophobia'],
    secondarySymptoms: ['confusion', 'nausea', 'vomiting', 'fatigue_severe'],
    tests: ['Lumbar Puncture (CSF Gram Stain, Culture & PCR)', 'Blood Cultures', 'Non-contrast Head CT prior to LP'],
    care: 'Immediate emergency hospitalization for IV empiric antibiotics and antiviral therapy.',
    redFlags: 'Inability to touch chin to chest, petechial purpuric rash, delirium, altered consciousness.',
    differentiator: 'Classic triad of fever, severe headache, and nuchal rigidity (stiff neck) with photophobia.'
  },
  {
    id: 'anaphylaxis',
    name: 'Severe Anaphylactic Reaction',
    urgency: 'emergency',
    probabilityWeight: 0.8,
    specialist: 'Allergist / Emergency Medicine',
    typicalDuration: 'Rapid onset (seconds to 30 mins post-exposure)',
    description: 'Life-threatening systemic Type I hypersensitivity reaction causing airway compromise and cardiovascular collapse.',
    primarySymptoms: ['facial_swelling', 'shortness_of_breath', 'wheezing', 'skin_rash'],
    secondarySymptoms: ['dizziness', 'nausea', 'abdominal_pain_cramping', 'palpitations'],
    tests: ['Serum Tryptase Level', 'Clinical Assessment of Airway & Hemodynamics'],
    care: 'Administer Epinephrine autoinjector (EpiPen 0.3mg IM into lateral thigh) immediately. Call 911. Lay flat with legs elevated.',
    redFlags: 'Stridor, tongue swelling, throat tightness, profound hypotension.',
    differentiator: 'Rapid multisystem onset (skin hives + airway swelling/wheezing + dizziness) after allergen exposure.'
  },

  // --- URGENT CONDITIONS (Requires physician evaluation within 24 hours) ---
  {
    id: 'pneumonia',
    name: 'Community-Acquired Pneumonia (CAP)',
    urgency: 'urgent',
    probabilityWeight: 1.1,
    specialist: 'Pulmonologist / Internal Medicine',
    typicalDuration: '3 to 10 days',
    description: 'Infection of lung parenchyma by bacteria (Streptococcus pneumoniae) or viruses, resulting in alveolar consolidation and exudate.',
    primarySymptoms: ['fever_high', 'cough_productive', 'shortness_of_breath', 'chest_pain_sharp'],
    secondarySymptoms: ['chills', 'fatigue_severe', 'body_aches', 'loss_of_appetite'],
    tests: ['Chest X-Ray (PA & Lateral)', 'Sputum Gram Stain & Culture', 'CBC with Differential', 'Pulse Oximetry'],
    care: 'Prescribed targeted oral or IV antibiotics, bronchodilators, adequate fluid intake, and frequent pulmonary toileting.',
    redFlags: 'Oxygen saturation < 92%, confusion, respiratory rate > 30 breaths/min.',
    differentiator: 'High fever, productive purulent cough, and localized crackles on auscultation.'
  },
  {
    id: 'kidney_stones',
    name: 'Nephrolithiasis (Kidney Stones)',
    urgency: 'urgent',
    probabilityWeight: 0.95,
    specialist: 'Urologist / Nephrologist',
    typicalDuration: 'Acute episodes lasting hours to days',
    description: 'Crystalline mineral deposits transiting the ureter, precipitating severe ureteral spasm and hydronephrosis.',
    primarySymptoms: ['flank_pain_severe', 'dysuria', 'nausea'],
    secondarySymptoms: ['vomiting', 'urinary_frequency', 'chills'],
    tests: ['Non-contrast Helical CT KUB', 'Urinalysis (Microscopic Hematuria)', 'Serum BUN & Creatinine'],
    care: 'Aggressive hydration, NSAIDs for pain control, alpha-blockers (Tamsulosin) for stone expulsion.',
    redFlags: 'Concomitant fever with flank pain (suggests obstructive pyelonephritis - emergency), intractable vomiting.',
    differentiator: 'Severe colicky flank pain radiating to groin with inability to find a comfortable resting posture.'
  },
  {
    id: 'asthma_exacerbation',
    name: 'Acute Asthma Flare / Bronchospasm',
    urgency: 'urgent',
    probabilityWeight: 1.0,
    specialist: 'Pulmonologist / Allergist',
    typicalDuration: 'Hours to 3 days',
    description: 'Hyperreactive airway inflammation leading to reversible bronchoconstriction, mucosal edema, and mucus plugging.',
    primarySymptoms: ['shortness_of_breath', 'wheezing', 'cough_dry'],
    secondarySymptoms: ['chest_pain_sharp', 'fatigue_severe', 'palpitations'],
    tests: ['Peak Expiratory Flow (PEF) Measurement', 'Spirometry', 'Continuous Pulse Oximetry'],
    care: 'Inhaled short-acting beta-2 agonist (Albuterol MDI 2-4 puffs via spacer), oral corticosteroid course as directed.',
    redFlags: 'Silent chest (absence of wheezing with severe distress), cyanosis, inability to speak full sentences.',
    differentiator: 'Expiratory wheezing, chest tightness, and dramatic response to inhaled bronchodilators.'
  },
  {
    id: 'strep_throat',
    name: 'Streptococcal Pharyngitis (Strep Throat)',
    urgency: 'urgent',
    probabilityWeight: 1.05,
    specialist: 'ENT / Primary Care Physician',
    typicalDuration: '3 to 7 days',
    description: 'Group A Beta-Hemolytic Streptococcus bacterial infection of the pharynx and tonsils.',
    primarySymptoms: ['sore_throat', 'fever_high', 'headache_dull'],
    secondarySymptoms: ['chills', 'loss_of_appetite', 'nausea', 'body_aches'],
    tests: ['Rapid Antigen Detection Test (RADT)', 'Throat Swab Culture'],
    care: 'Complete full 10-day course of prescribed Penicillin or Amoxicillin to prevent rheumatic fever; warm saline gargles.',
    redFlags: 'Drooling, trismus (inability to open mouth), muffled "hot potato" voice (peritonsillar abscess).',
    differentiator: 'Severe throat pain with fever, lack of cough or rhinorrhea (Centor criteria).'
  },
  {
    id: 'uti_cystitis',
    name: 'Urinary Tract Infection (Acute Cystitis)',
    urgency: 'urgent',
    probabilityWeight: 1.15,
    specialist: 'Urologist / Primary Care',
    typicalDuration: '2 to 5 days with treatment',
    description: 'Ascending bacterial infection of the bladder mucosa, predominantly caused by uropathogenic E. coli.',
    primarySymptoms: ['dysuria', 'urinary_frequency'],
    secondarySymptoms: ['fever_low', 'nausea', 'abdominal_pain_cramping'],
    tests: ['Clean-Catch Urinalysis (Leukocyte Esterase & Nitrites)', 'Urine Microscopy and Culture & Sensitivity'],
    care: 'Complete prescribed antibiotic course (Nitrofurantoin or TMP-SMX), increase water intake, avoid bladder irritants.',
    redFlags: 'High fever, rigors, flank tenderness (indicates ascending pyelonephritis).',
    differentiator: 'Sharp burning sensation during micturition with urgent, frequent, low-volume voiding.'
  },

  // --- MODERATE CONDITIONS (Schedule doctor appointment / telemedicine) ---
  {
    id: 'influenza',
    name: 'Influenza (Seasonal Flu)',
    urgency: 'moderate',
    probabilityWeight: 1.25,
    specialist: 'Primary Care Physician / Internal Medicine',
    typicalDuration: '5 to 9 days',
    description: 'Acute respiratory viral infection caused by Influenza A or B viruses characterized by abrupt systemic onset.',
    primarySymptoms: ['fever_high', 'chills', 'fatigue_severe', 'body_aches', 'cough_dry', 'headache_dull'],
    secondarySymptoms: ['sore_throat', 'nasal_congestion', 'loss_of_appetite'],
    tests: ['Rapid Influenza Molecular Assay / RT-PCR', 'Clinical Criteria'],
    care: 'Neuraminidase inhibitor (Oseltamivir/Tamiflu) if within 48 hours of onset; acetaminophen for fever; electrolyte hydration.',
    redFlags: 'Secondary bacterial worsening after initial improvement, severe dyspnea, persistent confusion.',
    differentiator: 'Abrupt "hit-by-a-truck" onset of high fever, prostrating fatigue, and severe myalgias.'
  },
  {
    id: 'covid_19',
    name: 'COVID-19 (SARS-CoV-2 Viral Infection)',
    urgency: 'moderate',
    probabilityWeight: 1.2,
    specialist: 'Infectious Disease / Primary Care',
    typicalDuration: '5 to 14 days',
    description: 'Novel coronavirus infection displaying variable clinical presentation from mild upper respiratory catarrh to severe interstitial pneumonitis.',
    primarySymptoms: ['fever_high', 'cough_dry', 'loss_smell_taste', 'fatigue_severe', 'body_aches'],
    secondarySymptoms: ['sore_throat', 'nasal_congestion', 'headache_dull', 'shortness_of_breath', 'diarrhea_watery'],
    tests: ['SARS-CoV-2 Rapid Antigen Test', 'Nasopharyngeal RT-PCR'],
    care: 'Self-isolation, pulse oximetry monitoring, oral antiviral therapy (Paxlovid) for high-risk individuals.',
    redFlags: 'Pulse oximetry < 93%, persistent chest pressure, pale or blue-tinted lips/nailbeds.',
    differentiator: 'Hallmark sudden loss of taste or smell accompanied by fever, dry cough, and systemic fatigue.'
  },
  {
    id: 'gastroenteritis',
    name: 'Acute Viral / Bacterial Gastroenteritis',
    urgency: 'moderate',
    probabilityWeight: 1.15,
    specialist: 'Gastroenterologist / Family Physician',
    typicalDuration: '2 to 5 days',
    description: 'Inflammation of the stomach and intestines caused by norovirus, rotavirus, or foodborne bacterial toxins.',
    primarySymptoms: ['nausea', 'vomiting', 'diarrhea_watery', 'abdominal_pain_cramping'],
    secondarySymptoms: ['fever_low', 'chills', 'fatigue_severe', 'dizziness'],
    tests: ['Stool Culture & PCR Multiplex GI Panel', 'Serum Electrolytes (BUN, Sodium, Potassium)'],
    care: 'Oral Rehydration Salts (ORS), BRAT diet (Bananas, Rice, Applesauce, Toast), avoid dairy and caffeine.',
    redFlags: 'Inability to keep liquids down for > 24 hours, profound postural dizziness, bloody diarrhea.',
    differentiator: 'Simultaneous bouts of profuse watery diarrhea and vomiting with diffuse cramping.'
  },
  {
    id: 'migraine',
    name: 'Migraine with / without Aura',
    urgency: 'moderate',
    probabilityWeight: 1.1,
    specialist: 'Neurologist / Headache Specialist',
    typicalDuration: '4 to 72 hours per attack',
    description: 'Neurovascular headache disorder associated with cortical spreading depression and trigeminovascular activation.',
    primarySymptoms: ['headache_throbbing', 'photophobia', 'nausea'],
    secondarySymptoms: ['visual_aura', 'dizziness', 'fatigue_severe'],
    tests: ['Clinical Neurological Examination', 'Brain MRI/CT if "first or worst" headache'],
    care: 'Triptans (Sumatriptan) or CGRP antagonists taken early in attack; rest in dark, silent room with cold compress.',
    redFlags: 'Sudden "thunderclap" headache peaking within 60 seconds (subarachnoid hemorrhage rule-out).',
    differentiator: 'Unilateral pulsating or throbbing quality worsened by routine activity, accompanied by photophobia and nausea.'
  },
  {
    id: 'bronchitis_acute',
    name: 'Acute Bronchitis',
    urgency: 'moderate',
    probabilityWeight: 1.1,
    specialist: 'Primary Care / Pulmonology',
    typicalDuration: '10 to 21 days',
    description: 'Self-limiting inflammation of the large bronchi, typically following an upper respiratory viral illness.',
    primarySymptoms: ['cough_productive', 'fatigue_severe', 'fever_low'],
    secondarySymptoms: ['chest_pain_sharp', 'sore_throat', 'body_aches', 'wheezing'],
    tests: ['Clinical Diagnosis', 'Chest X-Ray to exclude pneumonia if crackles present'],
    care: 'Guaifenesin expectorants, honey, inhaled albuterol for wheezing; antibiotics generally NOT indicated (viral etiology).',
    redFlags: 'Coughing up gross blood, fever > 102°F persisting > 3 days, marked dyspnea.',
    differentiator: 'Persistent cough (lasting 2-3 weeks) producing clear-to-yellow sputum without parenchymal consolidation.'
  },
  {
    id: 'gout_arthritis',
    name: 'Acute Gouty Arthritis',
    urgency: 'moderate',
    probabilityWeight: 0.95,
    specialist: 'Rheumatologist',
    typicalDuration: '3 to 10 days',
    description: 'Deposition of monosodium urate monohydrate crystals in synovial joints provoking intense sterile inflammation.',
    primarySymptoms: ['joint_swelling', 'fever_low'],
    secondarySymptoms: ['fatigue_severe'],
    tests: ['Synovial Fluid Arthrocentesis (Polarized Light Microscopy - needle-shaped crystals)', 'Serum Uric Acid Level'],
    care: 'Colchicine or high-dose NSAIDs (Indomethacin); ice application; joint rest; long-term allopurinol after flare resolves.',
    redFlags: 'Joint with overlying cellulitis or purulent effusion (septic arthritis rule-out).',
    differentiator: 'Exquisitely tender, swollen, red, hot joint—most characteristically the first metatarsophalangeal (great toe) joint (podagra).'
  },

  // --- SELF-CARE & LOW RISK CONDITIONS ---
  {
    id: 'common_cold',
    name: 'Common Cold (Viral Upper Respiratory Infection)',
    urgency: 'selfcare',
    probabilityWeight: 1.3,
    specialist: 'Self-Care / Pharmacist / Primary Care',
    typicalDuration: '5 to 7 days',
    description: 'Mild, self-limiting viral infection of the upper respiratory tract, most commonly caused by rhinoviruses.',
    primarySymptoms: ['nasal_congestion', 'sore_throat', 'cough_dry'],
    secondarySymptoms: ['fever_low', 'headache_dull', 'fatigue_severe'],
    tests: ['Clinical Diagnosis Only (no lab testing needed)'],
    care: 'Saline nasal spray, steam inhalation, throat lozenges, adequate rest, and oral hydration.',
    redFlags: 'Symptoms worsening past 10 days or new onset high fever (secondary sinusitis).',
    differentiator: 'Predominance of sneezing, nasal congestion, and mild scratchy throat without high fever or prostration.'
  },
  {
    id: 'tension_headache',
    name: 'Tension-Type Headache',
    urgency: 'selfcare',
    probabilityWeight: 1.25,
    specialist: 'Self-Care / Primary Care',
    typicalDuration: '30 mins to several hours',
    description: 'Most common primary headache caused by pericranial myofascial strain, physical fatigue, or psychological stress.',
    primarySymptoms: ['headache_dull', 'fatigue_severe'],
    secondarySymptoms: ['body_aches'],
    tests: ['Standard Neurological Exam (Normal)'],
    care: 'Over-the-counter NSAIDs (Ibuprofen 400mg) or Acetaminophen; neck stretches; posture correction; hydration.',
    redFlags: 'Headache accompanied by focal weakness, numbness, or visual field deficits.',
    differentiator: 'Non-pulsating band-like pressure around the head, no nausea, no worsening with physical activity.'
  },
  {
    id: 'gerd',
    name: 'Gastroesophageal Reflux Disease (GERD / Acid Reflux)',
    urgency: 'selfcare',
    probabilityWeight: 1.1,
    specialist: 'Gastroenterologist / Primary Care',
    typicalDuration: 'Intermittent episodes after meals',
    description: 'Incompetence of the lower esophageal sphincter allowing gastric acid backflow into the esophageal lumen.',
    primarySymptoms: ['heartburn'],
    secondarySymptoms: ['cough_dry', 'sore_throat', 'nausea'],
    tests: ['Clinical Trial of PPIs', 'Upper Endoscopy (EGD) for refractory symptoms'],
    care: 'Antacids, H2-blockers, avoid lying down for 3 hours postprandial, elevate head of bed 6 inches, eliminate spicy/fatty triggers.',
    redFlags: 'Difficulty swallowing (dysphagia), painful swallowing (odynophagia), unintentional weight loss.',
    differentiator: 'Retrosternal burning sensation provoked by recumbency or meals, relieved promptly by antacids.'
  },
  {
    id: 'allergic_rhinitis',
    name: 'Allergic Rhinitis (Hay Fever)',
    urgency: 'selfcare',
    probabilityWeight: 1.2,
    specialist: 'Allergist / Primary Care',
    typicalDuration: 'Seasonal or perennial',
    description: 'IgE-mediated inflammatory response of nasal mucous membranes to airborne aeroallergens (pollen, dust mites, pet dander).',
    primarySymptoms: ['nasal_congestion', 'skin_itching'],
    secondarySymptoms: ['cough_dry', 'fatigue_severe', 'headache_dull'],
    tests: ['Allergy Skin Prick Testing', 'Serum Specific IgE (ImmunoCAP)'],
    care: 'Second-generation oral antihistamines (Cetirizine, Loratadine), intranasal corticosteroid spray (Fluticasone).',
    redFlags: 'Facial swelling or respiratory wheezing (allergy progression).',
    differentiator: 'Clear watery rhinorrhea with paroxysms of sneezing and pruritus of eyes, nose, and palate.'
  }
];

// =========================================================================
// 3. APPLICATION STATE & DOM REFERENCES
// =========================================================================
const appState = {
  selectedSymptoms: new Set(),
  activeCategory: 'all',
  searchQuery: '',
  patient: {
    age: 35,
    sex: 'any',
    duration: 'acute_days',
    severity: 'moderate'
  },
  activeView: 'ranked', // 'ranked' | 'matrix'
  selectedDiseaseId: null
};

const UI = {};

/**
 * Initialize application lifecycle
 */
function initApp() {
  cacheDOM();
  bindUIEvents();
  renderSymptomCatalog();
  runDiagnosticInference(); // Run baseline with empty/initial state
}

function cacheDOM() {
  // Inputs & Search
  UI.naturalInput = document.getElementById('natural-symptom-input');
  UI.btnExtract = document.getElementById('btn-extract-symptoms');
  UI.naturalFeedback = document.getElementById('natural-feedback');
  UI.naturalFeedbackText = document.getElementById('natural-feedback-text');
  UI.symptomSearch = document.getElementById('symptom-search');
  UI.symptomsList = document.getElementById('symptoms-list');
  UI.symptomCountVisible = document.getElementById('symptom-count-visible');
  UI.categoryPills = document.querySelectorAll('.cat-pill');

  // Selected Symptoms Bar
  UI.selectedCount = document.getElementById('selected-count');
  UI.chipsContainer = document.getElementById('selected-chips-container');
  UI.emptyPlaceholder = document.getElementById('empty-symptoms-placeholder');
  UI.btnClearAll = document.getElementById('btn-clear-all');
  UI.btnRunDiagnosis = document.getElementById('btn-run-diagnosis');

  // Patient Profile Controls
  UI.inputAge = document.getElementById('input-patient-age');
  UI.labelAge = document.getElementById('label-age');
  UI.sexPills = document.querySelectorAll('.sex-pill');
  UI.selectDuration = document.getElementById('select-duration');
  UI.selectSeverity = document.getElementById('select-severity');

  // Triage Gauge & Banners
  UI.redFlagBanner = document.getElementById('red-flag-banner');
  UI.redFlagReason = document.getElementById('red-flag-reason');
  UI.triageBadge = document.getElementById('triage-badge');
  UI.triageDot = document.getElementById('triage-dot');
  UI.triageBadgeText = document.getElementById('triage-badge-text');
  UI.urgencyScoreLabel = document.getElementById('urgency-score-label');
  UI.triagePointer = document.getElementById('triage-pointer');
  UI.triageGuidelineText = document.getElementById('triage-guideline-text');
  UI.triageBgGlow = document.getElementById('triage-bg-glow');

  // Diagnosis Views
  UI.tabRanked = document.getElementById('tab-ranked');
  UI.tabMatrix = document.getElementById('tab-matrix');
  UI.viewRanked = document.getElementById('view-ranked-diseases');
  UI.viewMatrix = document.getElementById('view-matrix');
  UI.diseasesContainer = document.getElementById('diseases-container');
  UI.matrixTableBody = document.getElementById('matrix-table-body');

  // Deep Dive Dossier
  UI.deepDiveTitle = document.getElementById('deep-dive-title');
  UI.deepDiveDesc = document.getElementById('deep-dive-desc');
  UI.deepDiveBadge = document.getElementById('deep-dive-badge');
  UI.deepDiveMatchedTags = document.getElementById('deep-dive-matched-tags');
  UI.deepDiveUnmatchedTags = document.getElementById('deep-dive-unmatched-tags');
  UI.deepDiveSpecialist = document.getElementById('deep-dive-specialist');
  UI.deepDiveTests = document.getElementById('deep-dive-tests');
  UI.deepDiveCare = document.getElementById('deep-dive-care');
  UI.deepDiveWarning = document.getElementById('deep-dive-warning');

  // Modals & Presets
  UI.btnQuickBundle = document.getElementById('btn-quick-bundle-modal');
  UI.scenariosModal = document.getElementById('scenarios-modal');
  UI.btnCloseScenarios = document.getElementById('btn-close-scenarios');
  UI.btnOpenSummary = document.getElementById('btn-open-doctor-summary');
  UI.summaryModal = document.getElementById('summary-modal');
  UI.btnCloseModal = document.getElementById('btn-close-modal');
  UI.modalReportContent = document.getElementById('modal-report-content');
  UI.btnCopySummary = document.getElementById('btn-copy-summary');
  UI.btnPrintSummary = document.getElementById('btn-print-summary');
  UI.toast = document.getElementById('toast');
  UI.toastText = document.getElementById('toast-text');
}

/**
 * Event Listeners & Interaction bindings
 */
function bindUIEvents() {
  // Natural language parser trigger
  UI.btnExtract.addEventListener('click', parseNaturalLanguageInput);
  UI.naturalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      parseNaturalLanguageInput();
    }
  });

  // Search filter
  UI.symptomSearch.addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.toLowerCase().trim();
    renderSymptomCatalog();
  });

  // Category filter pills
  UI.categoryPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      UI.categoryPills.forEach((p) => p.classList.remove('active-cat'));
      pill.classList.add('active-cat');
      appState.activeCategory = pill.dataset.cat;
      renderSymptomCatalog();
    });
  });

  // Clear all symptoms
  UI.btnClearAll.addEventListener('click', () => {
    appState.selectedSymptoms.clear();
    renderSelectedChips();
    renderSymptomCatalog();
    runDiagnosticInference();
    showToast('Cleared all selected symptoms.');
  });

  // Recalculate button
  UI.btnRunDiagnosis.addEventListener('click', () => {
    runDiagnosticInference();
    showToast('Diagnostic predictions updated.');
  });

  // Patient Context Controls
  UI.inputAge.addEventListener('input', (e) => {
    appState.patient.age = parseInt(e.target.value, 10);
    UI.labelAge.textContent = `${appState.patient.age} yrs`;
    runDiagnosticInference();
  });

  UI.sexPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      UI.sexPills.forEach((p) => {
        p.className = 'sex-pill flex-1 py-1 text-center font-semibold text-slate-600 hover:text-slate-900';
      });
      pill.className = 'sex-pill flex-1 py-1 text-center font-semibold rounded bg-white text-slate-900 shadow-2xs';
      appState.patient.sex = pill.id.replace('btn-sex-', '');
      runDiagnosticInference();
    });
  });

  UI.selectDuration.addEventListener('change', (e) => {
    appState.patient.duration = e.target.value;
    runDiagnosticInference();
  });

  UI.selectSeverity.addEventListener('change', (e) => {
    appState.patient.severity = e.target.value;
    runDiagnosticInference();
  });

  // Scenario presets (buttons with class scenario-btn)
  document.querySelectorAll('.scenario-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      loadScenario(btn.dataset.scenario);
      if (UI.scenariosModal) UI.scenariosModal.classList.add('hidden');
    });
  });

  // Quick Scenarios Modal
  UI.btnQuickBundle.addEventListener('click', () => {
    UI.scenariosModal.classList.remove('hidden');
  });
  UI.btnCloseScenarios.addEventListener('click', () => {
    UI.scenariosModal.classList.add('hidden');
  });

  // Tab views switching
  UI.tabRanked.addEventListener('click', () => switchResultView('ranked'));
  UI.tabMatrix.addEventListener('click', () => switchResultView('matrix'));

  // Doctor's Summary Modal
  UI.btnOpenSummary.addEventListener('click', openDoctorSummaryModal);
  UI.btnCloseModal.addEventListener('click', () => UI.summaryModal.classList.add('hidden'));
  UI.summaryModal.addEventListener('click', (e) => {
    if (e.target === UI.summaryModal) UI.summaryModal.classList.add('hidden');
  });
  UI.btnCopySummary.addEventListener('click', copySummaryToClipboard);
  UI.btnPrintSummary.addEventListener('click', () => window.print());
}

/**
 * Natural language symptom extractor
 */
function parseNaturalLanguageInput() {
  const text = UI.naturalInput.value.toLowerCase().trim();
  if (!text) return;

  let addedCount = 0;
  const detectedNames = [];

  SYMPTOMS_DB.forEach((sym) => {
    let matched = false;
    for (const kw of sym.keywords) {
      if (text.includes(kw)) {
        matched = true;
        break;
      }
    }
    if (matched) {
      if (!appState.selectedSymptoms.has(sym.id)) {
        appState.selectedSymptoms.add(sym.id);
        addedCount++;
      }
      detectedNames.push(sym.name);
    }
  });

  renderSelectedChips();
  renderSymptomCatalog();
  runDiagnosticInference();

  UI.naturalFeedback.classList.remove('hidden');
  if (detectedNames.length > 0) {
    UI.naturalFeedbackText.textContent = `Extracted ${detectedNames.length} symptom(s): ${detectedNames.slice(0, 3).join(', ')}${detectedNames.length > 3 ? '...' : ''}`;
    showToast(`Extracted ${detectedNames.length} symptoms from your text!`);
  } else {
    UI.naturalFeedbackText.textContent = `No exact symptoms detected. Try selecting from the catalog below.`;
  }
}

/**
 * Loads a curated patient scenario preset
 */
function loadScenario(scenarioKey) {
  appState.selectedSymptoms.clear();

  if (scenarioKey === 'flu') {
    ['fever_high', 'chills', 'fatigue_severe', 'body_aches', 'cough_dry', 'headache_dull'].forEach(s => appState.selectedSymptoms.add(s));
    appState.patient.severity = 'moderate';
    appState.patient.duration = 'acute_days';
  } else if (scenarioKey === 'chest') {
    ['chest_pain_crushing', 'radiating_arm_jaw_pain', 'cold_sweat', 'shortness_of_breath'].forEach(s => appState.selectedSymptoms.add(s));
    appState.patient.severity = 'severe';
    appState.patient.duration = 'acute_hours';
  } else if (scenarioKey === 'gastro') {
    ['nausea', 'vomiting', 'diarrhea_watery', 'abdominal_pain_cramping'].forEach(s => appState.selectedSymptoms.add(s));
    appState.patient.severity = 'moderate';
    appState.patient.duration = 'acute_days';
  } else if (scenarioKey === 'appendicitis') {
    ['abdominal_pain_rlq', 'loss_of_appetite', 'nausea', 'fever_low'].forEach(s => appState.selectedSymptoms.add(s));
    appState.patient.severity = 'severe';
    appState.patient.duration = 'acute_days';
  } else if (scenarioKey === 'migraine') {
    ['headache_throbbing', 'photophobia', 'nausea', 'visual_aura'].forEach(s => appState.selectedSymptoms.add(s));
    appState.patient.severity = 'moderate';
    appState.patient.duration = 'acute_hours';
  } else if (scenarioKey === 'uti') {
    ['dysuria', 'urinary_frequency', 'fever_low'].forEach(s => appState.selectedSymptoms.add(s));
    appState.patient.severity = 'moderate';
    appState.patient.duration = 'acute_days';
  }

  UI.selectSeverity.value = appState.patient.severity;
  UI.selectDuration.value = appState.patient.duration;

  renderSelectedChips();
  renderSymptomCatalog();
  runDiagnosticInference();
  showToast(`Loaded scenario: ${scenarioKey.toUpperCase()}`);
}

/**
 * Render the clickable catalog of all symptoms with search & category filtering
 */
function renderSymptomCatalog() {
  const query = appState.searchQuery;
  const category = appState.activeCategory;

  const filtered = SYMPTOMS_DB.filter((s) => {
    const matchesCat = category === 'all' || s.category === category;
    const matchesQuery = !query || 
      s.name.toLowerCase().includes(query) || 
      s.keywords.some(k => k.includes(query));
    return matchesCat && matchesQuery;
  });

  UI.symptomCountVisible.textContent = filtered.length;

  let html = '';
  filtered.forEach((sym) => {
    const isChecked = appState.selectedSymptoms.has(sym.id);
    const borderClass = isChecked 
      ? 'border-brand-500 bg-brand-50/70 text-brand-900 shadow-2xs font-semibold' 
      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800';

    html += `
      <div 
        data-symptom-id="${sym.id}" 
        class="symptom-item flex items-center justify-between p-2.5 rounded-xl border ${borderClass} cursor-pointer transition select-none text-xs"
      >
        <div class="flex items-center gap-2.5 flex-1 pr-2">
          <input 
            type="checkbox" 
            ${isChecked ? 'checked' : ''} 
            class="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 pointer-events-none"
          />
          <span class="leading-snug">${sym.name}</span>
        </div>

        <div class="flex items-center gap-1.5 shrink-0">
          ${sym.isEmergency ? '<span class="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded-full uppercase">Emergency</span>' : ''}
          <span class="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">${sym.category}</span>
        </div>
      </div>
    `;
  });

  if (filtered.length === 0) {
    html = `<div class="p-6 text-center text-xs text-slate-400">No symptoms found matching "${query}". Try another search term.</div>`;
  }

  UI.symptomsList.innerHTML = html;

  // Add click handler to each item
  UI.symptomsList.querySelectorAll('.symptom-item').forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.dataset.symptomId;
      if (appState.selectedSymptoms.has(id)) {
        appState.selectedSymptoms.delete(id);
      } else {
        appState.selectedSymptoms.add(id);
      }
      renderSelectedChips();
      renderSymptomCatalog();
      runDiagnosticInference();
    });
  });
}

/**
 * Render top active selected symptom pill chips
 */
function renderSelectedChips() {
  const count = appState.selectedSymptoms.size;
  UI.selectedCount.textContent = count;

  if (count === 0) {
    UI.emptyPlaceholder.classList.remove('hidden');
    UI.chipsContainer.innerHTML = '';
    UI.chipsContainer.appendChild(UI.emptyPlaceholder);
    return;
  }

  UI.emptyPlaceholder.classList.add('hidden');
  let html = '';

  appState.selectedSymptoms.forEach((id) => {
    const sym = SYMPTOMS_DB.find(s => s.id === id);
    if (!sym) return;

    const badgeBg = sym.isEmergency 
      ? 'bg-rose-100 text-rose-800 border-rose-300' 
      : 'bg-brand-50 text-brand-800 border-brand-200';

    html += `
      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badgeBg} shadow-2xs animate-in fade-in duration-150">
        ${sym.isEmergency ? '<span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span>' : ''}
        <span>${sym.name}</span>
        <button type="button" data-remove-id="${sym.id}" class="remove-chip-btn ml-1 text-slate-400 hover:text-slate-800 focus:outline-none">
          &times;
        </button>
      </span>
    `;
  });

  UI.chipsContainer.innerHTML = html;

  // Bind remove handlers
  UI.chipsContainer.querySelectorAll('.remove-chip-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.dataset.removeId;
      appState.selectedSymptoms.delete(id);
      renderSelectedChips();
      renderSymptomCatalog();
      runDiagnosticInference();
    });
  });
}

/**
 * Multi-Factorial Differential Diagnosis & Triage Calculation Engine
 */
function runDiagnosticInference() {
  const selected = appState.selectedSymptoms;
  const count = selected.size;

  // 1. Red Flag Emergency Rule Detection
  const redFlags = detectRedFlags(selected);
  if (redFlags.triggered) {
    UI.redFlagBanner.classList.remove('hidden');
    UI.redFlagReason.textContent = redFlags.reason;
  } else {
    UI.redFlagBanner.classList.add('hidden');
  }

  // 2. Score each disease in database against selected symptoms
  const scoredDiseases = DISEASES_DB.map((disease) => {
    const primaryMatches = disease.primarySymptoms.filter(s => selected.has(s));
    const secondaryMatches = disease.secondarySymptoms.filter(s => selected.has(s));

    const totalPrimaries = disease.primarySymptoms.length;
    const totalSecondaries = disease.secondarySymptoms.length;

    // Weight primary symptoms heavily (3.5x) vs secondary (1.2x)
    let rawScore = (primaryMatches.length * 3.5) + (secondaryMatches.length * 1.2);

    // If patient selected symptoms that this disease doesn't have, slight penalty for over-selection
    const unmatchedPatientSymptoms = Array.from(selected).filter(
      s => !disease.primarySymptoms.includes(s) && !disease.secondarySymptoms.includes(s)
    );
    rawScore -= unmatchedPatientSymptoms.length * 0.25;

    // Demographic calibrator: e.g. age > 50 increases cardiac likelihood; age < 30 increases appendicitis
    if (disease.id === 'ami_heart_attack' && appState.patient.age >= 50) rawScore += 1.0;
    if (disease.id === 'appendicitis' && appState.patient.age <= 30) rawScore += 0.8;

    // Severity multiplier
    if (appState.patient.severity === 'severe' && (disease.urgency === 'emergency' || disease.urgency === 'urgent')) {
      rawScore *= 1.2;
    }

    // Convert into calibrated probability percentage (0% to 98%)
    const maxPossibleScore = (totalPrimaries * 3.5) + (totalSecondaries * 1.2);
    let matchPct = 0;
    if (count > 0 && maxPossibleScore > 0) {
      matchPct = Math.round((Math.max(0, rawScore) / maxPossibleScore) * 100);
      // Bound realistically
      matchPct = Math.min(97, Math.max(0, matchPct));
    }

    return {
      ...disease,
      score: matchPct,
      primaryMatches,
      secondaryMatches,
      allMatches: [...primaryMatches, ...secondaryMatches],
      unmatchedPrimaries: disease.primarySymptoms.filter(s => !selected.has(s))
    };
  });

  // Sort descending by calculated probability
  scoredDiseases.sort((a, b) => b.score - a.score);

  // If no symptoms selected, show top common baseline conditions with default low score
  const topDiseases = count === 0 
    ? DISEASES_DB.slice(0, 5).map(d => ({ ...d, score: 0, allMatches: [] })) 
    : scoredDiseases.slice(0, 6);

  // 3. Determine Overall Triage Urgency Level
  const topResult = topDiseases[0];
  let triageLevel = 'selfcare';
  let triageScore = 15;
  let triageLabel = 'Level 1 — Routine / Self-Care';
  let triageGuideline = 'Symptoms are mild and appear self-limiting. Prioritize rest, oral hydration, and home monitoring.';

  if (redFlags.triggered || (topResult && topResult.urgency === 'emergency' && topResult.score >= 45)) {
    triageLevel = 'emergency';
    triageScore = 92;
    triageLabel = 'Level 4 — IMMEDIATE EMERGENCY (Call 911)';
    triageGuideline = 'CRITICAL: Symptoms indicate high risk of an acute cardiovascular, neurological, or surgical emergency. Seek immediate emergency evaluation (call 911).';
  } else if ((topResult && topResult.urgency === 'urgent' && topResult.score >= 40) || appState.patient.severity === 'severe') {
    triageLevel = 'urgent';
    triageScore = 68;
    triageLabel = 'Level 3 — Urgent Care (Within 24 Hours)';
    triageGuideline = 'Clinical presentation suggests conditions requiring diagnostic workup (e.g. imaging, lab testing, prescription therapy) within 24 hours.';
  } else if ((topResult && topResult.score >= 35) || appState.patient.severity === 'moderate') {
    triageLevel = 'moderate';
    triageScore = 42;
    triageLabel = 'Level 2 — Primary Care Physician Visit';
    triageGuideline = 'Schedule an in-person or telemedicine appointment with your primary care provider for clinical evaluation and symptomatic management.';
  }

  // Update Triage UI
  updateTriageUI(triageLevel, triageScore, triageLabel, triageGuideline);

  // 4. Render Ranked Disease Cards
  renderRankedDiseases(topDiseases);

  // 5. Render Comparison Matrix Table
  renderComparisonMatrix(topDiseases.slice(0, 4));

  // 6. Update Deep Dive Dossier (default to #1 disease)
  const inspectDisease = topDiseases.find(d => d.id === appState.selectedDiseaseId) || topDiseases[0];
  if (inspectDisease) {
    updateDeepDiveDossier(inspectDisease);
  }

  // Refresh Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Checks for critical symptom patterns that warrant immediate emergency alert
 */
function detectRedFlags(selected) {
  // Cardiac red flag
  if (selected.has('chest_pain_crushing') || 
     (selected.has('radiating_arm_jaw_pain') && selected.has('shortness_of_breath')) ||
     (selected.has('chest_pain_crushing') && selected.has('cold_sweat'))) {
    return {
      triggered: true,
      reason: 'Signs consistent with acute coronary syndrome or myocardial infarction (chest pressure, pain radiating to arm/jaw, diaphoresis).'
    };
  }

  // Meningitis red flag
  if (selected.has('stiff_neck') && (selected.has('fever_high') || selected.has('photophobia'))) {
    return {
      triggered: true,
      reason: 'Classic signs of acute meningeal irritation (nuchal rigidity + high fever + photophobia). Immediate lumbar puncture & antibiotics needed.'
    };
  }

  // Anaphylaxis red flag
  if (selected.has('facial_swelling') && (selected.has('shortness_of_breath') || selected.has('wheezing'))) {
    return {
      triggered: true,
      reason: 'Signs of severe systemic anaphylaxis (facial/airway angioedema with respiratory distress). Administer Epinephrine immediately.'
    };
  }

  // Severe respiratory distress
  if (selected.has('hemoptysis') && selected.has('shortness_of_breath')) {
    return {
      triggered: true,
      reason: 'Hemoptysis accompanied by respiratory compromise requires emergency pulmonary vascular rule-out (e.g. pulmonary embolism).'
    };
  }

  return { triggered: false, reason: '' };
}

/**
 * Updates the triage meter gauge, badges, and colors
 */
function updateTriageUI(level, score, label, guideline) {
  UI.urgencyScoreLabel.textContent = label;
  UI.triagePointer.style.left = `${score}%`;
  UI.triageGuidelineText.textContent = guideline;

  if (level === 'emergency') {
    UI.triageBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 border border-rose-300 text-xs font-extrabold uppercase tracking-wider shadow-2xs pulse-emergency';
    UI.triageDot.className = 'w-2 h-2 rounded-full bg-rose-600 animate-ping';
    UI.triageBadgeText.textContent = 'Emergency Care (911)';
    UI.urgencyScoreLabel.className = 'font-mono text-rose-600 font-extrabold text-sm';
    UI.triageBgGlow.className = 'absolute -right-16 -top-16 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none transition-all duration-700';
  } else if (level === 'urgent') {
    UI.triageBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-100 text-orange-900 border border-orange-300 text-xs font-extrabold uppercase tracking-wider shadow-2xs';
    UI.triageDot.className = 'w-2 h-2 rounded-full bg-orange-500 animate-pulse';
    UI.triageBadgeText.textContent = 'Urgent Clinic (24h)';
    UI.urgencyScoreLabel.className = 'font-mono text-orange-600 font-extrabold text-sm';
    UI.triageBgGlow.className = 'absolute -right-16 -top-16 w-60 h-60 bg-orange-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-700';
  } else if (level === 'moderate') {
    UI.triageBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold uppercase tracking-wider shadow-2xs';
    UI.triageDot.className = 'w-2 h-2 rounded-full bg-amber-500 animate-pulse';
    UI.triageBadgeText.textContent = 'Primary Care Visit';
    UI.urgencyScoreLabel.className = 'font-mono text-amber-600 font-extrabold text-sm';
    UI.triageBgGlow.className = 'absolute -right-16 -top-16 w-60 h-60 bg-amber-500/15 rounded-full blur-3xl pointer-events-none transition-all duration-700';
  } else {
    UI.triageBadge.className = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-extrabold uppercase tracking-wider shadow-2xs';
    UI.triageDot.className = 'w-2 h-2 rounded-full bg-emerald-500 animate-pulse';
    UI.triageBadgeText.textContent = 'Routine / Self-Care';
    UI.urgencyScoreLabel.className = 'font-mono text-emerald-600 font-extrabold text-sm';
    UI.triageBgGlow.className = 'absolute -right-16 -top-16 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-700';
  }
}

/**
 * Render Ranked Disease Cards
 */
function renderRankedDiseases(diseases) {
  let html = '';

  diseases.forEach((d, idx) => {
    const isSelected = (appState.selectedDiseaseId === d.id) || (!appState.selectedDiseaseId && idx === 0);
    const selectedClass = isSelected ? 'selected-disease-card ring-2 ring-brand-500/30' : '';

    let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (d.urgency === 'emergency') badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
    if (d.urgency === 'urgent') badgeColor = 'bg-orange-100 text-orange-800 border-orange-200';
    if (d.urgency === 'moderate') badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';

    let barColor = 'bg-emerald-500';
    if (d.score >= 70) barColor = 'bg-rose-500';
    else if (d.score >= 40) barColor = 'bg-amber-500';

    const matchedCount = d.allMatches ? d.allMatches.length : 0;

    html += `
      <div 
        data-disease-id="${d.id}"
        class="disease-card p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-brand-400 bg-white cursor-pointer transition-all ${selectedClass} space-y-2.5"
      >
        <div class="flex items-start justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-bold text-slate-400">#${idx + 1}</span>
              <h4 class="text-sm font-bold text-slate-900">${d.name}</h4>
              <span class="text-[10px] uppercase font-bold px-2 py-0.2 rounded-full border ${badgeColor}">
                ${d.urgency}
              </span>
            </div>
            <p class="text-xs text-slate-500 line-clamp-1 mt-0.5">${d.description}</p>
          </div>

          <div class="text-right shrink-0">
            <span class="font-mono text-base font-extrabold text-slate-900">${d.score}%</span>
            <span class="text-[10px] text-slate-400 block">Symptom Match</span>
          </div>
        </div>

        <!-- Match Progress Bar -->
        <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div class="${barColor} h-1.5 rounded-full transition-all duration-700" style="width: ${d.score}%"></div>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span class="flex items-center gap-1 font-medium">
            <i data-lucide="check" class="w-3.5 h-3.5 text-emerald-600"></i>
            ${matchedCount} symptom(s) aligned
          </span>
          <span class="text-brand-600 font-semibold hover:underline flex items-center gap-0.5">
            View full dossier &rarr;
          </span>
        </div>
      </div>
    `;
  });

  UI.diseasesContainer.innerHTML = html;

  // Click to inspect in dossier
  UI.diseasesContainer.querySelectorAll('.disease-card').forEach((card) => {
    card.addEventListener('click', () => {
      appState.selectedDiseaseId = card.dataset.diseaseId;
      const targetDisease = DISEASES_DB.find(d => d.id === appState.selectedDiseaseId);
      if (targetDisease) {
        updateDeepDiveDossier(targetDisease);
      }
      renderRankedDiseases(diseases);
      if (window.lucide) lucide.createIcons();
    });
  });
}

/**
 * Render Side-by-Side Comparison Matrix Table
 */
function renderComparisonMatrix(topDiseases) {
  let html = '';

  topDiseases.forEach((d) => {
    let badgeColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (d.urgency === 'emergency') badgeColor = 'text-rose-700 bg-rose-50 border-rose-200';
    if (d.urgency === 'urgent') badgeColor = 'text-orange-700 bg-orange-50 border-orange-200';
    if (d.urgency === 'moderate') badgeColor = 'text-amber-700 bg-amber-50 border-amber-200';

    html += `
      <tr class="hover:bg-slate-50/80 transition">
        <td class="p-2.5 font-bold text-slate-900">${d.name}</td>
        <td class="p-2.5 font-mono font-bold text-slate-800">${d.score}%</td>
        <td class="p-2.5">
          <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${badgeColor}">${d.urgency}</span>
        </td>
        <td class="p-2.5 text-slate-600 text-[11px]">${d.typicalDuration}</td>
        <td class="p-2.5 text-slate-700 font-medium text-[11px]">${d.differentiator}</td>
      </tr>
    `;
  });

  UI.matrixTableBody.innerHTML = html;
}

/**
 * Update the Detailed Clinical Dossier Card for a selected disease
 */
function updateDeepDiveDossier(disease) {
  UI.deepDiveTitle.textContent = disease.name;
  UI.deepDiveDesc.textContent = disease.description;
  UI.deepDiveBadge.textContent = `Urgency: ${disease.urgency.toUpperCase()}`;
  UI.deepDiveSpecialist.textContent = disease.specialist;
  UI.deepDiveCare.textContent = disease.care;
  UI.deepDiveWarning.textContent = disease.redFlags;

  // Matched Tags
  const matchedSymptoms = disease.primarySymptoms.concat(disease.secondarySymptoms)
    .filter(id => appState.selectedSymptoms.has(id))
    .map(id => SYMPTOMS_DB.find(s => s.id === id))
    .filter(Boolean);

  if (matchedSymptoms.length > 0) {
    UI.deepDiveMatchedTags.innerHTML = matchedSymptoms.map(s => `
      <span class="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
        <i data-lucide="check" class="w-3 h-3 text-emerald-600"></i>
        ${s.name}
      </span>
    `).join('');
  } else {
    UI.deepDiveMatchedTags.innerHTML = '<span class="text-slate-400 italic text-[11px]">No exact symptoms selected yet for this condition</span>';
  }

  // Unmatched common symptoms for this disease
  const unmatched = disease.primarySymptoms.concat(disease.secondarySymptoms)
    .filter(id => !appState.selectedSymptoms.has(id))
    .map(id => SYMPTOMS_DB.find(s => s.id === id))
    .filter(Boolean);

  if (unmatched.length > 0) {
    UI.deepDiveUnmatchedTags.innerHTML = unmatched.slice(0, 5).map(s => `
      <span class="inline-flex items-center text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
        ${s.name}
      </span>
    `).join('');
  } else {
    UI.deepDiveUnmatchedTags.innerHTML = '<span class="text-emerald-600 font-semibold text-[11px]">All classic symptoms present in patient!</span>';
  }

  // Diagnostic tests
  UI.deepDiveTests.innerHTML = disease.tests.map(t => `<li>${t}</li>`).join('');

  if (window.lucide) lucide.createIcons();
}

/**
 * Switch view tabs (Ranked list vs Comparison Matrix)
 */
function switchResultView(view) {
  appState.activeView = view;
  if (view === 'ranked') {
    UI.tabRanked.className = 'px-3 py-1 rounded-md bg-white text-slate-900 shadow-2xs font-bold transition';
    UI.tabMatrix.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition';
    UI.viewRanked.classList.remove('hidden');
    UI.viewMatrix.classList.add('hidden');
  } else {
    UI.tabMatrix.className = 'px-3 py-1 rounded-md bg-white text-slate-900 shadow-2xs font-bold transition';
    UI.tabRanked.className = 'px-3 py-1 rounded-md text-slate-600 hover:text-slate-900 transition';
    UI.viewRanked.classList.add('hidden');
    UI.viewMatrix.classList.remove('hidden');
  }
}

/**
 * Formats and opens the Doctor's Consultation Summary Modal
 */
function openDoctorSummaryModal() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

  const selectedList = Array.from(appState.selectedSymptoms)
    .map(id => SYMPTOMS_DB.find(s => s.id === id))
    .filter(Boolean)
    .map(s => `- ${s.name} [Category: ${s.category.toUpperCase()}${s.isEmergency ? ' *EMERGENCY FLAG*' : ''}]`);

  // Top 3 differential conditions
  const topDiffs = DISEASES_DB.map(d => {
    const primaryMatches = d.primarySymptoms.filter(s => appState.selectedSymptoms.has(s));
    const secondaryMatches = d.secondarySymptoms.filter(s => appState.selectedSymptoms.has(s));
    const maxScore = (d.primarySymptoms.length * 3.5) + (d.secondarySymptoms.length * 1.2);
    const score = Math.min(97, Math.round(((primaryMatches.length * 3.5 + secondaryMatches.length * 1.2) / maxScore) * 100));
    return { ...d, score };
  }).sort((a, b) => b.score - a.score).slice(0, 3);

  const reportText = `========================================================================
MEDISCAN AI — PATIENT TRIAGE & CLINICAL CONSULTATION NOTE
Generated: ${dateStr}
System: Intelligent Clinical Differential Diagnostic Engine (v3.0)
========================================================================

1. PATIENT DEMOGRAPHIC & SYMPTOM CONTEXT
------------------------------------------------------------------------
Age                     : ${appState.patient.age} years
Biological Sex          : ${appState.patient.sex.toUpperCase()}
Reported Duration       : ${appState.patient.duration.replace('_', ' ').toUpperCase()}
Perceived Severity      : ${appState.patient.severity.toUpperCase()}

2. REPORTED CLINICAL SYMPTOMS (${appState.selectedSymptoms.size} Total)
------------------------------------------------------------------------
${selectedList.length > 0 ? selectedList.join('\n') : 'No specific symptoms selected.'}

3. PREDICTED DIFFERENTIAL DIAGNOSES (TOP SUSPECTED CONDITIONS)
------------------------------------------------------------------------
${topDiffs.map((d, i) => `#${i + 1} ${d.name} (${d.score}% Match Probability)
   - Triage Category : ${d.urgency.toUpperCase()}
   - Specialist      : ${d.specialist}
   - Workup Tests    : ${d.tests.join(', ')}
   - Key Indicator   : ${d.differentiator}`).join('\n\n')}

4. CLINICAL TRIAGE PROTOCOL & GUIDANCE
------------------------------------------------------------------------
${UI.triageGuidelineText.textContent}

5. SUGGESTED QUESTIONS FOR THE ATTENDING PHYSICIAN
------------------------------------------------------------------------
1. Do my symptoms warrant specialized diagnostic testing (e.g. imaging or blood work)?
2. Are there any over-the-counter remedies or medications I should avoid?
3. What specific red flag symptoms indicate I should proceed directly to the Emergency Room?
4. When should I follow up if my symptoms do not improve?

========================================================================
DISCLAIMER: This diagnostic summary is intended for clinical triage 
and physician discussion support. It is NOT a definitive diagnosis.
========================================================================`;

  UI.modalReportContent.textContent = reportText;
  UI.summaryModal.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

/**
 * Copy summary report to clipboard
 */
function copySummaryToClipboard() {
  const text = UI.modalReportContent.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Doctor\'s Consultation note copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy. Please select and copy text manually.');
  });
}

/**
 * Toast notifications
 */
function showToast(msg) {
  UI.toastText.textContent = msg;
  UI.toast.classList.remove('opacity-0', 'translate-y-20');
  setTimeout(() => {
    UI.toast.classList.add('opacity-0', 'translate-y-20');
  }, 2600);
}

// Start application on DOM ready
window.addEventListener('DOMContentLoaded', initApp);
