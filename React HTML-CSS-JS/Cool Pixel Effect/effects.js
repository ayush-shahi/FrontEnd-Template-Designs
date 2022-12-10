const main = document.getElementById("e1");

function creatediv(){

    main.innerHTML = ""
    
    let r = Math.floor(window.innerHeight/ 40);
    let c=Math.floor(window.innerWidth / 40);
    let quantity=r*c;

    console.log(`width=${window.innerWidth} col=${c}`);
    console.log(`height=${window.innerHeight} rows=${r} total=${quantity}`);

    main.style.setProperty("--ncol",c);
    main.style.setProperty("--nrow",r);
    let i=0;

    while(i<quantity){
        var x = document.createElement("div");
        x.classList.add('item');
        x.dataset.cell=i+1;
        x.addEventListener("click",handleclick);
        x.style.setProperty("--icolo",arrcolor[coli]);
        main.appendChild(x);
        i+=1;
    }
    
    main.dataset.rows=r;
    main.dataset.col=c;
}

// function resolveAfter2Seconds(x) {
//     return new Promise((resolve) => {
//       setTimeout(() => { resolve(x);} , x);
//     });
//   }

// async function f1(a) {
//     let x = await resolveAfter2Seconds(a);
// }

const delay = ms => new Promise(res => setTimeout(res, ms));
async function makedelay(a){
    await delay(a);
}
 
async function handleclick() {

    let n = Number(main.dataset.rows);
    let m = Number(main.dataset.col);
    let total=n*m;
    let arr = main.getElementsByClassName("item");
    coli = (coli+1)%5;
    boli = (boli+1)%5;
    let q = [];
    let s = new Set();
    q.push(Number(this.dataset.cell));
    s.add(Number(this.dataset.cell));
    let temp;
    let x;
    let len;
    while(q.length>0){
        len = q.length;
        while(len>0){
            temp=q.shift();
            x=arr[temp-1];
            x.style.setProperty("--icolo",arrcolor[coli]);
            x.style.setProperty("--borcol",bocol[boli]);
            if(temp%m == 0){

            if((s.has(temp-1) === false) && (temp-1 > 0)){ 
                q.push(temp-1);
                s.add(temp-1);
            }
            if((s.has(temp-m) === false) && (temp-m > 0)){ 
                q.push(temp-m);
                s.add(temp-m);
            }
            if((s.has(temp+m) === false) && (temp+m <= total)){ 
                q.push(temp+m);
                s.add(temp+m);
            }
            }
            else if(temp%m == 1){
            if((s.has(temp+1) === false) && (temp+1 <= total)){ 
                q.push(temp+1);
                s.add(temp+1);
            }
            if((s.has(temp-m) === false) && (temp-m > 0)){ 
                q.push(temp-m);
                s.add(temp-m);
            }
            if((s.has(temp+m) === false) && (temp+m <= total)){ 
                q.push(temp+m);
                s.add(temp+m);
            }
            }

            else{
            if((s.has(temp-1) === false) && (temp-1 > 0)){ 
                q.push(temp-1);
                s.add(temp-1);
            }
            if((s.has(temp+1) === false) && (temp+1 <= total)){ 
                q.push(temp+1);
                s.add(temp+1);
            }
            if((s.has(temp-m) === false) && (temp-m > 0)){ 
                q.push(temp-m);
                s.add(temp-m);
            }
            if((s.has(temp+m) === false) && (temp+m <= total)){ 
                q.push(temp+m);
                s.add(temp+m);
            }
            }
        len-=1;
        }
        await delay(9);
    }
}

const arrcolor=["#dc9595","#ff7697","#ff7d6e","#2bcac7","#2bc9a6"];
let coli = 0;
const bocol = ["#ff9ddb","#ffa46f","#cf4a82","#76a1fd","#20b8d8"];
let boli = 0;
creatediv();
window.onresize = () => creatediv();
