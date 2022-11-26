/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('index')
}).middleware('auth')

Route.get('/about', async ({ view }) => {
  return view.render('about')
}).middleware('auth')

Route.group(() => {
  Route.get('/login', 'AuthController.viewLogin')
  Route.get('/register', 'AuthController.viewRegister')
  Route.get('/logout', 'AuthController.apiLogout')
  Route.post('/login', 'AuthController.apiLogin')
  Route.post('/register', 'AuthController.apiRegister')
}).prefix('auth')


Route.group(() => {
  Route.get('/list', 'ProductsController.viewList')
  Route.get('/create', 'ProductsController.viewCreate')
  Route.get('/update/:id', 'ProductsController.viewUpdate')
  Route.get('/delete/:id', 'ProductsController.apiDelete')
  Route.post('/create', 'ProductsController.apiCreate')
  Route.post('/update/:id', 'ProductsController.apiUpdate') 
}).prefix('product').middleware('auth')
