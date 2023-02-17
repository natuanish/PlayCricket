let window1 ={
    top : {
       ele : document.querySelectorAll(".box"),
       target : 0,
       over: 1,
       ball: [2,3,4,5,6,7],
       runs: 8,
       wicketsLeft : 9
    },

    mid:
    {
        ele: document.querySelectorAll(".mid-js"),
        compStat :0,
        compValue: 1,
        result:2,
        userStat:3,
        userValue:4
    }
        
}

const btn = document.querySelectorAll("#bottom button")


let runs=0;
const maxWickets=5;
let target="-";
let over_runs=[]
const maxovers=10
let overs=0
let wickets=0

let userInput="-";
let compInput="-";
// let userBatting=true;
let turn_left=1;
let result="-";
let game_over=false

function refresh()
{
    runs=0;
    over_runs=[]
    overs=0
    wickets=0
    userInput="-";
    compInput="-";
}

function intialise()
{
    refresh()
    result="-";
    game_over=false;
    target="-"
    turn_left=1;
    renderHTML()
}

btn[0].addEventListener("click",function(){
    renderGame(1)
})
btn[1].addEventListener("click",function(){
    renderGame(2)
})
btn[2].addEventListener("click",function(){
    renderGame(3)
})
btn[3].addEventListener("click",function(){
    renderGame(4)
})
btn[4].addEventListener("click",function(){
    renderGame(5)
})
btn[5].addEventListener("click",function(){
    renderGame(6)
})

document.addEventListener("keypress",(event)=>{
    console.log(event.code)
    if(event.code==="KeyR")
    {
        intialise()
    }
})

function renderGame(s)
{
    if(game_over)
        return
    userInput=s
    compInput=rand()

    if(over_runs.length===6)
    {
        over_runs=[]
    }
    let temp;
    if(userInput===compInput)
    {
        result="OUT"
        temp="W"
        wickets++
    }
    else{
        if(turn_left===1)
            temp=userInput
        else{
            temp=compInput
        }
        runs+=temp
        result=temp   
    }
    over_runs.push(temp)
    overs+=0.1
    overs=Math.floor(overs*10)/10 //two remove floating point errors

    if(over_runs.length==6)
    {
        overs=Math.ceil(overs);//to convert 0.6 to 1
    }

    
    if(wickets===maxWickets||overs===maxovers)
    {
        if(turn_left===1)
        {
            target=runs+1
            turn_left=0
            refresh()
            result="Balling"
        }
        else{
            if(target>runs)
                result="You Won"
            else
                result="You Lost"
            game_over=true
        }
    }

    if(turn_left===0)
    {
        if(runs>=target)
        {
            result="You Lost"
            game_over=true
        }
    }
    
        
    renderHTML()
}

function rand()
{
    if(turn_left===1)
    {
        if(userInput>3)
            return Math.ceil(Math.random()*3) +3
    }
    return Math.ceil(Math.random()*6)
}

function renderHTML()
{
    window1.top.ele[window1.top.target].innerHTML=target
    window1.top.ele[window1.top.over].innerHTML=overs + "/" + maxovers
    for(let i=0;i<6;i++)
    {
        if(over_runs[i])
            window1.top.ele[window1.top.ball[i]].innerHTML=over_runs[i]
        else
            window1.top.ele[window1.top.ball[i]].innerHTML="-" 
    }
    window1.top.ele[window1.top.runs].innerHTML=runs + "/" + wickets
    window1.top.ele[window1.top.wicketsLeft].innerHTML=maxWickets - wickets

    if(turn_left===0)
    {
        window1.mid.ele[window1.mid.compStat].innerHTML="Batting";
        window1.mid.ele[window1.mid.userStat].innerHTML="Bowling";
    }
    window1.mid.ele[window1.mid.compValue].innerHTML=compInput
    window1.mid.ele[window1.mid.result].innerHTML=result
    window1.mid.ele[window1.mid.userValue].innerHTML=userInput
}
