export interface TeamMember {
    id: number;
    name: string;
    role?: string; // e.g., Hebamme, Physiotherapeutin
    category: 'hebammen' | 'physiotherapie' | 'osteopathie' | 'other';
    website?: string;
    image?: string; // path relative to public, e.g., /members/name.webp
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
        image: '/members/eva.webp',
        coFounder: true,
    },
    {
        id: 2,
        name: 'Ina Kauper',
        role: 'Physiotherapeutin',
        category: 'physiotherapie',
        website: 'https://www.praxis-inakauper.de/',
        image: '/members/ina.webp',
        coFounder: true,
    },
    {
        id: 5,
        name: 'Greta di Bari',
        role: 'Hebamme',
        category: 'hebammen',
        image: '/members/greta.png',
        website: 'https://www.hebamme-guterstart.de/',
    },
    {
        id: 3,
        name: undefined,
        role: 'Osteopathie',
        category: 'osteopathie',
        comingSoon: true,
    },
];


