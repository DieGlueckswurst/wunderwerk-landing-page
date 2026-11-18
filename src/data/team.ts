export type TeamCategory = 'hebammen' | 'physiotherapie' | 'osteopathie' | 'heilpraktik' | 'other' | 'yoga';

export interface TeamMember {
    id: number;
    name: string;
    role?: string | string[]; // e.g., Hebamme, Physiotherapeutin (main profession shown on card)
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
        role: ['Heilpraktiker', 'Osteopath für Erwachsene & Kinder'],
        categories: ['osteopathie'],
        image: '/members/rene/avatar.png',
        website: 'https://www.osteopathie-rathmann.de/',
    },
    {
        id: 9,
        name: 'Doris Lamatsch',
        role: ['Heilpraktikerin', 'Kinesiologie & Craniosacrale Osteopathie'],
        categories: ['heilpraktik', 'osteopathie'],
        website: 'https://www.dorislamatsch.de/',
        image: '/members/doris/avatar.png',
    },
    {
        id: 10,
        name: 'Franziska Bündner',
        role: ['Hebamme', 'Geburtsvorbereitung'],
        categories: ['hebammen'],
        website: 'https://www.hebamme-franziska-buendner.de/',
        image: '/members/franzi/avatar.png',
    },
    {
        id: 11,
        name: 'Zoe Kusche',
        role: ['Hebamme', 'Geburtsvorbereitung'],
        categories: ['hebammen'],
        website: 'https://hebamme-zoe-kusche.de/',
        image: '/members/zoe/avatar.png',
    },
];
