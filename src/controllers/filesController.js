const filesServices = require("../services/filesServices");

const uploadFile = async (req, res) => {
  try {
    const fileName = req.file.filename;

    const fakeId = "";

    const fileUploaded = await filesServices.uploadFile(fileName, fakeId);

    return res.status(200).json(fileUploaded);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllFiles = async (_req, res) => {
  try {
    const allFiles = await filesServices.getAllFiles();

    return res.status(200).json(allFiles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
};
