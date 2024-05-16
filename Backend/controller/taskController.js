const { default: mongoose } = require("mongoose");
const taskModel = require("../models/TaskModel");

// to create a Task - post
const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const Task = await taskModel.create({ title, description });
    res.status(200).json(Task);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

// to get all task

const getTask = async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.status(200).json(tasks);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
// to get a single task -get

const getSingleTask = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Task not Found"})
    }
    try{
        const SingleTask = await taskModel.findById(id)
        res.status(200).json(SingleTask)
    } catch(e) {
        res.status(400).json({ error: e.message });
    }
};
// to update a task -PATCH

const updateTask = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Task not Found"})
    }
    try {
        const task = await taskModel.findByIdAndUpdate({
            _id:id
        },
        { ...req.body

        })
        res.status(200).json(task);
    
    } catch (error) {
        res.status(400).json({error:e.message});
    }

};

// delete task - delete

const deleteTask = async (req,res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Task not Found"})
    }
    try {
        const task = await taskModel.findByIdAndDelete(id);
        res.status(200).json(task)
        
    } catch (e) {
        res.status(400).json({error:e.message});
        
    }
}


module.exports = { createTask, getTask ,getSingleTask, updateTask ,deleteTask};
