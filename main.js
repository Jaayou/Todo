const container = document.querySelector('.container');
const colorArea = document.querySelector('.color-area');
const whiteColor = document.querySelector('.white');
const yellowColor = document.querySelector('.yellow');
const redColor = document.querySelector('.red');
const greenColor = document.querySelector('.green');
const blueColor = document.querySelector('.blue');
const addButton = container.querySelector('.add');

const DATA_KEY = 'stickynotes2';
const colors = [
    { bcolor: 'white', fcolor: 'black' },
    { bcolor: '#FFD500', fcolor: 'white' },
    { bcolor: 'red', fcolor: 'white' },
    { bcolor: '#00B952', fcolor: 'white' },
    { bcolor: '#0075C9', fcolor: 'white' }
];
let colorNo;

init();

function init() {
    setColor(0, 'white');
    
    getNotes().forEach(note => {
        const noteElement = createNoteElement(note.id, note.content, note.bcolor, note.fcolor);
        container.insertBefore(noteElement, addButton);
    });
}

colorArea.addEventListener('click', (e) => {
    setColor(e.target.dataset.value, e.target.className);
});

addButton.addEventListener('click', () => addNote());

function setColor(no, color) {
    colorNo = no;
    whiteColor.style.border = color == 'white' ? '1px solid black' : 'none';
    yellowColor.style.border = color == 'yellow' ? '1px solid white' : 'none';
    redColor.style.border = color == 'red' ? '1px solid white' : 'none';
    greenColor.style.border = color == 'green' ? '1px solid white' : 'none';
    blueColor.style.border = color == 'blue' ? '1px solid white' : 'none';

}

function getNotes() {
    return JSON.parse(localStorage.getItem(DATA_KEY) || '[]');
}

function saveNotes(notes) {
    localStorage.setItem(DATA_KEY, JSON.stringify(notes));
}

function createNoteElement(id, content, bcolor, fcolor) {
    const element = document.createElement('textarea');

    element.classList.add('note');
    element.style.backgroundColor = bcolor;
    element.style.color = fcolor;
    element.value = content;
    element.placeholder = '(Empty... dblclick for delete)';

    element.addEventListener('change', () => {
        updateNote(id, element.value);
    });

    element.addEventListener('dblclick', () => {
        const doDelete = confirm('Do you want to delete this To-do?');

        if (doDelete) {
            deleteNote(id, element);
        }
    });

    return element;
}

function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 1000000),
        content: '',
        bcolor: colors[colorNo].bcolor,
        fcolor: colors[colorNo].fcolor
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content, noteObject.bcolor, noteObject.fcolor);
    container.insertBefore(noteElement, addButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {
    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    container.removeChild(element);
}