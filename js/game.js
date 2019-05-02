let $start = document.querySelector('#start'),
    $game = document.querySelector('#game'),
    $time = document.querySelector('#time'),
    $timeHeader = document.querySelector('#time-header'),
    $resultHeader = document.querySelector('#result-header'),
    $result = document.querySelector('#result'),
    $gameTime = document.querySelector('#game-time')

    let colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED']

    let score = 0,
    isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', hendleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
    $el.classList.remove('hide')
}

function hide($el) {
    $el.classList.add('hide')
}

function startGame() {
    setGameTime()
    score = 0
    $gameTime.setAttribute('disabled', 'true')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

    let interval = setInterval(function () {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)

    renderBox()
}

function setGameScore() {
    $result.textContent = score.toString()
}

function setGameTime() {
    let time = +$gameTime.value
    $time.textContent = time.toFixed(1)
    show($timeHeader)
    hide($resultHeader)
}

function endGame() {
    isGameStarted = false
    show($start)
    $game.innerHTML = ''
    $gameTime.removeAttribute('disabled')
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
    setGameScore()

}

function hendleBoxClick(event) {
    if (!isGameStarted) {
        return
    }

    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

function renderBox() {
    $game.innerHTML = ''
    let box = document.createElement('div'),
        boxSize = getRandom(30, 100),
        gameSize = $game.getBoundingClientRect(),
        maxTop = gameSize.height - boxSize,
        maxLeft = gameSize.width - boxSize
        randomColor = getRandom(0, colors.length)

    box.setAttribute('data-box', 'true')
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColor]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'

    $game.insertAdjacentElement('afterbegin', box)

}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}