const jwt = require('jsonwebtoken');
const moment = require('moment');
const connection = require('../connection');
const bcrypt = require('bcrypt');
// const mail = require('../mail/mail');

// exports.login = (req, res, next) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     const query = {
//         email
//     }
//     //Check the user exists
//     User.findOne(query, (err, user) => {
//         //Error during exuting the query
//         if (err) {
//             return res.send({
//                 success: false,
//                 message: 'Error, please try again'
//             });
//         }

//         //No User match the search condition
//         if (!user) {
//             return res.send({
//                 success: false,
//                 message: 'Error, Account not found'
//             });
//         }

//         //Check if the password is correct
//         user.isPasswordMatch(password, user.password, (err, isMatch) => {

//             //Invalid password
//             if (!isMatch) {
//                 return res.status(400).send({
//                     success: false,
//                     message: 'Error, Invalid Password'
//                 });
//             }

//             //User is Valid

//             const ONE_WEEK = 604800; //Token validtity in seconds

//             //Generating the token
//             const token = jwt.sign({
//                 user
//             }, process.env.SECRET, {
//                 expiresIn: ONE_WEEK
//             });
//             // console.log(token)
//             //console.log( jwt.decode(token))
//             //User Is Valid
//             //This object is just used to remove the password from the returned fields
//             let returnUser = {
//                 name: user.name,
//                 email: user.email,
//                 id: user._id,
//             }
//             user.password = ""
//             //Send the response back
//             return res.status(200).send({
//                 success: true,
//                 message: 'You are logged in now',
//                 user,
//                 token
//             });
//         });

//     });
// }

// exports.register = (req, res, next) => {

// }
// testing 
// routes/router.js
require ('dotenv').config();
exports.reg= (req, res, next) => {
    var querry="SELECT * FROM user WHERE LOWER(username) = LOWER(?)";
    connection.query(querry, [req.body.username], (err, result) => {
            if (result) {
                return res.status(409).send({
                    msg: 'This username is already in use!'
                });
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            msg: err
                        });
                    } else {
                        // has hashed pw => add to database
                        var querry1 = "INSERT INTO user (nom,prenom,email,password) VALUES (?, ?, ?, ?)";
                        connection.query(querry1, [req.body.nom, req.body.prenom, req.body.email, hash], (err, result) => {
                                if (err) {
                                    throw err;
                                    return res.status(400).send({
                                        msg: err
                                    });
                                }
                                return res.status(201).send({
                                    msg: 'Registered!'
                                });
                            }
                        );
                    }
                });
            }
        }
    );
};
// routes/router.js

exports.login= (req, res, next) => {
    var query="SELECT * FROM user WHERE email =?";
    connection.query(query, [req.body.email], (err, result) => {
        // user does not exists
        if (err) {
          throw err;
          return res.status(400).send({
            msg: err
          });
        }
  
        if (!result.length) {
          return res.status(401).send({
            msg: 'Username or password is incorrect!'
          });
        }
  
        // check password
        bcrypt.compare(
          req.body.password,
          result[0]['password'],
          (bErr, bResult) => {
            // wrong password
            if (bErr) {
              throw bErr;
              return res.status(401).send({
                msg: 'Username or password is incorrect!'
              });
            }
  
            if (bResult) {
              const token = jwt.sign({
                  username: result[0].username,
                  userId: result[0].id,
                    email: result[0].email,
                },
                process.env.SECRET, {
                  expiresIn: '7d'
                }
              );
              return res.status(200).send({
                msg: 'Logged in!',
                token,
                user: result[0]
              });
            }
            return res.status(401).send({
              msg: 'Username or password is incorrect!'
            });
          }
        );
      }
    );
  };