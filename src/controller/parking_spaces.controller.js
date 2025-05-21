import { ClientError, globalError } from "../utils/error.js";
import { connection } from "../lib/db.js";


export const parking_spacesController = {
    getParkingSpaces: async (req, res) => {
        try{
            const [parking_spaces] = await connection.query("SELECT * FROM parking_spaces");
            res.status(200).json({parking_spaces: parking_spaces, status: 200})

        } catch(err){
            globalError(err, res);
        }
    },
    addParkingSpace: async (req, res) => {
        try{
            
            const { location, stop_number, size, status } = req.body;
            
            const result = await connection.query("INSERT INTO parking_spaces (location, stop_number, size, status) VALUES (?,?,?,?)", [location, stop_number, size, status]);
            res.status(200).json({message: "Parking space added successfully"});

        }catch(err){
            if (err.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    message: "Haridorni ustunlarida uniqeu qoidasiga zid bo`lgan holatlar mavjud"
                });
            } else{
                console.log(err);
                
                globalError(err, res);
            }
        }
    },
    updateParkingSpace: async (req, res) => {
        try{
            const { id } = req.params;
            const { location, stop_number, size, status } = req.body;
            const result = await connection.query("UPDATE parking_spaces SET location = ?, stop_number = ?, size = ?, status = ? WHERE id = ?", [location, stop_number, size, status, id]);
            if (result[0].affectedRows === 0) {
                throw new ClientError("Parking space not found", 404);
            }
            res.status(200).json({ message: "Parking space updated successfully" });
        }catch(err){
            if(err.code == 'ER_DUP_ENTRY'){
                res.status(400).json({
                    message: "Haridorni ustunlarida uniqeu qoidasiga zid bo`lgan holatlar mavjud"
                });
            } else
            globalError(err, res);
        }
    },
    deleteParkingSpace: async (req, res) => {
        try{
            const {id} = req.params;
            const result = await connection.query("DELETE FROM parking_spaces WHERE id = ?", [id]);
            if(result[0].affectedRows === 0) {
                throw new ClientError("Parking space not found", 404);
            }
            res.status(200).json({ message: "Parking space deleted successfully" });
        }catch(err){
            globalError(err, res);
        }
    }
}