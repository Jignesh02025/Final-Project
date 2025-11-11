import Data from '../model/model.data.js'

export const getdata = async (req,res) =>{
    try {
        const data = await Data.find()
        if(data){
            res.status(200).json(data);
        }
    else{
        res.status(400).json({message:"No Data Found"})
    }
    } catch (error) {
        res.status(500).json(error)
    }
}