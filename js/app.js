'use strict';
var NOTES;

// This is my State:
var gState = {
    isUserTurn : false,
    seqNoteIndexes: [],
    currNoteIndexToClick: 0
}

function init() {
    NOTES = createNotes(3);
    renderNotes(NOTES);
    
    addRandomNote();
    playSeq();
}

function createNotes(size){
    var notes = [];
    
    for (var i = 0; i < size; i++) {
       var note = {sound : 'Note' + (i+1), color: getRandomColor()};
       notes.push(note);
    }
    return notes;
}

function renderNotes(notes) {
    // mapping notes to html tags
    var strHtmls = notes.map(function(note, i){
        var strHtml =  '<div class="note" onclick="noteClicked(this, ' + i + ')" ' + 
                             'style="background:'+ note.color +'">' + 
                            note.sound + 
                        '</div>';
        return strHtml;
    });
    var elPiano = document.querySelector('.piano');
    elPiano.innerHTML = strHtmls.join('');
}

function addRandomNote() {
    gState.seqNoteIndexes.push(2);
    gState.seqNoteIndexes.push(1);
}

function playSeq() {
    
    var elNotes = document.querySelectorAll('.note');
    
    gState.seqNoteIndexes.forEach(function (seqNoteIndex, i) {
        
        
        setTimeout(function () {
            elNotes[seqNoteIndex].classList.add('playing');
            
            setTimeout(function () {
                elNotes[seqNoteIndex].classList.remove('playing');
            }, 500);
            
            console.log('Playing: ', NOTES[seqNoteIndex].sound);
        }, 1000 * i);
      
        
        
    });
    
    setTimeout(function () {
        console.log('Done Playing!!');
        gState.isUserTurn = true;
    }, 1000 * gState.seqNoteIndexes.length);
    
   
}

function noteClicked(elNote, noteIndex) {
    
    if (!gState.isUserTurn) return;
    
    if (noteIndex === gState.seqNoteIndexes[gState.currNoteIndexToClick]) {
        console.log('User OK!');
        gState.currNoteIndexToClick++;
    } else {
        console.log('User Wrong!');
    }
    
    
    // console.log('elNote', elNote);
    console.log('Note', NOTES[noteIndex]);
    
    
    
    
    
}
