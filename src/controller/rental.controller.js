import { ClientError, globalError } from "../utils/error.js";
import { connection } from "../lib/db.js";

export const rentalController = {
    getRentals: async (req, res) => {
        try{
            const [rentals] = await connection.query("SELECT * FROM rentals");
            if(!rentals.length){
                throw new ClientError("Rentals not found", 404);
            }
            res.status(200).json({rentals: rentals, status: 200})
        }catch(err){
            globalError(err, res);
        }
    },
    addRental: async (req, res) => {
        try{
            const { client_id, parking_space_id, rental_start_date, rental_end_date, rental_status, rental_price } = req.body;
            
            const result = await connection.query("INSERT INTO rentals (client_id, parking_space_id, rental_start_date, rental_end_date, rental_status, rental_price) VALUES (?,?,?,?,?,?)", [client_id, parking_space_id, rental_start_date, rental_end_date, rental_status, rental_price]);
            res.status(201).json({
                message: "Rental added successfully"
            })
            
        }catch(err){        
            if (err.code == 'ER_NO_REFERENCED_ROW_2'){
                res.status(400).json({
                    message: "Bunday turdagi client yoki parcing space mavjud emas!"
                });
            } else
            globalError(err, res);
        }

    },
    updateRental: async (req, res) => {
        try{
            const { id } = req.params;
            const { client_id, parking_space_id, rental_start_date, rental_end_date, rental_status, rental_price } = req.body;
            const result = await connection.query("UPDATE rentals SET client_id = ?, parking_space_id = ?, rental_start_date = ?, rental_end_date = ?, rental_status = ?, rental_price = ? WHERE id = ?", [client_id, parking_space_id, rental_start_date, rental_end_date, rental_status, rental_price, id]);
            console.log(result);
            
            if (result[0].affectedRows === 0) {
                throw new ClientError("Rental not found", 404);
            }
            res.status(200).json({ message: "Rental updated successfully" });
        }catch(err){
            globalError(err, res);
        } 
    },
    deleteRental: async (req, res) => {
        try{
            const { id } = req.params;
            const result = await connection.query("DELETE FROM rentals WHERE id = ?", [id]);
            if(result[0].affectedRows === 0) {
                throw new ClientError("Rental not found", 404);
            }
            res.status(200).json({ message: "Rental deleted successfully"});
        } catch (err) {
            globalError(err, res);
        }
    } 
}