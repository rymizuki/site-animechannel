import { Express } from 'express'
import indexRouter from './routes/index'
import authRouter  from './routes/auth'
import authenticationRouter from './routes/authentication'
import permissionsRouter from './routes/permissions'
import usersRouter from './routes/users'
import eventsRouter from './routes/events'

export default function (app: Express) {
  app.use('/', indexRouter);
  app.use('/auth', authRouter);
  app.use('/api/authentication', authenticationRouter)
  app.use('/api/permissions', permissionsRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/events', eventsRouter)
}
