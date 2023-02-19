import exp from 'constants';
import express from 'express';
import { getAllUsers , postUserLogin, postUserRegister, getUserByCookie, getUserLogout} from './usersCtrl';

const router = express.Router();

router
.get("", getAllUsers)
.get("/by-cookie", getUserByCookie)
.get("/logout", getUserLogout)
.post("/login", postUserLogin)
.post("/register", postUserRegister)



export default router;