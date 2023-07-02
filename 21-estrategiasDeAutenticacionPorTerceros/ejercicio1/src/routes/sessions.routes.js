import { Router } from "express";
import passport from "passport";

const router = Router()


/* 
el primer parámetro es el mismo nombre que 
se le colocó en:
passport.use('github', new GitHu..... 

el segundo parametro será para determinar el scope
es decir el atributo que recibiremos del usuario
*/
router.get('/github', passport.authenticate(
    'github',
    { scope:['user:email'] }
    ),
    async (req, res) => {
    res.send({status: 'success', message: 'user registered'})
})

router.get('/github-callback', passport.authenticate(
    'github',
    { failureRedirect:'/login' }
    ), async (req, res) => {
        req.session.user = req.user
        res.redirect('/')
})

export default router