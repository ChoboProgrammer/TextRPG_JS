
// ScreenTag (view)
const $startPage = document.querySelector("#startpage");
const $mainPage= document.querySelector("#mainpage");
const $adventurePage=document.querySelector("#adventurePage");

//buttonTag
const $btn_adventure = document.querySelector(".adventure");
const $btn_rest = document.querySelector(".rest");
const $btn_end = document.querySelector(".end");
const $btn_bt_attack = document.querySelector(".ad_attack");
const $btn_bt_heal = document.querySelector(".ad_heal");
const $btn_bt_run = document.querySelector(".ad_run");

//playerTag
const $player_name = document.querySelector("#name");
const $player_lv = document.querySelector(".level");
const $player_hp = document.querySelector(".hp");
const $player_atk =  document.querySelector(".atk");
const $player_exp = document.querySelector(".exp");


//monsterTag
const $monster_name= document.querySelector(".monsterName");
const $monster_hp = document.querySelector(".monsterHp");
const $monster_Exp = document.querySelector(".monsterExp");
const $monster_Img = document.querySelector(".monsterImg");
const $monster_atk = document.querySelector(".monsteratk");
const $message = document.querySelector(".message");


//게임 설정
class Game {
  constructor(name){
    this.monster=null;
    this.player=new Player(this,name);
    this.monsterLst=[
      {name:"가디언 엔젤 슬라임",hp:500000,exp:10000,img:"/img/GanSil.gif",atk:5000},
      {name:"주황버섯",hp:120,exp:15,img:"/img/mushroom.gif",atk:10,},
      {name:"버블링",hp:150,exp:20,img:"/img/bubbling.gif",atk:15,},
      {name:"슬라임",hp:80,exp:10,img:"/img/slime.gif",atk:5},
    ];
    this.start();
  }
  start(){
    // this -> game , class안의 this는 자기자신
    /* main Menu Button */
    $btn_adventure.addEventListener('click',this.adventureHandler);
    $btn_rest.addEventListener('click',this.mainMenu);
    $btn_end.addEventListener('click',this.mainMenu);
    /* battle Menu Button*/
    $btn_bt_attack.addEventListener('click',this.battleMenu);
    $btn_bt_run.addEventListener('click',this.battleMenu);
    $btn_bt_heal.addEventListener('click',this.battleMenu);
    this.changeScreen("adventure");
  }
  changeScreen(page){
    if(page==="main"){
      $mainPage.style.display='flex';
      $adventurePage.style.display='none';
      $startPage.style.display='none';
    }else if(page==="start"){
      $mainPage.style.display='none';
      $adventurePage.style.display='none';
      $startPage.style.display='flex';
    }else if(page==="adventure"){
      $mainPage.style.display='none';
      $adventurePage.style.display='flex';
      $startPage.style.display=none;
    }
  }
  adventureHandler = (e) =>{
    e.preventDefault();
    this.changeScreen("adventure");
  }
}

class Player{
  constructor(game,name){
    this.game=game;
    this.name=name;
    this.level=1;
    this.maxHp=500;
    this.hp=500;
    this.exp=0;
    this.atk=50;
  }
  attack(target){
    target.hp-=this.atk;
  }
  heal(monster){
    this.hp +=30;
    this.hp -=monster.atk;
  }
}
class Monster{
  constructor(game,name,hp,exp,img,atk){
    this.game=game;
    this.name=name;
    this.hp=hp;
    this.exp=exp;
    this.img=img;
    this.atk=atk;
  }
}
let game=null;
//init 
$startPage.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name= e.target["name_input"].value;
  game=new Game(name);
});

//모험버튼 , lodash
$btn_adventure.addEventListener('click',(e)=>{
  $mainPage.style.display= 'none';
  $adventurePage.style.display='flex';
  //깊은 복사
  monster = JSON.parse(JSON.stringify(monsterLst[Math.floor(Math.random()*monsterLst.length)]))
  console.log(monster)
  monster.maxHp=monster.hp;
  $monster_name.textContent=monster.name;
  $monster_atk.textContent=`ATK:${monster.atk}`;
  $monster_Img.src=monster.img;
  $monster_Exp.textContent=`EXP:${monster.exp}`;
})
