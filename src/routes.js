import fetch from 'isomorphic-fetch'
import { Router } from 'express';
import { getDept, getAllDeptCodes } from './coursesAPI/coursesAPI'
import { createFileName } from './coursesAPI/constants'
require('dotenv').config()

const routes = Router();

routes.get('/', (req, res) => {
  if (process.env.BUILD === 'PRODUCTION') {
    res.render('index', { title: 'Course Section Generator', append: '/course-scheduler-generator' });
  } else res.render('index', { title: 'Course Section Generator' });
});

routes.get('/deptCodes', (req, res) => {
  getAllDeptCodes().then(x => res.send(x))
})

routes.get('/sections', (req, res) => {
  const dept = req.query.codes
  const arrayOfDepts = dept.split(' ')
  console.log(req.headers.host)
  getDept(arrayOfDepts).then(x => {
    res.send('https://' + req.headers.host + '/course-scheduler-generator' + '/output/' + createFileName(arrayOfDepts) + '.csv')
  })
})

export default routes;
