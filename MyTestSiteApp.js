document
const DoorKey = document.getElementById("DoorsKey")
const LockHole = document.getElementById("LockHole")
const Doors = document.getElementById("Doors")

DoorKey.addEventListener("mouseenter",MouseEnter => {
    MouseEnter.target.draggable = true
    MouseEnter.stopPropagation()
    DragOver.preventDefault()
})
DoorKey.addEventListener("mouseleave",MouseLeave => {
    MouseLeave.target.draggable = false
    MouseEnter.stopPropagation()
    DragOver.preventDefault()
})
LockHole.addEventListener("dragover",DragOver => {
    DragOver.preventDefault()
})
async function UnlockAsyncFunc(){
    let UnlockPromise = await new Promise(Resolve => {
        LockHole.addEventListener("drop", Drop => {
            LockHole.appendChild(DoorKey.lastElementChild)
            Resolve(true)
        })
    })
    return UnlockPromise
}
UnlockAsyncFunc().then(Resolve => {
    const KeyBack = LockHole.firstElementChild
    DoorKey.remove()
    KeyBack.classList.add("Unlock")
    setTimeout(()=>{
    KeyBack.classList.add("UnlockAnimation")
    },1000)
    setTimeout(()=>{
        LockHole.parentElement.style.opacity = 0
        setTimeout(()=>{
            LockHole.parentElement.remove()
            AnimationFunc()
        },500)
    },1500)
})

let count = 0
function AnimationFunc(){
    let AnimationID = requestAnimationFrame(AnimationFunc)
    if (count <=100) {
        Doors.style.gap = count +"%"
        count+=10
    }else{
        cancelAnimationFrame(AnimationID)
    }
}