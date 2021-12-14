const { Pizza } = require('../models');

const pizzaController = {
 // get all pizzas
 //Andrew remember this is like methods being added to classes. 
 // It's actually close to writing them like getAllPizza: Function(req,res){All the things}
 getAllPizza(req, res) {
    Pizza.find({})
  .populate({
    path: 'comments',
    select: '-__v'
  })
  .select('-__v')
  .sort({ _id: -1 })
  .then(dbPizzaData => res.json(dbPizzaData))
  .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
    .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
        // If no pizza is found, send 404
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // createPizza This was tacked on later.
    createPizza({ body }, res) {
    Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },
  // update pizza by id
    updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    // ^ the new:true makes sure we return the new updated version.
    //^ sometimes body is expanded like {$set:{petage:body.petage}}
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },
  // delete pizza
    deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then(dbPizzaData => {
        if (!dbPizzaData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;