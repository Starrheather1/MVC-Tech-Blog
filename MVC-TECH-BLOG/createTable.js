const sequelize = require('./config/connection');
 // Adjust the path as neededconst
  User = require('./models/User');
  // Adjust the path as neededasync 
 async function createTable() { 
      
       try { 
         await sequelize.sync({ force: true }); // This will drop and recreate the table 
            console.log('User table created!'); 
             } catch (error) { 
                 
                    console.error('Error creating User table:', error);
              } finally {   
                   sequelize.close(); // Close the database connection 
                    } 
  }  
createTable();