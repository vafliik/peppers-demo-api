'use strict';
const express = require('express');
const router = express.Router();
const users = require('./data').users;
const peppers = require('./data').peppers;
const {
  authenticate,
  hashPass,
  uniqueEmail,
  createToken,
  findUser,
  validPass,
} = require('./utils');

//WARNING NOT SANITIZING USER or pepper DATA

//USER routes for registering and logging in
router.post('/users/register', uniqueEmail, hashPass, (req, res) => {
  //email is unique and the password has been hashed
  //register new user
  let newUser = {
    _id: Date.now(),
    email: req.body.email,
    password: req.body.hashedPassword,
  };
  users.push(newUser);
  console.log(users);
  res.status(201).send({ _id: newUser._id, email: newUser.email });
});

router.post('/users/login', findUser, validPass, (req, res) => {
  //user is logging in to get a token
  //middleware findUser adds `user` to req object
  //validPass will confirm password it is valid
  //we have a matching user, create the token
  let token = createToken(req.user._id);
  res.status(200).send({ token });
});

//PEPPER routes - all need a valid token: use authenticate
router.get('/peppers', (req, res) => {
  // GET /api/peppers - send ALL the peppers that belong to current user
  res.status(200).send(peppers);
});

router.get('/peppers/:id', (req, res) => {
  // GET /api/peppers/id - send the details about ONE pepper
  // if the owner matches req.user.id
  let pepperID = req.params.id;
  let pepperMatch = peppers.find(
    (pepper) => pepper._id === pepperID
  );
  console.log(pepperID);
  if (pepperMatch) {
    res.status(200).send(pepperMatch);
  } else {
    res.status(400).send({
      error: { code: 147, message: 'No match for specified pepper id.' },
    });
  }
});

router.post('/peppers', (req, res) => {
  // POST /api/peppers - add a pepper
  let newpepper = {
    _id: peppers.slice(-1)[0]._id + 1,
    name: req.body.name,
    strength: req.body.strength,
  };
  peppers.push(newpepper);
  console.log(peppers);
  res.status(201).send( { _id: newpepper._id, name: newpepper.name, strength: newpepper.strength });
});

router.delete('/peppers/:id', authenticate, (req, res) => {
  // DELETE /api/peppers - delete a specific pepper
  // user id from the token
  let pepperID = parseInt(req.params.id);
  let userID = parseInt(req.user._id)
  console.log(pepperID);
  let idx = peppers.findIndex(
    (pepper) => pepper._id === pepperID
  );
  if (idx > -1) {
    peppers.splice(idx, 1);
    res.status(200).send({ _id: pepperID, message: 'Delete Success' });
  } else {
    res.status(400).send({ error: { code: 258, message: 'Invalid pepper id' } });
  }
});

module.exports = router;
