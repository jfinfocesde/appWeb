import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductValidator from 'App/Validators/ProductValidator';

export default class ProductsController {
  public async viewList({ view }: HttpContextContract) {
    const products = await Product.all();
    return view.render('product/listProduct', { products: products })
  }

  public async viewCreate({ view }: HttpContextContract) {
    return view.render('product/createProduct')
  }

  public async viewUpdate({ view, params }: HttpContextContract) {
    const product = await Product.findOrFail(params.id)
    return view.render('product/updateProduct', { product: product })
  }

  public async apiCreate({ request, response }: HttpContextContract) {
    const payload = await request.validate(ProductValidator)
    await Product.create(payload)
    response.redirect('/product/list')
  }

  public async apiUpdate({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(ProductValidator)
    const product = await Product.findOrFail(params.id)
    product.merge(payload).save()
    response.redirect('/product/list')
  }

  public async apiDelete({ params,response}: HttpContextContract) { 
    const product = await Product.findOrFail(params.id)
    product.delete()
    response.redirect('/product/list')
  }

}
