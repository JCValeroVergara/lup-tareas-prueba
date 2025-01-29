
interface SeedUsers {
    email: string;
    password: string;
    name: string;
}

interface SeedData {
    users: SeedUsers[];
}

export const initialSeedData: SeedData = {
    users: [
        {
            email: 'prueba1@gmail.com',
            password: 'Ab1234',
            name: 'Usuario de Prueba 1'
        },
        {
            email: 'prueba2@gmail.com',
            password: 'Ab1234',
            name: 'Usuario de Prueba 2'
        },
        {
            email: 'prueba3@gmail.com',
            password: 'Ab1234',
            name: 'Usuario de Prueba 3'
        }
    ]
}