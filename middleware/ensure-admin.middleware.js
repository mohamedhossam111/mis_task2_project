const { roles } = require("../utils/constants");

function ensureAdmin(req, res, next) {
  if (req.user.role === roles.admin) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}

module.exports = {
  ensureAdmin,
};
