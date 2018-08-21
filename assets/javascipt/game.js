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

/*
initialize game with characters in selection area
    for each loop of character array
    character div with image and hp data-char attribute of array index
*/

/*
onclick character selection function
    fighter variable equals index of $(this).attr('datachar)
    fighter selected object power.active=false
    fighter current attack = object.attack
    display active character objects in opponent selection area
*/

/*
onclick opponent selection function
    if selection enabled
        opponent selected object.active: false
        remove character div from opponent selection area
        add character div to defender area
        defender selection disabled
        attack button enabled
*/

/*
onclick Fight button function
defender hp -= fighter current attack power
    if def hp < 1 win fight
        disable attack button
        if no defenders{ win game
        else{ "choose a defender" message
            defender selection enabled
fighter current attack += base attack power
fighter hp -= defender object.counter
    if fighter hp <1 lose
*/