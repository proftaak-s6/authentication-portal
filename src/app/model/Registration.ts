export default class Registration {
    birthday: string;
    bsn: string;
    email: string;
    password: string;
    phoneNumber: string;
    username: string;
    zipCode: string;
    roles: string[] = ["user"] 
    // Er kan alléén geregistreerd worden met de basisrol 'user'. 
    // Door een admin kan je toegevoegd worden aan een of meerdere van de portals. [overheid, bestuurder en/of politie]
}