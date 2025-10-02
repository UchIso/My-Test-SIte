const DoorKey = document.getElementById("DoorsKey")
const LockHole = document.getElementById("LockHole")
const Doors = document.getElementById("Doors")

DoorKey.addEventListener("mouseenter",MouseEnter => {
    MouseEnter.target.draggable = true
    MouseEnter.stopPropagation()
    MouseEnter.preventDefault()
})
DoorKey.addEventListener("mouseleave",MouseLeave => {
    MouseLeave.target.draggable = false
    MouseEnter.stopPropagation()
    MouseLeave.preventDefault()
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
const UserButtons = document.querySelectorAll(".LoginButtons")
const SignUpMenuBTN = document.getElementById("SignUpMenuBTN")
const LoginMenuBTM = document.getElementById("LoginMenuBTM")
const KeyDefender = document.getElementById("KeyDefender")

LoginMenuBTM.addEventListener("click", ClickEvent => {

    Array.from(LoginMenuBTM.offsetParent.children).forEach(Element => {
        Element.style.opacity = 0
        Element.style.visibility = "hidden"
    })
    setTimeout(()=>{
        LoginMenuBTM.offsetParent.style.width = "0px"
        LoginMenuBTM.offsetParent.style.height = "0px"
        LoginMenuBTM.offsetParent.style.visibility = "hidden"
        
        SignUpMenuBTN.offsetParent.style.width = "600px"
        SignUpMenuBTN.offsetParent.style.height = "400px"
        SignUpMenuBTN.offsetParent.style.visibility = "visible"

        Array.from(SignUpMenuBTN.offsetParent.children).forEach(Element => {
            Element.style.opacity = 1
            Element.style.visibility = "visible"
        })
    },400)
})
SignUpMenuBTN.addEventListener("click",ClickEvent => {
    
    Array.from(SignUpMenuBTN.offsetParent.children).forEach(Element => {
        Element.style.opacity = 0
        Element.style.visibility = "hidden"
    })
    setTimeout(()=>{
        SignUpMenuBTN.offsetParent.style.width = "0px"
        SignUpMenuBTN.offsetParent.style.height = "0px"
        SignUpMenuBTN.offsetParent.style.visibility = "hidden"
        
        LoginMenuBTM.offsetParent.style.width = "600px"
        LoginMenuBTM.offsetParent.style.height = "400px"
        LoginMenuBTM.offsetParent.style.visibility = "visible"

        Array.from(LoginMenuBTM.offsetParent.children).forEach(Element => {
            Element.style.opacity = 1
            Element.style.visibility = "visible"
        })
    },400)
})
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

let HasUsers = new Map()
for(let i=0;i<localStorage.length;i++){
    let User = JSON.parse(localStorage.getItem(localStorage.key(i))).Email
    HasUsers.set(User,JSON.parse(localStorage.getItem(localStorage.key(i)))) 
}

UserButtons.forEach((Element,Index)=>{
    Element.addEventListener("click",ClickEvent => {
        if(Index == 1){
            if(NickInput.value.trim() != ""){
                UserNick = NickInput.value.trim() 
                NickInput.classList.remove("ErrorInput")
            }else{
                NickInput.classList.add("ErrorInput")
            }
            
            if(HasUsers.has(MailInputs[Index].value.trim()) == false && MailInputs[Index].value.trim().indexOf("@")>=6 && MailInputs[Index].value.trim().split("").some(value => Number(value)) && MailInputs[Index].value.trim().split("").some(value => value == "@"? false : isNaN(value))){
                UserEmail = MailInputs[Index].value.trim()
                MailInputs[Index].classList.remove("ErrorInput")
            }else{
                MailInputs[Index].classList.add("ErrorInput")
            }

            if(PasswordInput[Index].value.trim().split("").some(value => Number(value)) && PasswordInput[Index].value.trim().split("").some(value => isNaN(value)) && PasswordInput[Index].value.length >= 6){
                UserPassword = PasswordInput[Index].value.trim()
                PasswordInput[Index].classList.remove("ErrorInput")
            }else{
                PasswordInput[Index].classList.add("ErrorInput")
            }
            
            if(UserNick != undefined && UserEmail != undefined && UserPassword != undefined){
                let NewUser = new User(UserNick,UserEmail,UserPassword)
                localStorage.setItem(NewUser.Nick, JSON.stringify(NewUser))

                LoginMenuBTM.offsetParent.style.opacity = 0
                SignUpMenuBTN.offsetParent.style.opacity = 0

                setTimeout(()=>{
                    LoginMenuBTM.offsetParent.remove()
                    SignUpMenuBTN.offsetParent.remove()
                    setTimeout(()=>{
                        KeyDefender.style.opacity = 0
                        setTimeout(()=>{
                            KeyDefender.remove()
                        },100)
                    },300)
                },100)
            }
        }else{
            for(let i=0;i<localStorage.length;i++){

                if(MailInputs[Index].value.trim() == JSON.parse(localStorage.getItem(localStorage.key(i))).Email){
                    MailInputs[Index].classList.remove("ErrorInput")
                
                    if(PasswordInput[Index].value.trim() == JSON.parse(localStorage.getItem(localStorage.key(i))).Password){
                        PasswordInput[Index].classList.remove("ErrorInput")

                        LoginMenuBTM.offsetParent.style.opacity = 0
                        SignUpMenuBTN.offsetParent.style.opacity = 0

                        setTimeout(()=>{
                            LoginMenuBTM.offsetParent.remove()
                            SignUpMenuBTN.offsetParent.remove()
                            setTimeout(()=>{
                                KeyDefender.style.opacity = 0
                                setTimeout(()=>{
                                    KeyDefender.remove()
                                },100)
                            },300)
                        },100)
                    }else if(PasswordInput[Index].value.trim() == "" && PasswordInput[Index].value.trim() != JSON.parse(localStorage.getItem(localStorage.key(i))).Password){
                        PasswordInput[Index].classList.add("ErrorInput")
                    }
                }else if(MailInputs[Index].value.trim() == "" && MailInputs[Index].value.trim() != JSON.parse(localStorage.getItem(localStorage.key(i))).Email){
                    MailInputs[Index].classList.add("ErrorInput")
                }
            }
        }
    }) 
})
