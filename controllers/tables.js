import Table from "../models/tableModel.js"

export const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find()
        if(tables.length == 0){
            res.status(200).json({
                message: "No data found",
                status: "200",
                data_length: tables.length,
                method: req.method
            })
        }
        res.status(200).json({
            status: 200,
            message: "Successfully get all tables",
            data_length: tables.length,
            tables: tables,
            method: req.method
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message: "Failed to get all tables", error});
    }
}

export const addTable = async (req, res) => {
    try {
        const tables = req.body
        const newTables = await Table.insertMany(tables);
        res.status(200).json(newTables)
    } catch (error) {
        console.log(error)
    }
}