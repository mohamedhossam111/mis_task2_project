const { roles } = require("../utils/constants");

function ensureManager(req, res, next) {
  if (req.user.role === roles.admin || req.user.role === roles.manager) {
    next();
  } else {
    req.flash('warning', 'you are not Authorized to see this route');
    res.redirect('/');
  }
}

module.exports = {
  ensureManager,
};
