//table>(thead>tr>th*3)+tbody>tr*2>td*3

document.querySelector("#save").addEventListener('click', createNote);
document.querySelector("tbody").addEventListener('click', deleteNote);
let topic = document.querySelector("#topic");
let note  = document.querySelector("#note");
let tbody  = document.querySelector("tbody");

let url = 'https://0ox9x2l290.execute-api.us-west-2.amazonaws.com/dev';
url = 'https://hhizuqdwjc.execute-api.us-west-2.amazonaws.com/dev';
getNotes();

function deleteNote(e) {
    fetch(url, {
        method: 'DELETE',
        body: JSON.stringify({id: e.target.parentElement.id})
    })
    .then(() => getNotes())
    .catch( error => console.error(error));
}

function createNote() {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({topic: topic.value, note: note.value})
    })
    .then(resp => resp.json())
    .then(json => getNotes())
    .catch( error => console.error(error));
}

function getNotes () {
    fetch(url)
    .then(resp => resp.json())
    .then(notes => showNotes(notes))
    .catch( error => console.error(error));
}

function showNotes(notes) {
    tbody.innerHTML = '';
    
    notes.forEach(note => tbody.innerHTML += `<tr id=${note.id}><td>${(new Date(+note.id)).toString().substring(4,24)}</td><td>${note.topic}</td><td>${note.note}</td></tr>`);
    
    let rows = notes.map(note => `
        <tr id=${note.id}>
            <td>${(new Date(+note.id)).toString().substring(4,24)}</td>
            <td>${note.topic}</td>
            <td>${note.note}</td>
        </tr>`);
    let text = rows.join('\n');
    tbody.innerHTML += text;

    for (let note of notes) {
        let row = `
        <tr id=${note.id}>
            <td>${(new Date(+note.id)).toString().substring(4,24)}</td>
            <td>${note.topic}</td>
            <td>${note.note}</td>
        </tr>`;
        tbody.innerHTML += row;
    }
}