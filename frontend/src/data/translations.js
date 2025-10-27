// Dummy translations for 22 scheduled languages of India
// This is frontend-only for now. Backend will be integrated later.

export const supportedLanguages = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "en", name: "English", nativeName: "English" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
  { code: "ne", name: "Nepali", nativeName: "नेपाली" },
  { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्" },
  { code: "sd", name: "Sindhi", nativeName: "سنڌي" },
  { code: "ks", name: "Kashmiri", nativeName: "كشميري" },
  { code: "kok", name: "Konkani", nativeName: "कोंकणी" },
  { code: "mni", name: "Manipuri", nativeName: "ꯃꯅꯤꯄꯨꯔꯤ" },
  { code: "mai", name: "Maithili", nativeName: "मैथिली" },
  { code: "brx", name: "Bodo", nativeName: "बड़ो" },
  { code: "doi", name: "Dogri", nativeName: "डोगरी" },
];

// Simple translation function (dummy data for now)
export const translate = (key, lang = "en") => {
  // For now, return English with simple descriptions
  // Backend integration will replace this
  const translations = {
    month: lang === "hi" ? "महीना" : lang === "bn" ? "মাস" : "Month",
    district: lang === "hi" ? "जिला" : lang === "bn" ? "জেলা" : "District",
    totalExp:
      lang === "hi"
        ? "कुल व्यय"
        : lang === "bn"
        ? "মোট ব্যয়"
        : "Total Expenditure",
    completedWorks:
      lang === "hi"
        ? "पूर्ण कार्य"
        : lang === "bn"
        ? "সম্পূর্ণ কাজ"
        : "Completed Works",
    ongoingWorks:
      lang === "hi"
        ? "चालू कार्य"
        : lang === "bn"
        ? "চলমান কাজ"
        : "Ongoing Works",
    avgWage:
      lang === "hi"
        ? "औसत मजदूरी"
        : lang === "bn"
        ? "গড় মজুরি"
        : "Average Wage",
    jobCards:
      lang === "hi"
        ? "नौकरी कार्ड"
        : lang === "bn"
        ? "চাকরির কার্ড"
        : "Job Cards",
    activeWorkers:
      lang === "hi"
        ? "सक्रिय श्रमिक"
        : lang === "bn"
        ? "সক্রিয় কর্মী"
        : "Active Workers",
    households:
      lang === "hi" ? "परिवार" : lang === "bn" ? "পরিবার" : "Households",
    viewDetails:
      lang === "hi"
        ? "विवरण देखें"
        : lang === "bn"
        ? "বিবরণ দেখুন"
        : "View Details",
    viewChart:
      lang === "hi"
        ? "चार्ट देखें"
        : lang === "bn"
        ? "চার্ট দেখুন"
        : "View Charts",
    selectLanguage:
      lang === "hi"
        ? "भाषा चुनें"
        : lang === "bn"
        ? "ভাষা নির্বাচন করুন"
        : "Select Language",
    finYear:
      lang === "hi"
        ? "वित्तीय वर्ष"
        : lang === "bn"
        ? "অর্থবছর"
        : "Financial Year",
  };

  return translations[key] || key;
};

// For now, just return simple text based on language
export const getLocalizedDescription = (data, lang = "en") => {
  const getNumeric = (val) => (typeof val === "string" ? parseFloat(val) : val);

  const month = data.month;
  const district = data.district_name;
  const exp = getNumeric(data.Total_Exp);
  const completed = getNumeric(data.Number_of_Completed_Works);
  const ongoing = getNumeric(data.Number_of_Ongoing_Works);

  // Simple translations for key phrases
  const t = (key) => translate(key, lang);

  if (lang === "hi") {
    return `इस महीने ${month} में ${district} जिले में कुल व्यय ₹${(
      exp / 100
    ).toFixed(
      2
    )} करोड़ रुपये रहा। ${completed} कार्य पूरे किए गए और ${ongoing} कार्य जारी हैं। औसत मजदूरी दर ₹${getNumeric(
      data.Average_Wage_rate_per_day_per_person
    ).toFixed(0)} प्रतिदिन रही।`;
  } else if (lang === "bn") {
    return `${month} মাসে ${district} জেলায় মোট ব্যয় ছিল ₹${(
      exp / 100
    ).toFixed(
      2
    )} কোটি টাকা। ${completed}টি কাজ সম্পন্ন হয়েছে এবং ${ongoing}টি কাজ চলছে। গড় মজুরির হার ছিল ₹${getNumeric(
      data.Average_Wage_rate_per_day_per_person
    ).toFixed(0)} প্রতি দিন।`;
  } else if (lang === "te") {
    return `${month} నెలలో ${district} జిల్లాలో మొత్తం ఖర్చు ₹${(
      exp / 100
    ).toFixed(
      2
    )} కోట్లు. ${completed} పనులు పూర్తయ్యాయి మరియు ${ongoing} పనులు జరుగుతున్నాయి. సగటు వేతనం ₹${getNumeric(
      data.Average_Wage_rate_per_day_per_person
    ).toFixed(0)} రోజుకు.`;
  } else if (lang === "ta") {
    return `${month} மாதத்தில் ${district} மாவட்டத்தில் மொத்த செலவு ₹${(
      exp / 100
    ).toFixed(
      2
    )} கோடி. ${completed} பணிகள் முடிக்கப்பட்டன மற்றும் ${ongoing} பணிகள் தொடர்ந்து வருகின்றன. சராசரி கூலி ₹${getNumeric(
      data.Average_Wage_rate_per_day_per_person
    ).toFixed(0)} நாளுக்கு.`;
  }

  // Default English
  return `In ${month}, ${district} district had a total expenditure of ₹${(
    exp / 100
  ).toFixed(
    2
  )} crores. ${completed} works were completed and ${ongoing} works are ongoing. The average wage rate was ₹${getNumeric(
    data.Average_Wage_rate_per_day_per_person
  ).toFixed(0)} per day.`;
};
