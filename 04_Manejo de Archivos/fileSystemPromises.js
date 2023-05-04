const fs = require('fs')

const asyncFiles = async () => {
    try {
        await fs.promises.writeFile('./fs-promises.txt', 'Writing content promises')

        let result = await fs.promises.readFile('./fs-promises.txt', 'utf-8')
        console.log(result)

        await fs.promises.appendFile('./fs-promises.txt', '\nMore conteeeent (:')

        result = await fs.promises.readFile('./fs-promises.txt', 'utf-8')
        console.log(result)

        await fs.promises.unlink('./fs-promises.txt')
    }catch(error){console.log(error)}

}

asyncFiles()