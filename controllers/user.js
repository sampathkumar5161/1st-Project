

const User = require('../models/user');
const {setUser}  = require('../service/auth')


async function handleUserSignup (req,res) {
  const { name,email, password} = req.body;  
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/login');
}
async function handleUserLogin (req,res) {
    try{const { email, password} = req.body;  
      const user = await User.findOne({email,
          password,
      });
      console.log('User',user);
      if(!user){return res.render('login',{
        error : 'invalid username or password'
      }); }

      const token  =setUser(user);
     res.cookie('token',token)
     console.log('token:',token)

     console.log('redirecting to /')
       return res.redirect('/')}
      
        catch (error) {
          console.error('Error during login:', error);
          return res.status(500).render('login', {
            error: 'An error occurred. Please try again.',
          });
        }
      }
      
    

module.exports = {
    handleUserSignup,
    handleUserLogin,
}