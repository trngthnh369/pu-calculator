## PU Calculator – Polyurethane Support Mass Calculator

PU Calculator is a responsive web application for **engineering teams** to quickly compute the **required mass of polyurethane (PU) chemicals** (POLYOL and ISOCYANATE) used to cast PU support pads / bearings.

The tool encapsulates the geometric formulas and density-based mass calculations behind a clean UI so that operators only need to enter a few key dimensions and density to obtain reliable, repeatable results.

---

### Features

- **Interactive mold type selection**
  - Circular mold
  - U-shaped / saddle mold
- **Dimensional input**
  - Thickness (mm)
  - Outer diameter (mm)
  - Length (mm)
- **Material density configuration**
  - Adjustable density (kg/m³), with sensible defaults
- **Preset molds**
  - Frequently used mold configurations available as presets
  - One‑click apply to populate all dimension fields
- **Result summary**
  - POLYOL mass (kg)
  - ISOCYANATE mass (kg)
  - Contact area (m²)
  - Volume (m³)
  - Finished product mass (kg)
  - Required mass of chemicals (kg)
- **Modern UX**
  - Animated segmented control and result cards
  - Result overlay for quick review after each calculation
  - Layout fully responsive using percentage / viewport‑based sizing

---

### Tech Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript, React
- **Styling**: Tailwind CSS + custom global styles (`src/app/globals.css`)
- **Animation**: Framer Motion
- **Icons**: `lucide-react` + custom SVG icons

---

### Getting Started (Development)

#### 1. Install dependencies

```bash
npm install
# or
yarn
```

#### 2. Run the development server

```bash
npm run dev
# or
yarn dev
```

By default the app runs at:

- `http://localhost:3000`

---

### Project Structure (Relevant Parts)

- `src/app/page.tsx` – Entry point that renders the calculator experience.
- `src/components/Calculator/PUCalculator.tsx` – Main PU calculator container, state management and layout.
- `src/components/Calculator/Header.tsx` – Top navigation / title bar.
- `src/components/Calculator/SegmentedControl.tsx` – Mold type selector.
- `src/components/Calculator/ParameterInputCard.tsx` – Reusable cards for thickness, outer diameter, and length.
- `src/components/Calculator/QuickSelectChip.tsx` – Quick option chips for common values.
- `src/components/Calculator/ResultCard.tsx` – Animated result display cards.
- `src/components/Calculator/SettingsPanel.tsx` – Density configuration.
- `src/components/Calculator/PresetsPanel.tsx` – Frequently used molds.
- `src/lib/calculations.ts` – Core calculation logic (geometry + mass).
- `src/lib/presets.ts` – Predefined presets.
- `src/lib/types.ts` – Shared TypeScript types.

---

### Responsive Design Notes

The UI is designed to remain visually consistent across screen sizes:

- Layout padding and gaps use `%`, `vw`, and `vh` units where appropriate.
- The main calculator wrapper (`PUCalculator`) uses `min-h-screen` and flexbox to ensure **Header + Main** always fill the viewport height.
- `globals.css` sets `html, body` to `height: 100%` and `min-height: 100vh` for correct full‑screen behavior.

---

### Production Build

To create an optimized production build:

```bash
npm run build
npm run start
```

Deploy the output on any platform that supports Node.js / Next.js (e.g. Vercel, Docker‑based hosting, or your own infrastructure).

---

### License

This project is proprietary to its author/organization.  
Please contact the maintainers before reusing or distributing the code.
