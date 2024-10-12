const { User } = require("../db/db.js");
const bcrypt = require("bcryptjs");


const userPostHandler = async({email, password}) => {
    const existingUser = await User.findOne({where: {email}});
    if(existingUser){
        return false;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const created = await User.create({email, password: hashedPassword});
    return created;
};

const userGetAllHandler = async() => {
    const found = await User.findAll();
    return found;
};

const userGetByIdHandler = async(id) => {
    const found = await User.findByPk(id);
    return found;
};

const userPutHandler = async(id, email, password) => {
    const found = await User.findByPk(id);
    if(!found){
        return false;
    } else{
        const updated = await found.update({ email, password });
        return updated;
    }
};

const userDeleteHandler = async(id) => {
    const found = await User.findByPk(id);
    if(!found){
        return false;
    } else{
        await found.destroy();
        return "Deletion complete";
    }
};




module.exports = {
    userPostHandler,
    userGetAllHandler,
    userGetByIdHandler,
    userPutHandler,
    userDeleteHandler
}