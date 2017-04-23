import express from 'express'
import { article } from '../../controllers'

import passport from '../../server/passport'
const router = express.Router()

router
    .post('/article', passport.authenticateMiddleware(), (req, res) => {article.GetAll(req, res, true)})
    .post('/article/:id', passport.authenticateMiddleware(), (req, res) => {article.GetOne(req, res, true)})
    .post('/article/slug/:slug', passport.authenticateMiddleware(), (req, res) => {article.GetOne(req, res, true)})

export default router