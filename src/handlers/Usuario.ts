import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/Usuario.mo";
import { error } from "console";

//Create Products
export const createUser = async (req: Request, res: Response) => {

  const user = await User.create(req.body);
  res.json({ data: user });
};
//Get users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      order: [["price", "DESC"]],
    });
    if (users.length === 0) {
      return res.status(404).json({ error: "No hay useros" });
    }
    res.json({ data: users });
  } catch (error) {
    console.log(error);
  }
};

//Get user by ID
export const getUsersByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }
  res.json({ data: user });
  //res.send("Hola desde get by id")
};


    
//UPDATE user
export const updateUsersByID = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  console.log(req.body);
  if (!user) {
    return res
      .status(404)
      .json({ error: "No existe el usero", data: user });
  }
  //actualizar
  await user.update(req.body);
  res.json({ data: user });
  //res.send("Hola desde put")
};

//Delete user
export const deleteUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }
  //borrar
  await user.destroy();
  res.json({ data: user });
  //res.send("Hola desde delete")
};

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "No existe el usero" });
  }

  user.isActive = !user.dataValues.isActive
  await user.save()
  res.json({ data: user });
}