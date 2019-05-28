const helpers = {
  getUserData: (session) => {
    const { passport } = session;
    return passport && passport.user
  }
};

module.exports = helpers;