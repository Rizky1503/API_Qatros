'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Helpers = use('Helpers')

Route.group(() => {
	Route.get('Allitem', 'QatrosController.allItem')
	Route.post('ItemNameKode', 'QatrosController.itemSearch')
	Route.post('itemKode', 'QatrosController.itemKode')
	Route.post('insertData', 'QatrosController.insertData')
	Route.post('updateData', 'QatrosController.updateData')
	Route.post('hapusData', 'QatrosController.hapusData')
}).prefix('api/qatros/')


