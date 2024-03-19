
const kanyeURL = 'https://api.kanye.rest/'; //uses res.quote
// const trumpURL = 'https://tronalddump.io/random/quote/' //uses res.value
const trumpURL = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random' //uses res.message

const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click',guess));

let streak = 0;
let best = parseInt(localStorage.getItem('best')) || 0;
document.getElementById('best-streak').innerHTML = best;

getNewQuote();


function getNewQuote() {
    const quoted = Math.random() >= 0.5 ? 'kanye' : 'trump';
    const url = quoted == 'kanye' ? kanyeURL : trumpURL; 

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState !== XMLHttpRequest.DONE) {return;} //skip if not done
        renderResults(JSON.parse(xhr.response), quoted);
    };
    xhr.send(null);
}

function renderResults(res, quoted) {
    let quote = res.quote || res.message;

    document.getElementById('quote-text').innerHTML= `<p>${quote}</p>`;
    document.getElementById('quote-text').dataset.value= quoted;
}

function guess(e) {
    if (e.target.id == document.getElementById('quote-text').dataset.value) {
        streak += 1;
        successAnimation();
    } else {
        streak = 0;
        failAnimation();
    }
    
    document.getElementById('streak-score').innerHTML = streak;
    best = Math.max(streak,best);
    document.getElementById('best-streak').innerHTML = best;
    localStorage.setItem('best', best);

    getNewQuote();
}

function successAnimation() {
    const anim = document.getElementById('animation');
    anim.innerHTML = "+1";
    anim.classList.add('success');
    anim.classList.add("guess-animation"); 
    anim.addEventListener('animationend', ()=> {
        anim.classList.remove('guess-animation');
        anim.classList.remove('success');
    });
}

function failAnimation() {
    const anim = document.getElementById('animation');
    anim.innerHTML = "X";
    anim.classList.add('fail');
    anim.classList.add("guess-animation"); 
    anim.addEventListener('animationend', ()=> {
        anim.classList.remove('guess-animation');
        anim.classList.remove('fail');
    });
}