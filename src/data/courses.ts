export type CourseCategory = 'Vor der Geburt' | 'Nach der Geburt' | 'Yoga';

export interface Course {
    readonly id: string;
    readonly name: string;
    readonly description: string;
    readonly url?: string; // Optional: when omitted, fallback to contact
    readonly categories: readonly CourseCategory[];
}

export const courses = [
    {
        id: "babymassage",
        name: "Babymassage",
        description: `Babymassage ist eine liebevolle Art, mit deinem Baby zu kommunizieren.
Die sanften Berührungen unterstützen das Immunsystem, lindern Verdauungsbeschwerden und führen zu einem erholsameren Schlaf.

Mit max. 7 Babys sind die Kurse bewusst klein gehalten, um eine ruhige und entspannte Atmosphäre zu schaffen.

Geeignet für Babys ab 6 Wochen bis ca. 6 Monate.`,
        url: "https://www.hebammeeva.de/kurse",
        categories: ["Nach der Geburt"],
    },
    {
        id: "geburtsvorbereitung",
        name: "Geburtsvorbereitung",
        description:
            "Geburtsvorbereitung für Paare in Nürnberg: Wochenendkurs (Sa/So 10–15 Uhr) im WunderWerk. Teilnahme für Schwangere 30.–36. SSW mit Gebär-PartnerIn. Inhalt: Themen rund um Schwangerschaft, Geburt und Wochenbett, Austausch und praktische Übungen zur selbstbestimmten Geburt.",
        url: "https://gh-erlangen.mymiya.de/courses/#course/select/0001",
        categories: ["Vor der Geburt"],
    },
    {
        id: "krabbelgruppe",
        name: "Krabbelgruppe",
        description:
            "Offene Krabbelgruppen für alle Eltern und Babys, die Lust auf Austausch und Spielen in entspannter Atmosphäre haben. ",
        url: "https://www.hebammeeva.de/krabbelgruppe",
        categories: ["Nach der Geburt"],
    },
    {
        id: "rueckbildung",
        name: "Rückbildung",
        description:
            `In meinem Rückbildungskurs geht es darum, deinen gesamten Körper nach der Geburt zu kräftigen und insbesondere deinen Beckenboden wieder zu festigen. 

In den ersten 60 Minuten werden wir gemeinsam 

Übungen durchgehen, gefolgt von 15 Minuten Entspannung, um den Kurs in Ruhe ausklingen zu lassen.

Nach einer Spontangeburt kann nach ca. 6 Wochen, bei einer Bauchgeburt nach ca. 8 - 10 Wochen mit der Rückbildung begonnen werden.
            `,
        url: "https://www.hebammeeva.de/rueckbildung",
        categories: ["Nach der Geburt"],
    },
    {
        id: "rueckbildungs-yoga",
        name: "Rückbildungs-Yoga",
        description:
            "Sanfte Yoga-Übungen speziell für die Zeit nach der Geburt zur körperlichen und mentalen Regeneration.",
        url: "https://www.praxis-inakauper.de/contact-8",
        categories: ["Nach der Geburt", "Yoga"],
    },
    {
        id: "schwangerschafts-yoga",
        name: "Schwangerschafts-Yoga",
        description:
            "Entspannende Yoga-Praxis für werdende Mütter zur Vorbereitung auf die Geburt.",
        url: "https://www.praxis-inakauper.de/contact-8",
        categories: ["Vor der Geburt", "Yoga"],
    },
    {
        id: "trageberatung",
        name: "Trageberatung",
        description:
            "Gemeinsam gehen wir verschiedene Tragesysteme durch und finden heraus, was am besten zu euch passt. Danach üben wir das sichere und bequeme Tragen, sodass ihr euch beide wohl fühlt und die gemeinsame Zeit genießen könnt.",
        url: "https://www.hebammeeva.de/trageberatung",
        categories: ["Nach der Geburt"],
    },
] as const;

export type CourseId = typeof courses[number]['id'];


