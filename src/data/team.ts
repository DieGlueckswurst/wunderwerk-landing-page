export type TeamCategory = 'hebammen' | 'physiotherapie' | 'osteopathie' | 'other' | 'yoga';

export interface TeamMember {
    id: number;
    name: string;
    role?: string; // e.g., Hebamme, Physiotherapeutin (main profession shown on card)
    categories: TeamCategory[];
    website?: string;
    image?: string; // path relative to public, e.g., /members/name_avatar.png
    comingSoon?: boolean;
    coFounder?: boolean; // Mitgründerin tag
}

export const teamMembers: TeamMember[] = [
    {
        id: 1,
        name: 'Eva Kauper',
        role: 'Hebamme',
        categories: ['hebammen'],
        website: 'https://www.hebammeeva.de/',
        image: '/members/eva/avatar.png',
        coFounder: true,
    },
    {
        id: 2,
        name: 'Ina Kauper',
        role: 'Physiotherapeutin & Yoga',
        categories: ['physiotherapie', 'yoga'],
        website: 'https://www.praxis-inakauper.de/',
        image: '/members/ina/avatar.png',
        coFounder: true,
    },
    {
        id: 5,
        name: 'Greta di Bari',
        role: 'Hebamme',
        categories: ['hebammen'],
        image: '/members/greta/avatar.png',
        website: 'https://www.hebamme-guterstart.de/',
    },
    {
        id: 4,
        name: 'Lisa Moser',
        role: 'Baby & Kinder Physiotherapeutin',
        categories: ['physiotherapie'],
        image: '/members/lisa/avatar.png',
        website: 'https://kinderphysiomoser.de/',
    },
    {
        id: 6,
        name: 'Judith Boier',
        role: 'Hebamme',
        categories: ['hebammen'],
        image: '/members/judith/avatar.png',
        website: 'https://geburtshauserlangen.de/',
    },
    {
        id: 3,
        name: 'Rene Rathmann',
        role: 'Heilpraktiker für Osteopathie',
        categories: ['osteopathie'],
        image: '/members/rene/avatar.png',
        website: 'https://www.osteopathie-rathmann.de/',
    },
    {
        id: 7,
        name: 'Anna Piffl',
        role: 'Yoga',
        categories: ['yoga'],
        website: 'https://www.oceanna.de/',
        image: '/members/anna/anna_avatar.png',
    },
    {
        id: 8,
        name: 'Kelly',
        role: 'Yoga',
        categories: ['yoga'],
        website: 'https://www.instagram.com/__calmminds__',
        image: '/members/kelly/kelly_avatar.png',
    },
];
