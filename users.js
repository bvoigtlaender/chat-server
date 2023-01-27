const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const client = new PrismaClient();

const name = [
  'Jan',
  'Bjarne',
  'Dave',
  'Maximilian',
  'Sebastian',
  'Paul',
  'Maria',
  'Anna',
  'Magdalena',
  'Marianne',
  'Walter',
  'Gwendoline',
  'Jim',
  'Schokolade',
  'Bernd',
  'Armin',
  'Donald',
  'Arnd',
  'Ludvig',
  'Kurt',
  'Michael',
  'Leonhard',
  'Pater',
  'Emilia',
  'Jil',
  'Conrad',
  'Johannes',
  'Steven',
  'Stefan',
  'Christel',
  'Fritz',
  'Kannabis'
];

const lastName = [
  'Müller',
  'Walenda',
  'Voigtländer',
  'Deter',
  'Weinardy',
  'Hoffman',
  'Schäfer',
  'Fickmann',
  'Beethoven',
  'Mozart',
  'Cocain',
  'Cobain',
  'White',
  'Black',
  'Jackson',
  'Walter',
  'PPK',
  'Booth',
  'Kirk',
  'Checkow',
  'Ohura',
  'Picard',
  'Christus',
  'Peters',
  'Cook'
];

const does = [
  'schwimt',
  'fickt',
  'isst',
  'guckt star trek',
  'fliegt wie superman...',
  'was willst du?',
  'willst dich prügeln?...',
  'geh nach hause',
  'schlaf gut!',
  'Ich liebe dich<3',
  'Mein Brot schimmelt',
  'Kannst du meinen bruder tö...',
  `Meiner ist ${randomIntFromInterval(10, 40)}cm lang`,
  'Koks macht deine probleme...',
  'Lets make meth',
  'Die drei besten coder der...',
]

function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateUsers() {
  let out = [];

  for (let i = 0; i < 40; i++) {
    const tmpName = name[Math.floor(Math.random() * name.length)];
    const tmpLastName = lastName[Math.floor(Math.random() * lastName.length)];
    const fullName = `${tmpName} ${tmpLastName}`;
    const tmp = {
      username: fullName,
      subtitle: `${does[Math.floor(Math.random() * does.length)]}`,
      avatarURL: `https://robohash.org/${encodeURI(fullName)}?set=set${randomIntFromInterval(1, 4)}`,
    };
    out.push(tmp);
  }
  return out;
}

async function register(email, password) {
  const hash = await bcrypt.hash(password, 10);
  await client.user.create({ data: { email, password: hash } });
}

async function login(email, password) {
  const user = await client.user.findFirst({ where: { email } })
  if (user === null) throw new Error('no user found');

  const result = await bcrypt.compare(password, user.password);
  if (!result) throw new Error('wrong password');

  return user;
}

module.exports = {
  generateUsers,
  login,
  register
}