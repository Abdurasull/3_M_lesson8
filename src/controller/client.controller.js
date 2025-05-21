
import { connection } from "../lib/db.js";
import { ClientError, globalError } from "../utils/error.js";


export const clientController ={
    getClients: async (req, res) => {
        try{
            const [clients] = await connection.query("SELECT * FROM clients");
            res.status(200).json({clients: clients, status: 200})
            
        } catch(err){            
            globalError(err, res);
        }
    },
    addClient: async (req, res) => {
        try{          
            const { ful_name, phone_number, car_number, passport_number} = req.body;
            
            const result = await connection.query("INSERT INTO clients (ful_name, phone_number, car_number, passport_number) VALUES (?,?,?,?)", [ful_name, phone_number, car_number, passport_number]);
            
        }catch(err){  
            if (err.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    message: "Haridorni ustunlarida uniqeu qoidasiga zid bo`lgan holatlar mavjud"
                });
            } else
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
    },
    updateClient: async(req, res) => {
        try{
            const {id} = req.params;
            const {ful_name, phone_number, car_number, passport_number} = req.body;
            const result = await connection.query("UPDATE clients SET ful_name = ?, phone_number = ?, car_number = ?, passport_number = ? WHERE id = ?", [ful_name, phone_number, car_number, passport_number, id]);
            if (result[0].affectedRows === 0) {
                throw new ClientError("Client not found", 404);
            }
            res.status(200).json({ message: "Client updated successfully" });

        }catch(err){
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(400).json({
                    message: "Haridorni ustunlarida uniqeu qoidasiga zid bo`lgan holatlar mavjud"
                });
            } else
                globalError(err, res);
        }
    },
    getClientById: async (req, res) => {
        try{
            const {id} = req.params;
            const [client] = await connection.query("SELECT * FROM clients WHERE id = ?", [id]);
            
            if (client.length === 0) {
                throw new ClientError("Client not found", 404);
            }
            res.status(200).json({client: client[0]});
        }catch(err){
            globalError(err, res);
        }
    }
}