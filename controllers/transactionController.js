const Transaction = require('../models/transaction')



// get all transactions
// GET /api/v1/transactions
// public
exports.getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// add transaction
// POST /api/v1/transactions
// public
exports.addTransaction = async (req, res, next) => {

    try {
        // data sent in from a client in the form of req.body...
        const { text, amount } = req.body;

        // use the mongoose create method
        const transaction = await Transaction.create(req.body);

        return res.status(201).json({
            success: true,
            data: transaction,
        }) 

    } catch (err) {
        console.log(err)
        if(err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.status(500).json({
                success: false,
                error: 'Server Error',
            }) 
        }
    }

}

// delete transaction
// DELETE /api/v1/transactions/:id
// public
exports.deleteTransaction = async (req, res, next) => {
    try {

        const transaction = await Transaction.findById(req.params.id);

        if(!transaction) {
            return res.status(404).json({
                success: false,
                error: 'No transaction found',
            })
        }

        await transaction.remove();
        return res.status(200).json({
            success: true,
            data: {}
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: 'Server Error',
        }) 
    }
}