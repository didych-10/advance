class Player {
    constructor(playerInfo) {
        this.name = playerInfo.name;
        this.attack = playerInfo.attack;
        this.hitpoints = playerInfo.hitpoints;
        this.totalHitpoints = playerInfo.hitpoints;
    }

    getHitpoints() {
        return this.hitpoints;
    }

    setHitpoints(val) {
        this.hitpoints = val;
    }

    getTotalHitpoints() {
        return this.totalHitpoints;
    }

    setTotalHitpoints(val) {
        this.totalHitpoints = val;
    }

    getAttack() {
        return this.attack;
    }

    setAttack(val) {
        this.attack = val;
    }

    isAlive() {
        return this.hitpoints >= 0;
    }

    fight(opponent, killed) {
        // console.log('Opponent hitpoints', opponent.hitpoints);
        if(!opponent.isAlive()) {
            console.log('Not alive');
            killed(true);
            return;
        }
        if(this === opponent) console(" You can't fight with yourself");

        if(opponent instanceof Champion) {
            if(this.enrageCounter>0) {
                hitChampion(this,opponent,true);
                this.enrageCounter--;
            } else if(this.enrageCounter <= 0) hitChampion(this,opponent,false);
        } else if(opponent instanceof Monster) {
            opponent.hitpoints -= this.attack;
            console.log(`${this.name} hit ${opponent.name}: -${this.attack}`);

            if(opponent.hitpoints <= 0) {
                console.log(`KILLED ${opponent.name} by ${this.name}`);
                this.attack +=1;
                killed(true);
            }
        }

    } 
}

const hitChampion = (attaker, opponent, isEnraged) => {
    const attackPower = isEnraged ? attaker.attack * 2 : attaker.attack
    opponent.hitpoints -= opponent.isDefenced ? 0 : attackPower;
    console.log(`${attaker.name} hit ${opponent.name}: -${attackPower}`);
    opponent.isDefenced = false;
}

class Champion extends Player{
    constructor(playerInfo) {
        super(playerInfo);
        this.isDefenced = false;
    }

    heal() {
        if(this.hitpoints + 5 <= this.totalHitpoints) this.hitpoints += 5;
        else console.error("Can't be bigger than total");
    }

    defence() {
        this.isDefenced = true;
    }
}

class Monster extends Player {
    constructor(playerInfo) {
        super(playerInfo);
        this.enrageCounter = 0;
    }

    enrage() {
        this.enrageCounter += 2;
    }

    fury() {
        if(this.hitpoints - 5 <= 0) console.error("Can't set fury option");

        this.hitpoints -= 5;
        this.totalHitpoints -= 5;
        this.attack += 2;
    }

}

let hercules = new Champion({name: 'Hercules', attack: 13, hitpoints: 112});
let monster = new Monster({name: 'Darkness', attack: 14, hitpoints: 98});


let timer = setInterval(()=>{
    let randomNum = Math.random() > 0.5 ? 0 : 1;
    // 0 - Monster 1 - Champion

    let healChanse = Math.random() > 0.5 ? true : false;
    let defenceChanse = Math.random() > 0.5 ? true : false;

    let enrageChanse = Math.random() > 0.5 ? true : false;
    let furyChanse = Math.random() > 0.5 ? true : false;

    let attacker, opponent;
    if(randomNum === 0) {
        attacker = monster;
        opponent = hercules;
    } else {
        attacker = hercules;
        opponent = monster;
    }

    if(attacker instanceof Champion) {
        if(defenceChanse) attacker.isDefenced = true;
    }

    if(attacker instanceof Monster) {
        if(enrageChanse) attacker.enrage();
        if(furyChanse) attacker.fury();
    }

    attacker.fight(opponent, (isKilled)=>{
        if(isKilled) clearInterval(timer);
    });

    console.log(attacker.name, ' - ' ,attacker.hitpoints);
    console.log(opponent.name, ' - ',opponent.hitpoints);

},2000);