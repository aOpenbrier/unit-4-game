/*
global variables
    Array of character-objects
        hP num
        attack num
        counter num
        active boolean
    fighter selected index-num
    fighter current attack power num
    opponent selected index-num
    is selection enabled
*/
let charArr = [
    {
        name: 'Mel C',
        hp: 100,
        attack: 6,
        counter: 20,
        img: 'melc.jpg'
    },
    {
        name: 'Emma',
        hp: 100,
        attack: 8,
        counter: 10,
        img: 'emma.jpg'
    },
    {
        name: 'Victoria',
        hp: 90,
        attack: 8,
        counter: 15,
        img: 'victoria.jpg'

    },
    {
        name: 'Mel B',
        hp: 120,
        attack: 7,
        counter: 25,
        img: 'melb.jpg'
    }
]

let ftrIndex = -1 //fighter selected charArr index, -1 not yet selected
let ftrHP = 0
let ftrAP = 0
let defIndex = -1 //defender selected charArr index, -1 not yet selected
let defHP = 0
let activeArr = [] //characters remaining




function newGame() {   //new gameinitialize game with characters in selection area
    ftrIndex = -1
    defIndex = -1
    activeArr = [0, 1, 2, 3]
    selectable()
    $('#fighter').empty()
    $('#defender').empty()
    $('#alert').html(`<h4>Select your fighter</h4>`)
    $('.vs').css('display', 'none')
    $('#reset').css('display', 'none')
    $('#attack').css('visibility', 'hidden')
}

//display selectable spices
function selectable() {
    $('#selection').empty()
    activeArr.forEach(function (i) {
        $('#selection').append(`
            <div class="charbox choice" value="${i}">
            <img class="photo" src="assets/images/${charArr[i].img}" alt="${charArr[i].name}">
            <h3 class="name">${charArr[i].name}</h3>
            <h3 class="hp">HP: ${charArr[i].hp}</h3>
            </div>
            `)
    })
}

$(document).on('click', '.choice', function () { //on click spice selection
    if (ftrIndex === -1) {
        ftrIndex = $(this).attr('value') - 0
        ftrHP = charArr[ftrIndex].hp
        ftrAP = charArr[ftrIndex].attack
        activeArr.splice(ftrIndex, 1) //splice spice from selectable
        $('#fighter').html(`<img class="photo" src="assets/images/${charArr[ftrIndex].img}" alt="${charArr[ftrIndex].name}">
            <h3 class="name">${charArr[ftrIndex].name}</h3>
            <h3 class="hp" id="ftrHP">HP: ${ftrHP}</h3>`)
        $('#alert').html(`<h4>Select your opponent</h4>`)
        selectable()
        $('.vs').css('display', 'flex')
        $('#reset').css('display', 'inline')
    }
    else if (defIndex === -1) {
        defIndex = $(this).attr('value') - 0
        defHP = charArr[defIndex].hp
        const whereInActive = activeArr.indexOf(defIndex); //find charArr index in activeArr
        activeArr.splice(whereInActive, 1) //splice spice from selectable opponents
        $('#defender').html(`<img class="photo" src="assets/images/${charArr[defIndex].img}" alt="${charArr[defIndex].name}">
            <h3 class="name">${charArr[defIndex].name}</h3>
            <h3 class="hp" id="defHP">HP: ${defHP}</h3>`)
            $('#selection').empty()
            $('#attack').css('visibility', 'visible')
            $('#alert').html(`<h4>Try attacking</h4>`)
    }
})

// Attack button function
$('#attack').on('click', function () {
    // defender hp -= fighter current attack power
    // message you inflicted ## damage
    // if def hp < 1 
        // win fight
        // disable attack button
        // if no defenders
            // win game
        // else
            // "choose a defender" message
            // defender selection enabled
    // else
        // fighter current attack += base attack power
        // fighter hp -= defender object.counter
        // message defender inflicted ## damage
        // if fighter hp <1 lose
})

$('#reset').on('click', function () {
    newGame()
})

newGame()