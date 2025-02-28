# Express Project Generator

This CLI tool generates a **class-based Express.js** project with built-in support for **Prisma**, **TypeScript**, and **decorators** for handling routes, middlewares, and validation. It simplifies backend development by removing boilerplate code and enforcing best practices.

## Features

- **Class-Based Express.js Setup**: Organizes controllers and services using class-based architecture.
- **Built-in Decorators**:
  - `@Get()`, `@Post()`, `@Put()`, `@Delete()`. for defining routes.
  - `@Middlewares()` , pass it an array of the middlewares you want to apply to a route.
  - `@ValidateBody()` for request body validation using express-validator.
  - `@Controller()` for determining a common path to all the routes inside the controller
- **Prisma Integration**: Preconfigured ORM setup for managing databases efficiently.
- **Automatic Error Handling**:
  - No need to use `try-catch` in controllers and services.
  - All controllers are automatically wrapped with error handling.
- **Authentication Endpoints**: Generates authentication routes (signup & signin) with JWT support.
- **TypeScript Support**: Type safety and modern JavaScript features are included by default.

- Register a controller to the app by adding it to the array passed to the initializeApp function in index.ts

## Installation

You can install the CLI tool globally or use `npx` to generate a project without installation.

### Install Globally

```bash
npm i @mohammad-abbass/rapid-express
```

## Usage

To generate a new Express.js project, run:

```bash
npx create <app-name>
```

This will:

1. Create a new directory `my-express-app`.
2. Scaffold a class-based Express.js application.
3. Set up Prisma, authentication, and decorators.

## Project Structure

The generated project follows this structure:

```
<app-name>/
├── src/
│   ├── app/
│   │   ├── initializeApp.ts  # Initializes the Express app
│   │   ├── Base.Controller.ts  # Base class for all controllers
│   │   ├── registerControllers.ts
│   ├── decorators/  # Custom decorators for routing, middleware, and validation
│   ├── features/  # Contains modular feature-based folders (auth, users, etc.)
│   │   ├── auth/
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── middlewares/
│   │   │   ├── validations/
│   │   ├── ...
│   ├── errorHandlers/  # Custom error classes
│   ├── db/
│   │   ├── config.ts  # Prisma setup
│   ├── utils/
│   ├── index.ts  # Entry point
├── prisma/
│   ├── schema.prisma  # Prisma schema
├── .env  # Environment variables
├── package.json
├── README.md



```

## Example Usage

### Controller with Decorators

```typescript
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
```

### No Need for Try-Catch in Controllers & Services

All controllers and services are automatically wrapped in a global error handler, removing the need for explicit `try-catch` blocks.

### Custom Error Handling Example

```typescript
export default class ConflictError extends AppError {
  constructor(message: string) {
    super(message);
    this.name = 'ConflictError';
  }
}
```

## Setup After Generation

1. Navigate to the project folder:
   ```bash
   cd my-express-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## To Contribute
https://github.com/Mohammad-y-abbass/rapid-express

## License

MIT License
