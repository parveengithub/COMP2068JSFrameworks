module.exports = (req, res) => {
    try {
        if (req.session) {
            req.session.destroy(err => {
                if (err) {
                    res.status(400).send('Unable to Logout')
                } else {
                    res.render('login', { userId: '' });
                }
            })
        } else {
            res.end();
        }
    }
    catch (error) {
        console.log(error);
    }
};