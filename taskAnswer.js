export class TASKANSWER {
    static tasks = {
      "38f6dd88-57bd-4b42-8712-286a06dac0a0": "VALUE",
      "6af85c01-f68d-4311-b78a-9cf33ba5b151": "GO GET",
      "d95d3299-e035-4bf6-a7ca-0f71578e9197": "BEST PROJECT EVER"
      // Add more task ids and their corresponding answers here
    };
  
    static getAnswer(taskId) {
      return this.tasks[taskId] || null;
    }
  }