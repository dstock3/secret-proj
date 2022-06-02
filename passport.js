const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const initPassport = (passport, userByEmail, userById) => {
  const authenticateUser = async (email, password, done) => {
    const user = userByEmail(email)

    if (user == null) { return done(null, false, { message: 'No user with that email' })}

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, userById(id))
  })
}

module.exports = initPassport