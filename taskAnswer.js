export class TASKANSWER {
    static tasks = {
      "38f6dd88-57bd-4b42-8712-286a06dac0a0": "VALUE",
      "6af85c01-f68d-4311-b78a-9cf33ba5b151": "GO GET",
      "d95d3299-e035-4bf6-a7ca-0f71578e9197": "BEST PROJECT EVER",
      "53044aaf-a51f-4dfc-851a-ae2699a5f729": "HEYBLUM",
      "835d4d8a-f9af-4ff5-835e-a15d48e465e6": "CRYPTOBLUM",
      "3c048e58-6bb5-4cba-96cb-e564c046de58": "SUPERBLUM",
      "350501e9-4fe4-4612-b899-b2daa11071fb": "CRYPTOSMART",
      "92373c2b-2bf3-44c0-90f7-a7fd146c05c5": "HAPPYDOGS",
      "b611352b-0d8c-44ec-8e0f-cd71b5922ca5": "BLUMERSSS",
      "d2715289-b487-43bc-bc21-18224f8f6bc3": "NODOXXING"
      // Add more task ids and their corresponding answers here
    };
  
    static getAnswer(taskId) {
      return this.tasks[taskId] || null;
    }
  }