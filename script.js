import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyD4hql8ApZFCZXTCqAswRXNY9AQ7TEZMCs",
  authDomain: "news-app-6fb3f.firebaseapp.com",
  projectId: "news-app-6fb3f",
  storageBucket: "news-app-6fb3f.firebasestorage.app",
  messagingSenderId: "1013648179384",
  appId: "1:1013648179384:web:7a00150cac5e10f940b44d",
  measurementId: "G-JJH9XLVB3Y"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
  } else {
    if (window.location.pathname == '/index.html') {
      alert("You need to log in first!");
      window.location.href = "index.html"; 
    }
  }
});

// Logout function
const logout = () => {
  signOut(auth)
    .then(() => {
      alert("User logged out");
      window.location.href = "index.html"; // Redirect to login page
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert(error.message);
    });
};
let log_out = document.querySelector("#logout");
log_out.addEventListener('click', () => {
  logout();
});

// Fetch API Key from environment variables in Vercel
const API_KEY = process.env.NEWS_API_KEY;

const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=${API_KEY}`;

let box = document.querySelector('.box');              // category part
let new_country = "us";
let category_list = document.querySelector('#exampleFormControlSelect1');
let category = category_list.value;

category_list.addEventListener('change', () => {
  category = category_list.value;
  console.log(category);
  box.innerHTML = '';
  news();
});

console.log(category);

let arr = [];
let final_tone;
let preference_div = document.querySelector(".preferences");
console.log(preference_div);

let preferences_button = document.querySelectorAll('.genre'); // this is my preference selector part
console.log(preferences_button);

preferences_button.forEach((e) => {
  e.addEventListener("click", () => {
    arr.push(e.value);
    e.classList.add("btn-warning");
    console.log(arr);
  });
});

let proceed = document.querySelector('#proceed');
console.log(proceed);

proceed.addEventListener('click', () => {
  proceed.style.display = 'none';
  
  preferences_button.forEach((e) => {
    e.style.display = "none";
  });
  
  let tone = document.querySelectorAll('.tone');
  tone.forEach((e) => {
    e.style.display = "flex";
    e.addEventListener('click', () => {
      final_tone = e.innerText;
      news();
    });
  });
  
  box.innerHTML = '';
  for (let i in arr) {
    category = arr[i];
    console.log(category);
    news();
  }
});

pre_nav_btn.addEventListener('click', () => {
  if (preference_div.style.display === 'none') {
    preference_div.style.display = 'grid'; // Show preferences div
  } else {
    preference_div.style.display = 'none'; // Hide preferences div
  }
});

const news = async () => { // the news function
  const new_BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;

  let response = await fetch(new_BASE_URL);
  let data = await response.json();

  data.articles.forEach(travel);

  function travel(need, i) {
    let news_title = data.articles[i].title;
    let url_href = data.articles[i].url;
    let img_url = data.articles[i].urlToImage;
    let content = data.articles[i].content;

    if (final_tone !== undefined) {
      const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/text/sentiment_analysis",
        headers: {
          authorization: "Bearer your_edenai_token_here",
        },
        data: JSON.stringify({
          providers: ["google"],
          text: content,
          language: "en",
        }),
      };

      axios(options)
        .then((response) => {
          // console.log(response.data);
        })
        .catch((error) => {
          // console.error(error);
        });

      if (final_tone === options.general_sentiment) {
        cardMaker();
      }
    } else {
      cardMaker();
    }

    function cardMaker() {
      let card = document.createElement("div");
      card.classList.add("card");
      card.style.width = "30rem";
      card.style.backgroundColor = "#17202a";
      document.body.appendChild(card);

      if (img_url) {
        let image = document.createElement('img');
        image.classList.add("card-img-fluid");
        image.src = img_url;
        card.appendChild(image);
      }

      let title = document.createElement("h5");
      title.classList.add("card-title");
      title.innerText = news_title;
      title.style.color = "white";
      card.appendChild(title);

      let link = document.createElement("button");
      link.classList.add("btn");
      link.classList.add("btn-warning");
      link.innerText = "Read the Complete Page here";
      link.addEventListener('click', () => {
        window.location.href = url_href;
      });
      card.appendChild(link);
      box.appendChild(card);
    }
  }
}

news();
