import { NextFunction, Request, Response } from 'express';
import { Post } from '../../../decorators/routing';
import authService from '../services/Auth.Service';
import BaseController from '../../../app/Base.Controller';
import { Middlewares } from '../../../decorators/middleware';
import signupValidations from '../validations/signupValidations';
import signinValidations from '../validations/signinValidations';
import AuthLimiter from '../middlewares/rateLimitMiddleware';
import { ValidateBody } from '../../../decorators/validator';
import Controller from '../../../decorators/controller';

@Controller('auth')
export class AuthController extends BaseController {
  @Post('signup')
  @Middlewares([AuthLimiter])
  @ValidateBody(signupValidations)
  async SignUp(req: Request, res: Response, next: NextFunction) {
    const user = req.body;

    await authService.signup(user);

    res.status(201).json({ message: 'User registered successfully' });
  }

  @Post('signin')
  @Middlewares([AuthLimiter])
  @ValidateBody(signinValidations)
  async SignIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    const { accessToken, refreshToken } = await authService.signin(
      email,
      password
    );

    res.status(200).json({
      message: 'User signed in successfully',
      data: {
        accessToken,
        refreshToken,
      },
    });
  }
}
