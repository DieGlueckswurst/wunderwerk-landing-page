---
name: add-team-member
description: Neues Teammitglied (Therapeut:in, Hebamme, Yoga-Lehrer:in …) zur WunderWerk-Landingpage hinzufügen – inkl. freigestelltem Avatar im Hausstil (1x/2x/3x), Eintrag in src/data/team.ts, Tags, Website-Link und ggf. neuer Kategorie bei "Angebot" und im Filter der Über-uns-Seite. Nutzen, wenn jemand "füge X hinzu", "neue Kollegin", "neues Mitglied", "neuer Punkt bei Angebot" o. ä. schreibt.
---

# Neues Teammitglied hinzufügen

## Was alles dazugehört

| Teil | Datei |
|---|---|
| Avatar 96/192/288 px (`avatar.png`, `avatar@2x.png`, `avatar@3x.png`) | `public/members/<vorname>/` |
| Datensatz (Name, Tags, Kategorien, Website, Bild) | `src/data/team.ts` |
| Neue Kategorie (nur falls nötig): Typ `TeamCategory` | `src/data/team.ts` |
| Neue Kategorie: Button + `case` im Switch | `src/components/AngebotSection.tsx` |
| Neue Kategorie: Filter-Button | `src/pages/About.tsx` |
| Optional: Kurse der Person | `src/data/courses.ts` (+ ggf. `src/data/schedule.ts`) |

## Ablauf

### 1. Infos sammeln
- Website der Person lesen. WebFetch wird oft geblockt (403, z. B. Jimdo) → dann im eingebauten Browser öffnen (`preview_start` mit `url`, dann `get_page_text`).
- Daraus ableiten: Berufsbezeichnung, Schwerpunkte, Zielgruppe, ggf. Kurse.
- **Rückfragen an den User** (AskUserQuestion), wenn nicht eindeutig:
  - Passt sie in eine bestehende Kategorie (`hebammen`, `physiotherapie`, `osteopathie`, `heilpraktik`, `yoga`) oder braucht es einen neuen Angebotspunkt? Wie soll der heißen?
  - Mehrere Kategorien? (z. B. Doris: `heilpraktik` + `osteopathie`)
  - Welche Tags auf der Karte (`role`, String oder Array – max. 2–3 kurze Tags)?
  - Mitgründerin (`coFounder`)? Noch nicht da (`comingSoon`)?

### 2. Avatar erzeugen
Bild herunterladen (in den Scratchpad, eigener Ordner), dann:

```bash
.claude/skills/add-team-member/scripts/make_avatar.sh <bild> public/members/<vorname>
```

Das Skript stellt mit `rembg` frei, schneidet automatisch quadratisch um den Kopf, legt die Person auf den warmen radialen Beige-Verlauf (`#F9F2E6` → `#F1E1C6`), schneidet rund aus (Rand transparent) und schreibt 1x/2x/3x.

**Immer visuell prüfen** (`avatar@3x.png` mit Read öffnen, mit z. B. `public/members/rene/avatar@3x.png` vergleichen). Zielbild: Haaransatz oben mit etwas Luft (~14 %), Gesicht mittig, Schultern füllen den unteren Rand. Passt der Auto-Crop nicht, manuell nachjustieren – das Skript gibt den verwendeten Crop aus:

```bash
make_avatar.sh <bild> public/members/<vorname> avatar <größe> <x> <y>
```
Größer = weiter raus gezoomt; `y` kleiner = Person rutscht nach unten.

Bei viel/voluminösem Haar (Locken) misst der Auto-Crop die Kopfbreite zu groß und zoomt zu weit raus. Dann manuell: Haaransatz-Oberkante und Kinn im Original schätzen, `größe ≈ (Kinn − Haaroberkante) / 0,6`, `y = Haaroberkante − 0,14 · größe`, `x = Gesichtsmitte − größe/2` (negative Werte sind erlaubt).

Fotos von Zyro-Websites (`assets.zyrosite.com/cdn-cgi/image/…/<id>/<datei>`) in voller Auflösung laden, indem man den `cdn-cgi/image/…/`-Teil aus der URL entfernt.

Voraussetzungen: `rembg` (CLI, liegt unter `~/.local/bin/rembg`) und ImageMagick 7 (`magick`).

### 3. Datensatz in `src/data/team.ts`
Ans Ende von `teamMembers` anhängen, `id` = höchste bisherige + 1 (die Reihenfolge im Array bestimmt die Anzeige, nicht die id):

```ts
{
    id: 9,
    name: 'Doris Lamatsch',
    role: ['Heilpraktikerin', 'Kinesiologie & Craniosacrale Osteopathie'],
    categories: ['heilpraktik', 'osteopathie'],
    website: 'https://www.dorislamatsch.de/',
    image: '/members/doris/avatar.png',
},
```
`image` zeigt immer auf die 1x-Datei; `@2x`/`@3x` werden in `About.tsx` automatisch per `srcSet` ergänzt – die Dateinamen müssen also exakt `<name>.png`, `<name>@2x.png`, `<name>@3x.png` sein.

### 4. Neue Kategorie (nur wenn nötig)
1. `TeamCategory` in `src/data/team.ts` um die neue ID erweitern (klein, ohne Umlaute).
2. `AngebotSection.tsx`: neuen `case '<id>'` → `navigate('/about?filter=<id>')` und einen Button (Klassen vom Nachbar-Button kopieren). Darauf achten, dass das Raster aufgeht (aktuell 6 Buttons = 3×2).
3. `About.tsx`: Filter-Button kopieren (vor „Yoga“), ID und Label anpassen.

### Mitglied entfernen
1. Eintrag aus `teamMembers` in `src/data/team.ts` löschen.
2. Bildordner löschen: `git rm -r public/members/<vorname>`.
3. Kurse der Person in `src/data/courses.ts` suchen (Name/Website in `description`/`url`) und den User fragen, ob sie mit raus sollen. Falls ja: auch alle Einträge mit dieser `courseId` in `src/data/schedule.ts` entfernen (sonst TypeScript-Fehler).

### 5. Prüfen
- `npx tsc --noEmit -p tsconfig.app.json`
- Dev-Server (`preview_start` mit Name `dev`, Port 8080), dann `/about?filter=<kategorie>` und Startseite `#angebot` ansehen. Achtung: Abschnitte faden ein – Screenshot ggf. kurz später wiederholen.

### 6. Abschluss
Kurz zusammenfassen, was geändert wurde. Commit nur auf Wunsch.
