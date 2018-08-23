const charArr = [
    {
        name: 'Mel C',
        hp: 145,
        attack: 6,
        counter: 20,
        img: 'melc.jpg'
    },
    {
        name: 'Emma',
        hp: 130,
        attack: 8,
        counter: 10,
        img: 'emma.jpg'
    },
    {
        name: 'Victoria',
        hp: 130,
        attack: 9,
        counter: 12,
        img: 'victoria.jpg'

    },
    {
        name: 'Mel B',
        hp: 135,
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
    selectable('first')
    $('#fighter').empty()
    $('#defender').empty()
    $('#alert').html(`<h4>Select your fighter</h4>`)
    $('.vs').css('display', 'none')
    $('#attack').css('visibility', 'hidden')
    $('#reset').css('display', 'none')
}

//display selectable spices
function selectable(styleClass) {
    $('#selection').empty()
    activeArr.forEach(function (i) {
        $('#selection').append(`
            <div class="charbox choice ${styleClass}" value="${i}">
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
        selectable('second')
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
        $('.vs').css('display', 'flex')
        $('#attack').css('visibility', 'visible')
        $('#alert').html(`<h4>Try attacking</h4>`)
    }
})

// Attack button function
$('#attack').on('click', function () {
    if (defIndex > -1) {
        defHP -= ftrAP
        $('#alert').html(`<h4>You inflicted ${ftrAP} damage</h4>`)
        if (defHP < 1) { //Defender HP drops to 0, win round
            $('#alert').html(`<h4>You defeated ${charArr[defIndex].name}!</h4>`)
            $('#defender').empty()
            $('.vs').css('display', 'none')
            $('#attack').css('visibility', 'hidden')
            if (activeArr.length === 0) { //if no opponents remain, win game
                $('#alert').append(`<h4>You are the Spice Supreme!</h4>`)

            }
            else { //choose next opponent
                $('#alert').append(`<h4>Select your opponent</h4>`)
                defIndex = -1
                selectable('second')
            }
        }
        else {
            $('#defHP').text(`HP: ${defHP}`)
            ftrAP += charArr[ftrIndex].attack //increase attack power
            ftrHP -= charArr[defIndex].counter //defender count attacks
            $('#alert').append(`
                <h4>${charArr[defIndex].name} counter-attacked. You received ${charArr[defIndex].counter} damage</h4>
                `)
            if (ftrHP < 1) { //Fighter HP drops to 0, Lose game
                $('.vs').css('display', 'none')
                $('#attack').css('visibility', 'hidden')
                $('#alert').html(`
                    <h4>You were defeated by ${charArr[defIndex].name}!</h4>
                    <h4>Press Reset to play again.</h4>
                     `)
            }
            else {
                $('#ftrHP').text(`HP: ${ftrHP}`)
            }
        }
    }
})

$('#reset').on('click', function () {
    newGame()
})

newGame()