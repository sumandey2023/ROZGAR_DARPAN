# Rozgar Darpan Frontend

MGNREGA District-wise Data Portal Frontend

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx      # Navigation and layout wrapper
│   ├── StateDistrictSelector.jsx  # Dropdown for state/district selection
│   └── DataDisplay.jsx # Table to display district data
├── pages/              # Page components
│   ├── Home.jsx        # Main page with search functionality
│   └── About.jsx       # About page
├── data/               # Static data
│   └── states-districts.json  # States and districts data
├── App.jsx             # Main app component with routing
└── main.jsx           # App entry point
```

## Features

- ✅ Modular component structure
- ✅ State and District dropdown selection
- ✅ Financial Year and Month filters
- ✅ Backend integration ready
- ✅ React Router for navigation
- ✅ Tailwind CSS for styling
- ✅ Responsive design

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will run on `http://localhost:5173`

### Production Build

```bash
npm run build
```

## API Integration

The frontend is configured to connect to the backend at:

```
http://localhost:3000/api/district/get-or-fetch
```

Make sure your backend server is running before using the frontend.

## Adding More States/Districts

Edit `src/data/states-districts.json` to add more states and districts.
