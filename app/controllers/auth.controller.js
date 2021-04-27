
const admin = require('firebase-admin')
const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


exports.checkIfAuthenticated = (req, res, next) => {
 getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};


// Check the AuthToken in request headers
// function checkAuth(req, res, next) {
//     if (req.headers.authtoken) {
//       admin.auth().verifyIdToken(req.headers.authtoken)
//         .then(() => {
//           next()
//         }).catch(() => {
//           res.status(403).send('Unauthorized')
//         });
//     } else {
//       res.status(403).send('Unauthorized')
//     }
//   }