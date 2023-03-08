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

    getQuote: (req, res) => {
        const quotes = [
            "You miss 100% of the shots you don't take. - Wayne Gretzky",
            "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
            "Believe you can and you're halfway there. - Theodore Roosevelt",
            "It does not matter how slowly you go as long as you do not stop. - Confucius",
            "The only way to do great work is to love what you do. - Steve Jobs"
        ];
        
        let randomIndex = Math.floor(Math.random() * quotes.length);
        let randomQuote = quotes[randomIndex];

        res.status(200).send(randomQuote);
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
        res.status(201).send(newGoal);
      },
    
      getGoals: (req, res) => {
        res.status(200).send(goals);
      },
    
      completeGoal: (req, res) => {
        const { id } = req.params;
        const goal = goals.find((e) => e.id === parseInt(id));
        if (!goal) {
          return res.status(404).send(`Goal with id ${id} not found!`);
        }
        goal.completed = true;
        res.status(200).send(goal);
      },
    
      
}