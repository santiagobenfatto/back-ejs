import MongoSingleton from "./singleton.js";

const firtsInstance = MongoSingleton.getInstance()
const secondInstance = MongoSingleton.getInstance()
const thirdInstance = MongoSingleton.getInstance()

/*
    Always we will use two design patterns

    For example: if we need multiple users

    const user = new User()

*/

