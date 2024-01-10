Backend application based on express.js and sequelize

Folders content:

/config: contains sequelize configuration file.

/middleware: contains a validationsSchemas folder with schemas which relies on Zod library and files for authorization and authentication.

/migrations: contains a history of modifications to the database .

/models: contains abstraction to represent tables in database and a relation file for the relationships between Sequelize models.

/routes: contains endpoints definition.

/seeders: contains files with scripts to eventually populate database.
