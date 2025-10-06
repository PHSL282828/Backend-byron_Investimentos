// src/controllers/user/LogoutUserController.ts
import { Request, Response } from "express";
import { LogoutUserService } from "../../../services/user/auth/LogoutUserService";

export async function LogoutUserController(request: Request, response: Response) {
  const auth = request.headers.authorization;//pega o token do header de autorização
  const token = auth?.startsWith("Bearer ") ? auth.split(" ")[1] : undefined;//extrai o token do header

  const logoutUserService= new LogoutUserService();
  const logout= logoutUserService.execute(token);
  return response.json(logout);
  
}
