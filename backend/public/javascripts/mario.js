/* global variable */
TOTAL_STAGE = 6;
clear_stage_list = new Array();
fail_stage_list = new Array();
last_stage = -123;
random_stage = new Array();

/* @@@@@@@@@@@@@@@@@ 돌아가는 별자리 함수 @@@@@@@@@@@@@@@@@ */
/* 랜덤 int 가져오는 함수 */
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};

/* 엄청난 별자리 배경 함수 */
const makeStars = () => {
    var style = ["style1", "style2", "style3"];
    var tam = ["tam1", "tam1", "tam2", "tam2", "tam3"];
    var opacity = ["opacity1", "opacity2"];

    const maxSize = 2000;
    const _size = Math.floor(maxSize/4);
    const $sky = document.querySelector(".sky");
    const htmlDummy = new Array(_size).fill().map((_, i) => {
        var cls = "star "+style[getRandomArbitrary(0,3)]+" "+opacity[getRandomArbitrary(0, 2)] + " "+ tam[getRandomArbitrary(0, 5)] + "' style='animation-delay: ." +getRandomArbitrary(0, 9)+ "s; left: " + getRandomArbitrary(0, maxSize) + "px; top: " + getRandomArbitrary(0, maxSize) + "px;'"
        return `<span class='${cls}></span>`
    }).join('');
    $sky.innerHTML = htmlDummy;
}
/* @@@@@@@@@@@@@@@@@ 돌아가는 별자리 함수 @@@@@@@@@@@@@@@@@ */

/* cookie 설정 : 호출시 쿠키 데이터 최신화*/
function setCookieData(){
    var cookies = document.cookie.split(";").map(el => el.split("="))
    /* check cookies */
    var flag = false
    for(let i=0; i<cookies.length; i++){
        var elem = cookies[i]
        if (elem[0].trim() == "csl"){
            if (elem[1].length == 0){continue}
            clear_stage_list = elem[1].split("@")
            flag=true
        }
        if (elem[0].trim() == "fsl"){
            if (elem[1].length == 0){continue}
            fail_stage_list = elem[1].split("@")
            flag=true
        }
        if (elem[0].trim() == "rs"){
            if (elem[1].length == 0){continue}
            random_stage = elem[1].split("@")
            flag=true
        }
        if (elem[0].trim() == "ls"){
            if  (elem[1] == -123){continue}
            last_stage = elem[1]*1
            flag=true
        }
    }
    /* if no cookie data about csl fsl */
    if (!flag){
        document.cookie = "csl="+clear_stage_list.join('@')
        document.cookie = "fsl="+fail_stage_list.join('@')
        document.cookie = "ls="+String(-123)

        /* get random stage */
        let getRandom = (min, max, count) => {
            let temp_list = new Array()
            let flag=false
            while(temp_list.length < count){
                flag=false
                let elem = Math.floor(Math.random() * (max - min + 1)) + min;
                for(let e of temp_list){
                    if (e == elem || elem == 6097){
                        flag = true
                    }
                }
                if (!flag) {temp_list.push(elem)}
            }
            return temp_list
        }
        random_stage = getRandom(5948,6496,TOTAL_STAGE)
        document.cookie = "rs="+random_stage.join('@')
    }
}

/* save data in cookies */
function checkResult(){
    if (last_stage!=-123){
        /* correct */
        var num = last_stage
        if (window.location.href.split("?").at(-1)=="true"){
            clear_stage_list.push(num)
            document.cookie = "csl="+clear_stage_list.join('@')
        } else if (window.location.href.split("?").at(-1)=="false"){
            fail_stage_list.push(num)
            document.cookie = "fsl="+fail_stage_list.join('@')
        }   
        document.cookie = "ls="+String(-123)
        last_stage=-123
        location.href="/mario"
        return
    }

    /* set ui by cookie */
    let rnsh = document.getElementsByClassName("stage")
    for(let i=0; i<random_stage.length; i++){
        rnsh[i].setAttribute("onclick","enterProblemMario("+random_stage[i].toString()+","+(i+1).toString()+");")
    }

    for(let elem of clear_stage_list){
        let stage_html = document.getElementById(elem)
        stage_html.firstElementChild.className = "stage-clear"
        stage_html.firstElementChild.setAttribute("onclick","")
        stage_html.firstElementChild.lastElementChild.textContent = "Clear"
    }

    /* change progress bar */
    let per = parseInt(100*clear_stage_list.length/TOTAL_STAGE)
    document.querySelector(".progress-bar-move").style.width=per.toString()+"%"
    document.getElementsByClassName("titlePER")[0].innerHTML = per.toString()+"%"

    for(let elem of fail_stage_list){
        let stage_html = document.getElementById(elem)
        stage_html.firstElementChild.className = "stage-fail"
        stage_html.firstElementChild.setAttribute("onclick","")
        stage_html.firstElementChild.lastElementChild.textContent = "Fail"
    }
}

/* go to problem*/
function enterProblemMario(problem, stage){
    document.cookie = "ls="+String(stage)
    location.href="/mario/anonymous/"+String(problem)
}

/* function for submit button */
function submitSolutionMario(input1){
    /* 맞았는지 틀렸는지 구현 */

    // console.log("hi")

    const divs = document.querySelectorAll('#user_interact .cell_final');

    const numbersArray = [];

    divs.forEach(div => {
        const className = div.className;
        const number = className.split('symbol_')[1]; // Extract the number after "symbol_"
        numbersArray.push(number); // Store the number in the array
    });

    User_Answer = numbersArray.map(num => parseInt(num))
    Actual_Answer = input1[0][1].grid.flat().map(num => parseInt(num))

    
    console.log(User_Answer)
    console.log(Actual_Answer)
    answer = compareArrays(User_Answer, Actual_Answer)
    console.log(answer)
    /* 현재는 랜덤 */
    
    var retVal = ""
    if (!answer){
        retVal = "false"
        alert("Wrong!")
    }
    else{
        retVal = "true"
        alert("Success!")
    }

    /* 마리오 페이지로 redirection with return val */
    /* retVal에는 정답이면 true 오답이면 false인 String이 들어가야함*/
    location.href="/mario?"+retVal
}

/* super secret */
function superSecret(){
    if(TOTAL_STAGE == clear_stage_list.length){
        alert("hihello")
    }
    else{
        if (!confirm("You can get reward when you achieve 100%\nDo you want to reset?")) {
            alert("None")
        } else {
            document.cookie = "csl=";
            document.cookie = "fsl=";
            document.cookie = "ls=";
            document.cookie = "rs=";
            window.location.reload();
        }
    }
}

