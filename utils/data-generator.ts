import faker from 'faker-br';

export function generateUserData() {
  const name = faker.name.findName();
  const randomStr = Math.random().toString(36).substring(2, 10);
  const email = `teste.qa.frenet.${randomStr}@gmail.com`;

  const cellphone = faker.phone.phoneNumber('##9########');

  const password = `Frenet@${Math.floor(100000 + Math.random() * 900000)}`;

  return {
    name,
    email,
    cellphone,
    password,
  };
}
