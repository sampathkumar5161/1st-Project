const jwt =require('jsonwebtoken');
const secret ='sampath@5161';
function setUser(user){
   
    return jwt.sign({
    
        _id: user._id,
     email: user.email,
    role : user.role,   
    },secret);
}

function getUser(token){
    if (!token) return null;
   
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        return null;
    }}

module.exports = {
    setUser,getUser,
};