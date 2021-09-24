require('dotenv').config();
const config = {
    host: process.env.HOST_EMAIL,
    port: process.env.PORT_EMAIL,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL,
    },
    secure: false,
    tls:{
        rejectUnauthorized: false,
    }
};

export {config};