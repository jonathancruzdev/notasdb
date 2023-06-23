const btn = document.querySelector('button');
const formulario = document.querySelector('form');
const textArea = document.querySelector('#descripcion');
const listaUL = document.querySelector('#lista');

const db = new PouchDB('notas_db');

const app = {

    addNota(){
        let descripcion = textArea.value.trim();
        let fecha = new Date().toISOString();


        if( textArea.value.trim() != ''   ){

            const nota = {
                _id: fecha,
                descripcion: descripcion,
                fecha: fecha
            }

            // Guardo el objeto en indexedDB
            db.put(nota).then(
                console.log('Registro Guardado')
            ).catch( error => {
                console.error(error)
            })

            textArea.value = '';
           
        } else {
            alert('Por favor complete los datos')
        }
    },
    readNotas(){
        console.info('Cargando notas');
        listaUL.innerHTML = '';

        db.allDocs({include_docs: true, descending: true}).then( docs => {
            console.log(docs);
            const documentos = docs.rows;

            documentos.forEach(item => {
                console.log(item.doc)
               listaUL.innerHTML += `<li class="list-group-item d-flex justify-content-between">
                                        <span> ${item.doc.descripcion} </span> 
                                        <i onClick="app.deleteNota(this)" class="text-danger fa-solid fa-trash"></i> 
                                    </li> `; 
            });

        }).catch( error => {
            console.error(error)
        })

    },
    deleteNota(elemento){
        console.log(elemento)
        // TERMINAR LA PROXIMA
        //db.remove(nota);
    }



}

formulario.addEventListener('submit', function(event){
    event.preventDefault();
    console.log('guardando')
    app.addNota();
})

app.readNotas()

db.changes({
    since: 'now',
    live: true
}).on('change', app.readNotas);


