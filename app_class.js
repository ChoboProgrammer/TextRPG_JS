
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
const $player_btHp= document.querySelector(".ad_myHp");

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
    this.player=null;
    this.monsterLst=[
      {name:"가디언 엔젤 슬라임",hp:500000,exp:10000,img:"/img/GanSil.gif",atk:5000},
      {name:"주황버섯",hp:120,exp:15,img:"/img/mushroom.gif",atk:10,},
      {name:"버블링",hp:150,exp:20,img:"/img/bubbling.gif",atk:15,},
      {name:"슬라임",hp:80,exp:10,img:"/img/slime.gif",atk:5},
    ];
    this.start(name);
  }
  start(name){
    // this -> game , class안의 this는 자기자신
    /* main Menu Button */
    $btn_adventure.addEventListener('click',this.adventureHandler);
    $btn_rest.addEventListener('click',this.restHandler);
    $btn_end.addEventListener('click',this.endHandler);
    /* battle Menu Button*/
    $btn_bt_attack.addEventListener('click',this.attackHandler);
    $btn_bt_run.addEventListener('click',this.runHandler);
    $btn_bt_heal.addEventListener('click',this.healHandler);
    this.player=new Player(this,name);
    this.changeScreen("main");
    this.updatePlayerStat();
  }
  //화면전환
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
      $startPage.style.display='none';
    }
  }
  //모험 클릭시 logic
  adventureHandler = (e) =>{
    e.preventDefault();
    this.changeScreen("adventure");
    //몬스터 생성
    const randomIndex= Math.floor(Math.random()*this.monsterLst.length);
    const randomMonster = this.monsterLst[randomIndex];
    this.monster = new Monster(this,randomMonster.name,randomMonster.hp,
      randomMonster.exp,randomMonster.img,randomMonster.atk);
    this.updateMonsterStat();
    this.showMsg(`몬스터가 등장했다! ${this.monster.name}이다!`)
    $player_btHp.textContent = `내 체력${this.player.hp}`;
  }
  //휴식
  restHandler = (e)=>{
    e.preventDefault();
    const {player} = this;
    player.hp = player.maxHp;
    this.updatePlayerStat();
  }
  endHandler = (e) =>{
    e.preventDefault();
    this.changeScreen("start");
  }
  //player State 정보주입
  updatePlayerStat(){
    const { player } = this;
    if(player===null){
      $player_name.textContent='';
      $player_hp.textContent='';
      $player_atk.textContent='';
      $player_lv.textContent='';
      $player_exp.textContent='';
      return;
    }
    $player_name.textContent= player.name;
    $player_lv.textContent=`${player.level}Lv`;
    $player_hp.textContent=`HP:${player.hp}/${player.maxHp}`;
    $player_atk.textContent=`ATK:${player.atk}`;
    $player_exp.textContent=`EXP:${player.exp}/${20*player.level}`;
    $player_btHp.textContent = `내 체력${this.player.hp}`;
  }
  //Monster 정보주입
  updateMonsterStat(){
    const {monster} = this;
    if (monster===null){
      $monster_name.textContent='';
      $monster_atk.textContent='';
      $monster_hp.textContent='';
      $monster_Exp.textContent='';
      return
    }
    $monster_name.textContent=monster.name;
    $monster_atk.textContent=`ATK:${monster.atk}`;
    $monster_hp.textContent=`HP:${monster.hp}`;
    $monster_Exp.textContent=`Exp:${monster.exp}`;
    $monster_Img.src=monster.img;
  }
  showMsg(text){
    $message.textContent=text;
  }
  charcterDie = (hp) =>{
    if(hp<=0){
      this.player.hp =10;
      this.player.exp =Math.round(this.player.exp*0.9);
      this.changeScreen("main");
      this.updatePlayerStat();
      return true;
    }
    return false;
  }
  attackHandler= (e)=>{
    e.preventDefault();
    const {player,monster} =this;
    player.attack(monster);
    /*몬스터를 죽였는지 check ,level up 메커니즘 넣고, return*/
    if(monster.hp<=0){
      player.exp +=monster.exp;
      //Level up 처리 => 전투 끝나고 난 뒤에 처리해도 되긴함.
      if(player.exp >=20*player.level){
        player.exp -= 20*player.level;
        player.level +=1;
        player.maxHp *=player.level;
        player.atk *=player.level;
      }
      //console.log(player.exp);
      this.changeScreen("main");
      this.updatePlayerStat();
      return
    }
    monster.attack(player);
    this.showMsg(`${player.atk}의 데미지를 주고,${monster.atk}만큼의 데미지를 받습니다!`);
    /*플레이어가 사망했는지 , check. 사망했다면 , return*/
    if(this.charcterDie(player.hp)){
      return
    }
    this.updatePlayerStat();
    this.updateMonsterStat();
  }
  runHandler = (e) =>{
    e.preventDefault();
    this.changeScreen("main");
  }
  healHandler = (e) =>{
    e.preventDefault();
    const {monster,player} = this;
    (player.hp +30)>=player.maxHp ? player.hp =player.maxHp:(player.hp +=30);
    monster.attack(player);
    this.showMsg(`30을 회복하고, ${monster.atk}만큼의 데미지를 받습니다!`);
    if(this.charcterDie(player.hp)){
      return
    }
    this.updatePlayerStat();
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
  attack(target){
    target.hp -=this.atk;
  }
}
let game=null;
//init 
$startPage.addEventListener('submit',(e)=>{
  e.preventDefault();
  const name= e.target["name_input"].value;
  game=new Game(name);
});
