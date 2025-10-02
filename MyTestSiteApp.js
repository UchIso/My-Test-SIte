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

//*--------------------------------------------------------------

const NickInput = document.getElementById("NickInput")
const MailInputs = document.getElementsByClassName("MailInput")
const PasswordInput = document.getElementsByClassName("PasswordInput")
let UserButtons = document.querySelectorAll(".LoginButtons")
class User{
    constructor(Nick,Email,Password){
        this.Nick = Nick
        this.Email = Email
        this.Password = Password
    }
}
let UserNick
let UserEmail
let UserPassword

let Login

UserButtons.forEach((Element,Index)=>{
    Element.addEventListener("click",ClickEvent => {
        if(Index == 1){
            if(NickInput.value.trim() != ""){
                UserNick = NickInput.value.trim() 
            }
            if(MailInputs[Index].value.trim().indexOf("@")>=6 && MailInputs[Index].value.trim().split("").some(value => Number(value)) && MailInputs[Index].value.trim().split("").some(value => value == "@"? false : isNaN(value))){
                UserEmail = MailInputs[Index].value.trim()
            }
            if(PasswordInput[Index].value.trim().split("").some(value => Number(value)) && PasswordInput[Index].value.trim().split("").some(value => isNaN(value)) && PasswordInput[Index].value.length >= 6){
                UserPassword = PasswordInput[Index].value.trim()
            }
            if(UserNick != undefined && UserEmail != undefined && UserPassword != undefined){
                let NewUser = new User(UserNick,UserEmail,UserPassword)
                localStorage.setItem(NewUser.Nick, JSON.stringify(NewUser))
            }
        }else{
            for(let i=0;i<localStorage.length;i++){
                if(MailInputs[Index].value.trim() == JSON.parse(localStorage.getItem(localStorage.key(i))).Email){
                    console.log("Correct Email");
                }
                if(PasswordInput[Index].value.trim() == JSON.parse(localStorage.getItem(localStorage.key(i))).Password){
                    console.log("Correct Password");
                    
                }
            }
        }
    }) 
})
