const config = require('../../config');
const basicAuth = require('express-basic-auth');

module.exports = (app) => {
    app.use('/dash',
        basicAuth({
            users: {
                [config.agendash.user]: config.agendash.password,
            },
            challenge: true,
        }),
        function (req, res, next) {
            console.log('oi oi');
        }
    )
}


// import { Router } from 'express'
// import basicAuth from 'express-basic-auth';
// import agendash from 'agendash'
// import { Container } from 'typedi'
// import config from '../../config'

// export default (app: Router) => {

//   const agendaInstance = Container.get('agendaInstance')

//   app.use('/dash',
//     basicAuth({
// 	  users: {
// 	    [config.agendash.user]: config.agendash.password,
// 	  },
// 	  challenge: true,
// 	}),
// 	agendash(agendaInstance)
//   )
// }
