export interface TeamMember {
    id: number;
    name: string;
    role?: string; // e.g., Hebamme, Physiotherapeutin
    category: 'hebammen' | 'physiotherapie' | 'osteopathie' | 'other';
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
        category: 'hebammen',
        website: 'https://www.hebammeeva.de/',
        image: '/members/eva/avatar.png',
        coFounder: true,
    },
    {
        id: 2,
        name: 'Ina Kauper',
        role: 'Physiotherapeutin',
        category: 'physiotherapie',
        website: 'https://www.praxis-inakauper.de/',
        image: '/members/ina/avatar.png',
        coFounder: true,
    },
    {
        id: 5,
        name: 'Greta di Bari',
        role: 'Hebamme',
        category: 'hebammen',
        image: '/members/greta/avatar.png',
        website: 'https://www.hebamme-guterstart.de/',
    },
    {
        id: 4,
        name: 'Lisa Moser',
        role: 'Baby & Kinder Physiotherapeutin',
        category: 'physiotherapie',
        image: '/members/lisa/avatar.png',
        website: 'https://kinderphysiomoser.de/',
    },
    {
        id: 6,
        name: 'Judith Boier',
        role: 'Hebamme',
        category: 'hebammen',
        image: '/members/judith/avatar.png',
        website: 'https://geburtshauserlangen.de/',
    },
    {
        id: 3,
        name: undefined,
        role: 'Osteopathie',
        category: 'osteopathie',
        comingSoon: true,
    },

];
