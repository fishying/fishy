/**
 * Created by yuer on 2017/5/27.
 */
import express from 'express'
import { github } from '../controllers/oauth'
import { GithubAuthorize } from '../middleware/oauth'
const router = express.Router()

router.get('/github', GithubAuthorize(github))

export default router