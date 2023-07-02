import { Router } from "express";
import passport from "passport";

const router = Router()

/*El 'register de passport.authenticate('register') proviene
 del primer parametro del passport.use('register'))

 El segundo parámetro del middilewaer passport.authenticate('', {})
 es un objeto con parámetro que redireccionará a la ruta que coloquemos:
                Mas abajo se creó dicha ruta

*/
router.post('/register', passport.authenticate('register', {failureRedirect: 'fail-register'}), async (req, res) => {
    res.send({status: 'succes', message: 'User registered'})
})

router.get('failure-register', async (req, res) => {
    res.send({status: 'error', message: 'Register failed'})
})

router.post('/login', passport.authenticate('login', { failureRedirect: 'fail-login'}), async (req, res) => {
  if(!req.user) return res.status(400).send({status: 'error', error: 'Invalid Credentials'})
    
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email,
    }

    res.send({ status: 'success', message: 'Login success'})
})


router.get('/fail-login', async (req, res) => {
    res.send({status: 'error', message: 'Login Failed'})
})



router.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) return res.status(500).send({status:' error', error: 'Logout Fialed'})
        res.redirect('/')
    })

})


export default router