import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'SUA_API';

const genAI = new GoogleGenerativeAI(API_KEY);

const generationConfig = {
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};

let questionUser;
let validationMsg= true;
let containerMsg = document.querySelector('.container')
let inputQuestion = document.getElementById('question')
let loading = document.getElementById("loading")
let arrowBtn =  document.querySelector(".arrow")

document.getElementById('btnSubmit').addEventListener('click', (e) => {
  e.preventDefault()

  if(validationMsg){
    questionUser = inputQuestion.value

    let newMsg = document.createElement('p')
    newMsg.textContent = questionUser
    newMsg.setAttribute("class", "user")
  
    containerMsg.appendChild(newMsg)
  
    run(questionUser)
  }else{
    alert('Sua resposta está sendo gerada!')
  }

})

async function run(question) {
  inputQuestion.value = ''
  validationMsg = false

  loading.style.display = "block";
  arrowBtn.style.display = "none"

  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig});

  const chatHistory = [];

  const msg = question;

  chatHistory.push({ user: "Usuário", message: msg });

  const prompt = chatHistory.map(m => `${m.user}: ${m.message}`).join('\n');
  const result = await model.generateContent(prompt);

  const response = await result.response;
  const text = response.text();

  let newMsg = document.createElement('p')
  newMsg.textContent = text
  newMsg.setAttribute("class", "gemini")
  containerMsg.appendChild(newMsg)
  

  chatHistory.push({ user: "Gemini", message: text });

  loading.style.display = "none";
  arrowBtn.style.display = "block"
  validationMsg = true
}





