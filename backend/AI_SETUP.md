# AI Feature Setup Guide

## Overview

The AI feature has been integrated successfully! The system can now generate AI-powered explanations of monthly MGNREGA data in 22 different languages.

## Backend Setup

### 1. Get Google Generative AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key

### 2. Create Environment File

Create a `.env` file in the `backend` directory:

```bash
cd backend
```

Create `.env` file with the following content:

```
GOOGLE_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your actual Google API key.

### 3. Start Backend Server

```bash
npm run dev
```

The backend will run on `http://localhost:3000`

## Frontend Integration

The frontend has been updated with:

1. **AI Service** (`frontend/src/services/ai.service.js`)

   - Handles API calls to the backend
   - Maps language codes correctly (e.g., 'or' → 'odia')

2. **MonthlyDataCard Component** (`frontend/src/components/MonthlyDataCard.jsx`)
   - Added "Get AI Explanation" button
   - Shows loading state while generating
   - Displays AI explanation in the selected language
   - Error handling for failed requests

## How It Works

1. **User selects a language** from the dropdown (e.g., Odia, Hindi, Bengali)
2. **User clicks "Get AI Explanation"** button
3. **Frontend sends request** to backend with:
   ```json
   {
     "content": {
       "language": "odia",
       "data": {
         /* monthly data */
       }
     }
   }
   ```
4. **Backend calls Google Generative AI** with the data
5. **AI generates explanation** in the selected language
6. **Frontend displays** the explanation to the user

## Supported Languages

The system supports all 22 scheduled languages of India:

- Hindi (hi) → hindi
- English (en) → english
- Bengali (bn) → bengali
- Telugu (te) → telugu
- Marathi (mr) → marathi
- Tamil (ta) → tamil
- Urdu (ur) → urdu
- Gujarati (gu) → gujarati
- Kannada (kn) → kannada
- Odia (or) → odia
- Malayalam (ml) → malayalam
- Punjabi (pa) → punjabi
- Assamese (as) → assamese
- Nepali (ne) → nepali
- Sanskrit (sa) → sanskrit
- Sindhi (sd) → sindhi
- Kashmiri (ks) → kashmiri
- Konkani (kok) → konkani
- Manipuri (mni) → manipuri
- Maithili (mai) → maithili
- Bodo (brx) → bodo
- Dogri (doi) → dogri

## API Endpoint

**POST** `/api/ai/ai-response`

**Request Body:**

```json
{
  "content": {
    "language": "odia",
    "data": {
      "fin_year": "2023-2024",
      "month": "Nov",
      "state_name": "WEST BENGAL",
      "district_name": "PURBA MEDINIPUR"
      // ... other fields
    }
  }
}
```

**Response:**

```json
{
  "success": true,
  "message": "AI response generated successfully",
  "response": "AI-generated explanation text..."
}
```

## Testing

1. Start the backend server
2. Start the frontend server (`cd frontend && npm run dev`)
3. Navigate to the home page
4. Select a state and district
5. Choose a language from the dropdown
6. Click "Get AI Explanation" button
7. Wait for the AI-generated explanation

## Troubleshooting

### Error: "GOOGLE_API_KEY not found"

- Make sure you've created the `.env` file in the backend directory
- Ensure the API key is correct

### Error: "Failed to get AI explanation"

- Check if the backend server is running
- Verify the Google API key is valid
- Check browser console for detailed error messages

### API not responding

- Ensure `GOOGLE_API_KEY` environment variable is set
- Restart the backend server after setting the API key

## Notes

- The AI feature uses Google's Generative AI (Gemini 2.0 Flash)
- Each API call may take 2-5 seconds depending on the data size
- The explanation is generated dynamically based on the data and language selected
- No caching is implemented yet - each request generates a fresh explanation
