const User = require('../models/User');
module.exports = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (user != null && user) {
            res.render('login', { signUpMessage: 'User exists. Please use different username.' });
        }
        else {
            if (req.body.password == req.body.confirmpassword) {
                const userpost = await User.create({ ...req.body });
                console.log(userpost);
                res.render('login', { signUpMessage: 'SignUp Successful. Please login.' });
            }
            else {
                res.render('login', { signUpMessage: 'Password and Confirm Password should be same.' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.redirect('/login');
    }
};