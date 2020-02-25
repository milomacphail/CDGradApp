const express = require('express');
const router = express.Router();
const Graduate = require('../../models/Graduate');


router.get("/", async (req, res) => {
    try {
      const graduates = await Graduate.find();
      res.json(graduates);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
router.post('/', async(req, res) => {
    console.log(req.body);
    const graduate = new Graduate({
        name: req.body.name,
        role: req.body.role,
        company: req.body.company,
        yearOfGraduation: req.body.yearOfGraduation
    });
    try {
        console.log(graduate);
        const newGraduate = await graduate.save();
        res.status(201).json(newGraduate);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


router.delete('/:id', async(req, res) => {
    Graduate.findByIdAndRemove(req.params.id, req.body)
    .then(graduate => req.json({msg: 'Sucessfully deleted'}))
    .catch(err => res.status(400).json({error: "Grad remains"}));
});

module.exports = router;