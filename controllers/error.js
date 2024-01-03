exports.get404 = (req, res) => {
    return res.render('404',{pageTitle:'404 Not found!',path:null})
}