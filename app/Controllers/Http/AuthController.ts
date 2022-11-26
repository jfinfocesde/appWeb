import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import AuthValidator from 'App/Validators/AuthValidator'

export default class AuthController {
  public async viewLogin({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async viewRegister({ view }: HttpContextContract) {
    return view.render('auth/register')
  }

  public async apiLogin({ request, response, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    try {
      await auth.use('web').attempt(email, password)
      response.redirect('/')
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }

  public async apiRegister({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(AuthValidator);
      await User.create(payload)
      response.redirect('/')
    } catch (error) {
      response.badRequest(error)
    }
  }

  public async apiLogout({ response, auth }: HttpContextContract) {
    await auth.use('web').logout()
    response.redirect('/')
  }

}
