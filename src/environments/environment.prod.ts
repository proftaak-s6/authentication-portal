export const environment = {
  production: true,
  jwt: {
    secret: ''
  },
  services: {
    authentication: {
      url: 'http://auth.fontys-project.nl'
    },
  },
  redirects: {
    driver: 'http://mijn.rekeningrijden.fontys-project.nl',
    government: 'http://overheid.rekeningrijden.fontys-project.nl',
    police: 'http://portal.rekeningrijden.fontys-project.nl'
  }
};
