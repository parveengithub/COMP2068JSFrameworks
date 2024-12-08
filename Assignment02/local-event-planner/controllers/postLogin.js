const User = require('../models/User');
// const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username }).exec();
        console.log("test");
        console.log(user);
        if (user) {
            // const same = await bcrypt.compare(password, user.password);
            // if (same) {
                if(password == user.password){
                req.session.userId = user._id;
                console.log(req.session.userId);
                res.render('dashboard', { userId: req.session.userId });
            } else {
                res.render('login', { message: "Username or Password doesn't match.", userId: '' });
            }
        } else {
            res.render('login', { message: "Username doesn't exist. Please Sign Up.", userId: '' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred during login');
    }
};
