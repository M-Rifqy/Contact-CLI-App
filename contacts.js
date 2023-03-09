const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// Create folder
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Create file inside the folder if the file isn't exist
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const simpanContact = (name, email, phone) => {
  const contact = { name, email, phone };
  const contacts = loadContact();

  // Check if duplicate
  const duplikat = contacts.find((contact) => contact.name === name);
  if (duplikat) {
    console.log(
      chalk.red.inverse.bold('Contact already registered, use another name!')
    );
    return false;
  }

  // Check e-mail
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse.bold('Invalid e-mail!'));
      return false;
    }
  }

  // Check phone number
  if (!validator.isMobilePhone(phone, 'id-ID')) {
    console.log(chalk.red.inverse.bold('Invalid mobile number!'));
    return false;
  }

  contacts.push(contact);

  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts, null, 4));

  console.log(chalk.green.inverse.bold('Data inserted succesfully'));
};

const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.cyan.inverse.bold('Contact List :'));
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

const detailContact = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.trim().toLowerCase() === name.trim().toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse.bold(`"${name}" not found!`));
    return false;
  }

  console.log(chalk.greenBright.inverse.bold(contact.name));
  console.log(contact.phone);
  if (contact.email) {
    console.log(contact.email);
  }
};

const deleteContact = (name) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.name.trim().toLowerCase() !== name.trim().toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse.bold(`"${name}" not found!`));
    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts, null, 4));

  console.log(
    chalk.green.inverse.bold(
      `${name}'s contact data has been deleted successfully `
    )
  );
};

module.exports = {
  simpanContact: simpanContact,
  listContact: listContact,
  detailContact: detailContact,
  deleteContact: deleteContact,
};
