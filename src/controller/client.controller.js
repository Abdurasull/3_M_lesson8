
import { connection } from "../lib/db.js";
import { ClientError, globalError } from "../utils/error.js";


export const clientController ={
    getClients: async (req, res) => {
        try{
            await connection.query("SELECT * FROM clients", (err, result) => {
                if(!err){
                    res.status(200).json(result)
                } else{
                    throw new ClientError(err.message, 400);
                }
            })
        } catch(err){            
            globalError(err, res);
        }
    },
    addClient: async (req, res) => {
        try{          
            const {name, phone_number, car_number, passport_number} = req.body;
            await connection.query("INSERT INTO clients (ful_name, phone_number, car_number, passport_number) VALUES (?,?,?,?)", [name, phone_number, car_number, passport_number], (err, result) => {
                if(!err){
                    res.status(200).json(result)
                } else{    
                                           
                    throw new ClientError(err.message, 400);
                }
            })
        }catch(err){                 
            globalError(err, res);
        }
    },
    deleteClient: async (req, res) => {
        try{
            const {id} = req.params;
            const result = await connection.query("DELETE FROM clients WHERE id = ?", [id]);
            if (result[0].affectedRows === 0) {
                throw new ClientError("Client not found", 404);
            }
            res.status(200).json({ message: "Client deleted successfully" });
            
        }catch(err){
            globalError(err, res);
        }
    }
}