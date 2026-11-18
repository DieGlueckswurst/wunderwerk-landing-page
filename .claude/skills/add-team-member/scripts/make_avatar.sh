#!/usr/bin/env bash
# Erzeugt Team-Avatare im WunderWerk-Stil:
#   freigestellte Person auf warmem, radialem Beige-Verlauf, runder Ausschnitt,
#   transparenter Rand, 96 / 192 / 288 px (1x / 2x / 3x).
#
# Nutzung:
#   make_avatar.sh <eingabebild> <zielordner> [basename] [crop_size crop_x crop_y]
#
#   basename   Standard: avatar  ->  avatar.png, avatar@2x.png, avatar@3x.png
#   crop_*     Optional: quadratischer Ausschnitt (in Pixeln des Originals).
#              Ohne Angabe wird automatisch um den Kopf herum zugeschnitten.
#
# Benötigt: rembg (CLI), ImageMagick 7 (magick)
set -euo pipefail

IN="$1"
OUT_DIR="$2"
BASE="${3:-avatar}"
CROP_SIZE="${4:-}"
CROP_X="${5:-}"
CROP_Y="${6:-}"

# Farben aus den bestehenden Avataren gesampelt (Mitte hell -> Rand etwas dunkler)
BG_CENTER="#F9F2E6"
BG_EDGE="#F1E1C6"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

mkdir -p "$OUT_DIR"

# 1) Freistellen
magick "$IN" -alpha on PNG32:"$WORK/in.png"
rembg i "$WORK/in.png" "$WORK/cut.png" >/dev/null 2>&1

W=$(magick identify -format "%w" "$WORK/cut.png")
H=$(magick identify -format "%h" "$WORK/cut.png")

# 2) Ausschnitt bestimmen
if [[ -z "$CROP_SIZE" ]]; then
  # Bounding-Box der Person
  read -r BW BH BX BY < <(magick "$WORK/cut.png" -alpha extract -threshold 50% \
    -format "%@\n" info: | sed -E 's/([0-9]+)x([0-9]+)\+([0-9]+)\+([0-9]+)/\1 \2 \3 \4/')
  # Kopfbereich ~ obere 30 % der Person -> horizontale Mitte + Kopfbreite
  HEAD_H=$(( BH * 30 / 100 ))
  read -r HW _ HX _ < <(magick "$WORK/cut.png" -crop "${W}x${HEAD_H}+0+${BY}" +repage \
    -alpha extract -threshold 50% -format "%@\n" info: \
    | sed -E 's/([0-9]+)x([0-9]+)\+([0-9]+)\+([0-9]+)/\1 \2 \3 \4/')
  CENTER_X=$(( HX + HW / 2 ))
  CROP_SIZE=$(( HW * 19 / 10 ))           # Kopfbreite * 1.9
  CROP_X=$(( CENTER_X - CROP_SIZE / 2 ))
  CROP_Y=$(( BY - CROP_SIZE * 14 / 100 )) # ~14 % Luft über dem Haar
fi

# 3) Person auf quadratische Leinwand legen (Ränder transparent auffüllen, falls Crop übers Bild hinausgeht)
magick -size "${CROP_SIZE}x${CROP_SIZE}" xc:none \
  \( "$WORK/cut.png" -crop "${CROP_SIZE}x${CROP_SIZE}+${CROP_X}+${CROP_Y}" \) \
  -geometry "+$(( CROP_X < 0 ? -CROP_X : 0 ))+$(( CROP_Y < 0 ? -CROP_Y : 0 ))" \
  -composite "$WORK/person.png"

# 4) Hintergrund + runde Maske in hoher Auflösung, dann herunterskalieren
S=864
magick -size ${S}x${S} radial-gradient:"${BG_CENTER}-${BG_EDGE}" "$WORK/bg.png"
magick "$WORK/person.png" -resize ${S}x${S} "$WORK/person_s.png"
magick -size ${S}x${S} xc:black -fill white -draw "circle $((S/2)),$((S/2)) $((S/2)),1" "$WORK/mask.png"
magick "$WORK/bg.png" "$WORK/person_s.png" -composite \
  "$WORK/mask.png" -alpha off -compose CopyOpacity -composite PNG32:"$WORK/full.png"

magick "$WORK/full.png" -filter Lanczos -resize 288x288 -strip PNG32:"$OUT_DIR/${BASE}@3x.png"
magick "$WORK/full.png" -filter Lanczos -resize 192x192 -strip PNG32:"$OUT_DIR/${BASE}@2x.png"
magick "$WORK/full.png" -filter Lanczos -resize 96x96   -strip PNG32:"$OUT_DIR/${BASE}.png"

echo "Crop: ${CROP_SIZE} ${CROP_X} ${CROP_Y}"
echo "Geschrieben: $OUT_DIR/${BASE}.png, ${BASE}@2x.png, ${BASE}@3x.png"
