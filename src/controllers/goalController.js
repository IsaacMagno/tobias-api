const goalService = require("../services/goalServices");

const readGoal = async (req, res) => {
  try {
    const goal = await goalService.readGoal(req.params.id);

    return res.status(200).json({ goal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createGoal = async (req, res) => {
  try {
    const goalData = req.body;

    const createdGoal = await goalService.createGoal(goalData);

    return res.status(200).json({ createdGoal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goalData = req.body;

    const updatedGoal = await goalService.updateGoal(id, goalData);

    return res.status(200).json({ updatedGoal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGoal = await goalService.deleteGoal(id);

    return res.status(200).json({ deletedGoal });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  readGoal,
  createGoal,
  updateGoal,
  deleteGoal,
};
