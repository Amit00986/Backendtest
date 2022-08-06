const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const db = require("../config/db.js");
const userMiddleware = require("../middleware/user.js");
const { hash } = require('bcryptjs');

// https://localhost:3000/api/signup
router.post("/sign-up", userMiddleware.validateUsers, (req, res, next)  => {
    db.query (
        `SELECT id FROM users WHERE LOWER(username) = LOWER(${req.body.username})`,
        (err, result) => {
            if(result.length)
            {
                return res.status(409).send ({
                message: "This is duplicate user",
                });
           } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    throw err;
                    return res.status(500).send({
                        message: err,
                    });
                }else {
                    db.query (
                        `INSERT INTO users (id, username , password , Email, DOB) VALUES ('${uuid.v4()}', '${db.escape(
                             req.body.username
                        )}', '${hash}', '${db.escape(req.body.Email)}', ${db.escape(req.body.DOB)}');`,
                          (err, result) => {
                            if(err) {
                                throw err;
                                return res.status(400).send({
                                    message: err,
                                });
            
                            }
                            return res.status(201).send({
                                message : "Registred",
                            });
                          }
                        )
                };
            })
           }
        }
    )

});


// https://localhost:3000/api/signup
router.post("login", (req, res, next) => {
    db.query (
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            if(err){
                throw err;
                return res.status(400).send ({
                    message : err,

                });

            }
            if(!result.length) {
                return res.status(400).send({
                    message : "Useraname or password Incorrect",
                });
            }
            bcrypt.compare(
                req.body.password, 
                result[0]["password"],
                (bERR, bResult) => {
                    if(bERR){
                        throw bERR;
                        return res.status(400). send ({
                            message:"Useraname or password Incorrect",
                        });
                    }

                    if(bResult) {
                        // pswd match
                        const token = jwt.sign(
                            {
                                username: result[0].username,
                                userId: result.id,
                            },
                            "SECRETKEY",
                            {expiresIn: "7d"}

                        );
                        return res.status(200).send ({
                            message : "Logged In!",
                            token,
                            user: result[0]
                        })
                    }
                    return res.status(400). send ({
                        message:"Useraname or password Incorrect",
                    });

                }
            )
        }

    )
});


// https://localhost:3000/api/signup
router.get("/secret-route", (req, res, next) => {})

module.exports = router;
