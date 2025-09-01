const episodes = [
    { season: 1, number: 1, title: "Pilot" },
    { season: 1, number: 2, title: "Paternity" },
    { season: 1, number: 3, title: "Occam's Razor" },
    { season: 1, number: 4, title: "Maternity" },
    
    // Adicione mais episódios aqui de outras temporadas...
    // Exemplo: { season: 2, number: 1, title: "Acceptance" },
];

let pairs = [];
let currentPairIndex = 0;
let scores = {};

function generatePairs() {
    for (let i = 0; i < episodes.length; i++) {
        for (let j = i + 1; j < episodes.length; j++) {
            pairs.push([episodes[i], episodes[j]]);
        }
    }

    pairs.sort(() => Math.random() - 0.5);
}

function displayPair() {
    if (currentPairIndex >= pairs.length) {
        displayRanking();
        return;
    }

    const [ep1, ep2] = pairs[currentPairIndex];

    document.getElementById('episode1-title').innerText = ep1.title;
    document.getElementById('episode1-info').innerText = `Temporada ${ep1.season}, Episódio ${ep1.number}`;

    document.getElementById('episode2-title').innerText = ep2.title;
    document.getElementById('episode2-info').innerText = `Temporada ${ep2.season}, Episódio ${ep2.number}`;
}

function vote(choice) {
    const [ep1, ep2] = pairs[currentPairIndex];
    const ep1Id = `S${ep1.season}E${ep1.number}`;
    const ep2Id = `S${ep2.season}E${ep2.number}`;

    if (!scores[ep1Id]) scores[ep1Id] = { score: 0, episode: ep1 };
    if (!scores[ep2Id]) scores[ep2Id] = { score: 0, episode: ep2 };

    if (choice === 1) {
        scores[ep1Id].score++;
    } else if (choice === 2) {
        scores[ep2Id].score++;
    } else if (choice === 'both') {
        scores[ep1Id].score++;
        scores[ep2Id].score++;
    }

    currentPairIndex++;
    displayPair();
}

function displayRanking() {
    document.getElementById('comparison-container').style.display = 'none';
    document.getElementById('button-container').style.display = 'none';
    document.getElementById('ranking-container').style.display = 'block';

    const sortedEpisodes = Object.values(scores).sort((a, b) => b.score - a.score);

    const rankingList = document.getElementById('ranking-list');
    sortedEpisodes.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerText = `${index + 1}. ${item.episode.title} (Temporada ${item.episode.season}, Episódio ${item.episode.number}) - Pontuação: ${item.score}`;
        rankingList.appendChild(li);
    });
}

function reiniciarRanking() {
    scores = {};
    currentPairIndex = 0;

    document.getElementById('ranking-list').innerHTML = '';

    document.getElementById('ranking-container').style.display = 'none';
    document.getElementById('comparison-container').style.display = 'flex';
    document.getElementById('button-container').style.display = 'block';

    pairs.sort(() => Math.random() - 0.5);

    displayPair();
}


document.getElementById('choose-ep1').addEventListener('click', () => vote(1));
document.getElementById('choose-ep2').addEventListener('click', () => vote(2));
document.getElementById('choose-both').addEventListener('click', () => vote('both'));
document.getElementById('no-opinion').addEventListener('click', () => vote('none'));


document.getElementById('restart-button').addEventListener('click', reiniciarRanking);


generatePairs();
displayPair();
