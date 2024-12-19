import Order from "../models/orderModel.js";
import Table from "../models/tableModel.js";

export const createOrder = async(req, res) => {
    try {
        const { table, customerName, orders, totalAmount} = req.body;

        const existingTable = await Table.findById(table);
        if (!existingTable) {
            return res.status(404).json({ message: "Tabel tidak ditemukan" });
        }

        // Periksa apakah tabel sudah occupied
        if (existingTable.status === 'Occupied') {
            return res.status(400).json({ message: "Tabel sudah ditempati" });
        }

        if(!table || !customerName || !orders || !totalAmount){
            return res.status(400).json({
                status: 400,
                message: "Incomplete Data"
            })
        }

        const newOrder = await Order.create({
            table,
            customerName,
            orders,
            totalAmount,
        });
        
        await Table.findByIdAndUpdate(table, {
            status: 'Occupied',
            currentOrder: newOrder._id
        });

        return res.status(201).json({
            status: 201,
            message: "Order created successfully",
            data: newOrder
        })
    } catch (error) {
        return res.status(500).json({message: "Failed to create order", error: error});
    }
}

export const getAllOrders = async(req, res) => {
    try {
        const status = req.query.status;
        const query = status ? { status } : {};

        const orders = await Order.find(query);
        if(orders.length > 0){
            res.status(200).json({
                status: 200,
                message: "Successfully get all orders",
                data: orders,
                data_length: orders.length
            })
            return
        }
        
        res.status(200).json({
            status: 200,
            message: "Sorry, you don't have any order data yet...",
            data: orders,
            data_length: orders.length
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get all orders",
            error
        })
    }
}

export const getOrderByTable = async(req, res) => {
    try {
        const { tableId } = req.params;
        const order = await Order.find({table: tableId})

        if(order.length === 0){
            return res.status(200).json({
                status: 200,
                message: "Sorry, you don't have any order data yet...",
                data: order,
            })
        }

        res.status(200).json({
            status: 200,
            message: "Successfully get all orders",
            data: order,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to get all orders",
            error
        })
    }
}

export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.query;
        const { status } = req.body;

        const validStatus = ["Pending", "Served", "Paid"];
        if (!validStatus.includes(status)) {
            return res.status(400).json({ message: "Status tidak valid" });
        }
    
        const updatedOrder = await Order.findByIdAndUpdate({_id: id}, { status });
        console.log(updatedOrder)
    
        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (status === "Paid") {
            await Table.findByIdAndUpdate(updatedOrder.table, {
                status: "Available",
                currentOrder: null,
            });
        }
    
        return res.status(200).json({ message: "Successfully update order", data: updatedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Failed update order", error });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.query;

        const deletedOrder = await Order.findByIdAndDelete({_id: id});
        if (!deletedOrder) {
            return res.status(404).json({ message: "Pesanan tidak ditemukan" });
        }
        return res.status(200).json({ message: "Pesanan berhasil dihapus", data: deletedOrder });
    } catch (error) {
        return res.status(500).json({ message: "Gagal menghapus pesanan", error });
    }
};


export const getTotalIncome = async (req, res) => {
    try {
        // Menggunakan agregasi untuk menjumlahkan totalAmount dari order dengan status 'Paid'
        const result = await Order.aggregate([
            {
                $match: {
                    status: "Paid", // Filter berdasarkan status 'Paid'
                }
            },
            {
                $group: {
                    _id: null, // Tidak ada grup, kita hanya ingin total keseluruhan
                    totalIncome: { $sum: "$totalAmount" } // Menjumlahkan totalAmount
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(404).json({
                status: 404,
                message: "No paid orders found",
            });
        }

        res.status(200).json({
            status: 200,
            message: "Successfully fetched total income from paid orders",
            totalIncome: result[0].totalIncome,
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Failed to calculate total income",
            error: error.message,
        });
    }
};

