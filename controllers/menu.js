import Menu from "../models/menuModel.js";

export const createMenu = async(req, res) => {
    try {
        const { name, category, price, description, image } = req.body;

        if(!name || !price){
            return res.status(400).json({
                status: 400,
                message: "Invalid name or price"
            })
        }

        const newMenu = new Menu({
            name, category, price, description, image
        })

        await newMenu.save();
        return res.status(200).json({
            status: 200,
            message: "Successfully created new menu",
            data: newMenu
        })
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Error creating menu",
            error
        })
    }
}

export const getAllMenu = async (req, res) => {
    try {
        const menus = await Menu.find(); 
        return res.status(200).json({ 
            status: 200,
            message: "Successfully loaded all menus", 
            data: menus,
            data_length: menus.length
        });
    } catch (error) {
        return res.status(500).json({ status: 500, message: "Failed to get all menus", error });
    }
}

export const getMenuByCategory = async(req, res) => {
    try {
        const { category } = req.params
        const menus = await Menu.find({category: category});

        if(menus.length === 0){
            return res.status(404).json({
                status: 404,
                message: "No menus found for category " + category,
                data_length: menus.length,
            })
        }

        return res.status(200).json({
            status: 200,
            message: `Successfully loaded all menus for category ${category}`,
            data: menus,
            data_length: menus.length
        })
        
    } catch (error) {
        res.status(500).json({status: 500, message: "Failed to get menu by category", error: error.message})
    }
}

export const searchMenuByName = async (req, res) => {
    try {
        const { name } = req.query; 

        if (!name) {
            return res.status(400).json({ message: "Parameter 'name' diperlukan untuk pencarian." });
        }

        const menus = await Menu.find({
            name: { $regex: name, $options: "i" } 
        });

        if (menus.length === 0) {
            return res.status(404).json({ message: "Menu tidak ditemukan dengan nama tersebut." });
        }

        return res.status(200).json({ data: menus });
    } catch (error) {
        return res.status(500).json({ message: "Gagal mencari menu.", error: error.message });
    }
};
