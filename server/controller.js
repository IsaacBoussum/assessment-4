const goals = [];

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = [
            "A dubious friend may be an enemy in camouflage.", 
            "A beautiful, smart, and loving person will be coming into your life.", 
            "A faithful friend is a strong defense.", 
            "A feather in the hand is better than a bird in the air.", 
            "A fresh start will put you on your way."
        ];
        
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];

        res.status(200).send(randomFortune);
    },

    addGoal: (req, res) => {
        const { goal, deadline } = req.body;
        if (!goal || !deadline) {
          return res.status(400).send('Both goal and deadline are required!');
        }
        const newGoal = {
          id: goals.length + 1,
          goal,
          deadline,
          completed: false
        };
        goals.push(newGoal);
        res.status(200).send(newGoal);
    },

    getGoals: (req, res) => {
        res.status(200).send(goals);
    },

    updateGoal: (req, res) => {
      const { id } = req.params;
      const index = goals.findIndex(goal => goal.id === parseInt(id));
      if (index !== -1) {
          goals[index].completed = true;
          res.status(200).send(goals[index]);
      } else {
          res.sendStatus(404);
      }
  },

    

    deleteGoal: (req, res) => {
        const id = parseInt(req.params.id);
        const index = goals.findIndex(goal => goal.id === id);
        if (index === -1) {
          return res.status(404).send('Goal not found');
        }
        goals.splice(index, 1);
        res.status(200).send(`Goal with id ${id} deleted successfully`);
    }
};