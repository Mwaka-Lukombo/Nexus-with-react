import {mongoose} from 'mongoose';
import { config } from 'dotenv';


config();



export const dbConnect = async ()=> {
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`Conexao feita com sucesso!`);
    } catch (erro) {
        console.error('❌ Erro ao conectar:', erro);
    }
}
