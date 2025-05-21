import { connection } from "../lib/db.js"
import { ClientError, globalError } from "../utils/error.js";

export const paymentController = {
    getPayments: async (req, res) => {
        try{
            const [payments] = await connection.query("SELECT * FROM payments");
            if(payments.length === 0){
                throw new ClientError("Payments not found")
            }
            res.status(200).json({payments: payments, status: 200});
        } catch (err) {
            globalError(err, res);
        }
    },
    addPayment: async (req, res) => {
        try{
            const { rental_id, payment_date, payment_method, sum } = req.body;
            const result = await connection.query("INSERT INTO payments (rental_id, payment_date, payment_method, sum ) VALUES (?,?,?, ?)", [rental_id, payment_date, payment_method, sum]);
            console.log(result);
            
            res.status(200).json({message: "Payment added successfully"});
        } catch (err) {
            if (err.code == "ER_NO_REFERENCED_ROW_2"){
                return res.status(404).json({
                    message: "Rental not found"
                });
            }
            
            globalError(err, res);
        }
    },
    deletePayment: async (req, res) => {
        try{
            const {id} = req.params;
            const result = await connection.query("DELETE FROM payments WHERE id = ?", [id]);
            if (result[0].affectedRows === 0) {
                throw new ClientError("Payment not found", 404);
            }
            res.status(200).json({ message: "Payment deleted successfully" });

        }catch(err){
            globalError(err, res);
        }
    }
}