class spawnManager {
    constructor(){
        this.mothership;
        this.mothershipImg;
        this.minionsJSON;
        this.minionsArray = [];
        this.minionImage = [];
    }

    preload(){
        //sets variable for minions.json
        this.minionsJSON = loadJSON("./assets/minions.json");

        this.minionImage.push(loadImage("./assets/img/smallminer.png"));
        this.minionImage.push(loadImage("./assets/img/bigminer.png"));
        this.minionImage.push(loadImage("./assets/img/smallattacker.png"));
        this.minionImage.push(loadImage("./assets/img/bigattacker.png"));


        this.mothershipImg = loadImage("./assets/img/mothership.png");
    }

    setup(){
        //creates mothership sprite, will be changed eventually, just a placeholder for variables
        this.mothership = new Sprite(width/2, height/2);
        this.mothership.img = this.mothershipImg;
        this.mothership.scale = 0.4;
        this.mothership.d = 100;
        this.mothership.drag = 10;
        this.mothership.colour = "purple";
        this.mothership.collider = "s";
        this.mothership.health = 1000;
        //this.mothership.debug = true;

        //adds minions from minions.json to an array
        this.minionsArray.push(this.minionsJSON.smallMiner);
        this.minionsArray.push(this.minionsJSON.bigMiner);
        this.minionsArray.push(this.minionsJSON.smallAttacker);
        this.minionsArray.push(this.minionsJSON.bigAttacker);
    }

    draw(){

    }

    requestSpawn(minionNumber){
        if(minionMovement.gameOver === false){
            //sets variable for requested minion
            let currentRequest = this.minionsArray[minionNumber];
            console.log("Requeted Summon: " + currentRequest.name);
    
            //checks if theres enough gold for the minions
            if(minionMovement.resources >= currentRequest.cost){
                console.log("Request accepted");
                //reduces gold by minion cost
                minionMovement.resources-=currentRequest.cost;
    
                //checks what type of minion is being requeted
                //as different minion types need different variables
                if(currentRequest.type === "miner"){
                    //spawns miner minion
                    this.spawnMiner(minionNumber);
                }else if(currentRequest.type === "attacker"){
                    //console.log("wow violent");
                    //spawns attacker minion
                    this.spawnAttacker(minionNumber);
                }
            }else{
                console.log("HA POOR");
            }
        }
    }

    spawnMiner(num){
        //sets a random position around mothership to spawn
        let ranX = random(-this.mothership.d/2, this.mothership.d/2);
        let ranY = random(-this.mothership.d/2, this.mothership.d/2);
        //creates new miner sprite
        let newMiner = new Sprite(this.mothership.x+ranX, this.mothership.y+ranY);
        newMiner.drag = 10;
        newMiner.color = "blue";
        newMiner.layer = 2;
        
        //sets image
        newMiner.img = this.minionImage[num];
        newMiner.scale = 2*(this.minionsArray[num].dim/100);
        
        //sets variables from json file
        newMiner.d = this.minionsArray[num].dim*2;
        newMiner.mineDelay = this.minionsArray[num].mineDelay
        newMiner.mineSpeed = this.minionsArray[num].mineSpeed;
        newMiner.health = this.minionsArray[num].health;
        newMiner.speedTwoElectricBoogalo = this.minionsArray[num].speed;
        //speedTwoElectricBoogalo... i need help
        //newMiner.debug = true;
        
        //creates variables in sprite for later use
        newMiner.locationX = null;
        newMiner.locationY = null;
        newMiner.mineTarget = null;
        newMiner.lookingForResources = true;
        newMiner.countDown = newMiner.mineDelay;
        
        //adds new minion to the minion group in 'minionControls.js'
        minionMovement.minionGroup.push(newMiner);
    }

    spawnAttacker(num){
        //sets a random position around mothership to spawn
        let ranX = random(-this.mothership.d/2, this.mothership.d/2);
        let ranY = random(-this.mothership.d/2, this.mothership.d/2);
        //creates new miner sprite
        let newAttacker = new Sprite(this.mothership.x+ranX, this.mothership.y+ranY);
        newAttacker.drag = 10;
        newAttacker.color = "yellow";
        newAttacker.layer = 2;
        
        //sets image
        newAttacker.img = this.minionImage[num];
        newAttacker.scale = 2*(this.minionsArray[num].dim/100);

        //sets variables from json file
        newAttacker.d = this.minionsArray[num].dim*2;
        newAttacker.attackDamage = this.minionsArray[num].attackDamage;
        newAttacker.attackDelay = this.minionsArray[num].attackDelay;
        newAttacker.health = this.minionsArray[num].health;
        newAttacker.speedTwoElectricBoogalo = this.minionsArray[num].speed;
        //newAttacker.debug = true;

        //creates variables in sprite for later use
        newAttacker.locationX = null;
        newAttacker.locationY = null;
        newAttacker.attackTarget = null;
        newAttacker.lookingForEnemy = true;
        newAttacker.countDown = newAttacker.attackDelay;
        
        //adds new minion to the minion group in 'minionControls.js'
        minionMovement.minionGroup.push(newAttacker);
    }
}