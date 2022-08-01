const csurf = require("csurf");

const csurfInstance = csurf({ cookie: { httpOnly: true, secure: false } });

module.exports = (req, res, next) => {
    csurfInstance(req, res, (err) => {
        const SKIP = ["/authentication/login", "/authentication/register", "/authentication/user"];

        if(req.method === "GET" || SKIP.includes(req.path)) {
            next();
        }
        else {
            if(err && err.code === "EBADCSRFTOKEN")
                {console.log(err);
                return res.status(405).json({message:"Access Denied - Bad CSRF Token"})
                }
            else
                next();
        }
    });
}