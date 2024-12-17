import Table from "../models/tableModel.js"

export const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find()
        res.status(200).json({
            message: "Successfully get all tables",
            tables: tables
        })
        console.log(tables)
    } catch (error) {
        console.log(error)
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