'use strict'
const Database = use('Database')
const Encryption = use('Encryption')
const moment = require('moment');
const Helpers = use('Helpers')

class QatrosController {

	async allItem ({response}){
		try{
			const data = await Database
				.table('t_product')
				.orderBy('id_produk','ASC')

			return response.json({
				response : 200,
				data : data
			})
		}catch(e){
			return response.json({
				response : 500,
				data : e
			})
		}
	}

	async itemSearch ({response,request}){
		try{
			const Inputs = request.only(['name','kode'])

			let data = []
			if (Inputs.name) {
				data = await Database
					.table('t_product')
					.where('name',Inputs.name)
					.orderBy('id_produk','ASC')
			}else if (Inputs.kode) {
				data = await Database
					.table('t_product')
					.where('id_produk',Inputs.kode)
					.orderBy('id_produk','ASC')
			}else if (Inputs.kode && Inputs.name) {
				data = await Database
					.table('t_product')
					.where('id_produk',Inputs.kode)
					.where('name',Inputs.name)
					.orderBy('id_produk','ASC')
			}
			return response.json({
				response : 200,
				data : data
			})
		}catch(e){
			return response.json({
				response : 500,
				data : e
			})
		}
	}

	async itemKode ({response,request}){
		try{
			const Inputs = request.only(['kode'])
			
			const data = await Database
					.table('t_product')
					.where('id_produk',Inputs.kode)
					.first()

			return response.json({
				response : 200,
				data : data
			})
		}catch(e){
			return response.json({
				response : 500,
				data : e
			})
		}
	}

	async insertData ({response,request}){
		try{
			const Inputs = request.only(['name','description'])

			const cek = await Database
				.table('t_product')
				.where('name',Inputs.name)
				.count()
				.first()

			if (cek.count == 0) {
				let tanggal =  moment().format('DDMMY')

				const lastId = await Database
					.select(Database.raw('substr(id_produk,10,12) as id_produk'))
				    .from('t_product')
				    .orderBy(Database.raw('substr(id_produk,10,12)'), 'desc')
				    .first();

				let id_produk = ++lastId.id_produk
				
				let jumlah = String(id_produk).length

				let tmp = ''
				for (var i = 1; i <= 3- parseInt(jumlah); i++) {
					tmp = tmp + '0' 
				}

				let id = null;

				if (lastId ) {
				  id = 'P'+ tanggal + tmp + id_produk;
				} else {
				  id = 'P'+ tanggal +'001';
				}

				const insert = await Database
					.table('t_product')
					.insert({
						id_produk   : id,
						name        : Inputs.name,
						description : Inputs.description
					})

				if (insert) {
					return response.json({
						response : 201,
						data : 'Data Telah Tersimpan'
					})
				}
			}else{
				return response.json({
					response : 201,
					data : 'Nama Telah Tersedia'
				})
			}

		}catch(e){
			return response.json({
				response : 500,
				data : e
			})
		}
	}

	async updateData ({response,request}){
		try{
			const Inputs = request.only(['id_produk','name','description'])

			const update = await Database
				.table('t_product')
				.where('id_produk',Inputs.id_produk)
				.update({
					name        : Inputs.name,
					description : Inputs.description
				})

			if (update) {
				return response.json({
					response : 200,
					data : 'Data Berhasil Di Update'
				})
			}

		}catch(e){
			return response.json({
				response : 500,
				data : e
			})
		}
	}

	async hapusData ({response,request}){
		try{
			const Inputs = request.only(['id_produk'])

			const hapus = await Database
				.table('t_product')
				.where('id_produk',Inputs.id_produk)
				.delete()

			if (hapus) {
				return response.json({
					response : 200,
					data : 'Data Berhasil Di Hapus'
				})
			}

		}catch(e){
			return response.json({
				response : 500,
				data : e
			})
		}
	}

}

module.exports = QatrosController