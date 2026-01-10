import User from "../Models/User.model.js";

const getAllUsers = async (req, res) => {
    try {
        const {userId} = req.body;

        const users = await User.findbyId(userId);

        if(!users){
            return res
            .status(404)
            .json({success: false, message: "No users found"});
        }

        return res
        .status(200)
        .json({success: true, userData: {
            name: users.name, 
            isAccountVerified: users.isAccountVerified
        }});
    } catch (error) {
        return res
        .status(500)
        .json({success: false, message: error.message});
    }
}

export { getAllUsers };