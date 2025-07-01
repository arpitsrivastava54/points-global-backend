import { CorsOptions } from "cors";
import { config } from "./config";

const ALLOWED_ORIGINS = config.origins;

export const corsConfig:CorsOptions ={
  origin:ALLOWED_ORIGINS,
  methods:['GET','POST','PUT','DELETE','OPTIONS'],
  credentials:true,
}