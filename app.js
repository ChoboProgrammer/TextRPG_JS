
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

//player
const player= {
  name:'',
  level:1,
  maxHp:500,
  hp:500,
  exp:0,
  atk:50,
  attack(monster){
    monster.hp -=this.atk;
    this.hp -=monster.atk;
  },
  heal(monster){
    this.hp +=30;
    this.hp -=monster.atk;
  },
}

const monsterLst =[
  //{name:"",hp:,exp:,img:,atk:,},
  {name:"가디언 엔젤 슬라임",hp:500000,exp:10000,img:"/img/GanSil.gif",atk:5000},
  {name:"주황버섯",hp:120,exp:15,img:"/img/mushroom.gif",atk:10,},
  {name:"버블링",hp:150,exp:20,img:"/img/bubbling.gif",atk:15,},
  {name:"슬라임",hp:80,exp:10,img:"/img/slime.gif",atk:5},
]
//init 
$startPage.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name= e.target["name_input"].value;
  player.name=name;
  $startPage.style.display = 'none';
  $mainPage.style.display = 'flex';
  $player_name.textContent=name;
  $player_atk.textContent = `ATK: ${player.atk}`;
  $player_exp.textContent = `Exp:${player.exp}/${15*player.level}`;
  $player_lv.textContent = `${player.level}Lv`;
  $player_hp.textContent = `HP:${player.hp}/${player.maxHp}`;
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
