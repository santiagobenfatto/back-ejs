import { Router } from "express";

const router = Router()

const words = ['test', 'hello', 'coding']
/*

Expresión regular nos permite validar si una cadena
hace match con una condición

*/

// router.get('/:word([a-zA-Z]+)', async (req,res) => {
//     res.send(req.params.word)
// })

router.get('/:word([a-zA-Z%C3%A1]+)', async (req,res) => {
    const { word } = req.params
    res.send(word)
})

router.put('/:word([a-zA-Z%C3%A1]+)', (req,res) => {
    res.send(req.params.word)
})

router.delete('/:word([a-zA-Z%C3%A1]+)', (req, res) => {
    res.send(res.params.word)
})


/* 
    Router.param
*/
router.param('word', (req, res, next, word) => {
    const findWord = words.find(wordDB => wordDB === word)
    if(!findWord) return res.status(404).send('Word not found')
    req.word = findWord
    next()

})

router.get('*', (req, res) => {
    req.statusCode(404).sned('Cannot get specified word')
})

export default router