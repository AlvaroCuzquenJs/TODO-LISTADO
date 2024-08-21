const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let LISTADO

//Almacenar las tareas en el LOCALSTORAGE



//creacion de fechita, fecha para los serios:p
const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'short',day:'numeric'})


function agregarTarea (tarea, id, realizado, eliminado){
// para saber si 'eliminado' es true
if(eliminado) {return}

const REALIZADO = realizado ?check :uncheck
const LINE = realizado ?lineThrough :''

const elemento = `
                <li id="elemento">
                <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                <p class="text ${LINE}">${tarea}</p>
                <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                </li>
                `
    lista.insertAdjacentHTML("beforeend", elemento)

}

//funcion tarea realizada
function tareaRealizada(element){
    element.classList.toggle(check) //lo que hace esta funcion es darle el check
    element.classList.toggle(uncheck) 
    element.parentNode.querySelector('.text').classList.toggle(lineThrough) // cuando se le da el check se tachara la tarea
    LISTADO[element.id].realizado = LISTADO[element.id].realizado ?false :true
}

//funcion tarea eliminada
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LISTADO[element.id].eliminado = true
}

// para que se guarden las tareas dando click al mas
botonEnter.addEventListener('click',()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        LISTADO.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TODO',JSON.stringify(LISTADO))
    input.value=''
    id++
})

// para que se guarden las tareas dando enter en el teclado
document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){/* tiene que ponerse el '==' para que solo reconozca el enter y no cualquier key*/
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            LISTADO.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODO',JSON.stringify(LISTADO))
        input.value=''
        id++
    }
})



lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData === 'realizado'){
        tareaRealizada(element)
    }
    else if (elementData ==='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO',JSON.stringify(LISTADO))
})

//localstorage get item

let data= localStorage.getItem('TODO')
if(data){
    LISTADO=JSON.parse(data)
    id = LISTADO.length
    cargarLista(LISTADO)
}else{
    LISTADO = []
    id=0
    }

function cargarLista(DATA){
    DATA.forEach(function(i) {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}
