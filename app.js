const yargs = require('yargs'); //Manage CLI arguments
const contacts = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Adding New Contact',
    builder: {
      name: {
        describe: 'Full name',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      phone: {
        describe: 'Nomor Handphone',
        demandOption: false,
        type: 'string',
      },
    },
    handler(argv) {
      contacts.simpanContact(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// Displaying name & phone list
yargs.command({
  command: 'list',
  describe: 'Displaying name & phone list',
  handler() {
    contacts.listContact();
  },
});

// Displaying contact detail by name
yargs.command({
  command: 'detail',
  describe: 'Displays the details of a contact by name',
  builder: {
    name: {
      describe: 'Full name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

// Delete Contact by name
yargs.command({
  command: 'delete',
  describe: 'Deletes contact by name',
  builder: {
    name: {
      describe: 'Full name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});


yargs.parse();
