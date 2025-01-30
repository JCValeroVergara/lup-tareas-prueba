
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
            name: 'Juan Camilo Giraldo'
        },
        {
            email: 'prueba2@gmail.com',
            password: 'Ab1234',
            name: 'Maria Fernanda Vanegas'
        },
        {
            email: 'prueba3@gmail.com',
            password: 'Ab1234',
            name: 'Pedro Perez'
        }
    ]
}