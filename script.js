let xp = 0;
let health = 100;
let maxHealth = 100;
let mana = 50;
let maxMana = 50;
let level = 1;
let gold = 50;

let currentQuest = null;
let questProgress = 0;

let currentWeapon = 0;
let fighting;
let monsterHealth;
let monsterMaxHealth;

let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const saveButton = document.querySelector("#saveButton");
const loadButton = document.querySelector("#loadButton");

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const manaText = document.querySelector("#manaText");
const goldText = document.querySelector("#goldText");
const levelText = document.querySelector("#levelText");
const questText = document.querySelector("#questText");

const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const healthBar = document.querySelector("#healthBar");
const monsterBar = document.querySelector("#monsterBar");

const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    },
];

const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    },
    {
        name: "goblin",
        level: 5,
        health: 40
    },
    {
        name: "orc",
        level: 12,
        health: 100
    },
    {
        name: "ghost",
        level: 15,
        health: 150
    },
];

const locations = [
    {
        name: "town square",
        "button text": [
            "Go to store",
            "Explore...",
            "Quest Board"
        ],
        "button functions": [
            goStore,
            goExplore,
            goQuestBoard
        ],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": [
            "Buy Potions",
            "Buy weapon (30 gold)",
            "Go to town square"
        ],
        "button functions": [
            buyPotionsMenu,
            buyWeapon,
            goTown
        ],
        text: "You enter the store"
    },
    {
        name: "cave",
        "button text": [
            "Fight slime",
            "Fight fanged beast",
            "Go to town square"
        ],
        "button functions": [
            fightSlime,
            fightBeast,
            goTown
        ],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": [
            "Attack",
            "Magic",
            "Run"
        ],
        "button functions": [
            attack,
            magicMenu,
            goTown
        ],
        text: "You are fighting a monster."
    },
    {
        name: "magic",
        "button text": [
            "Fireball (20 Mana)",
            "Heal (10 Mana)",
            "Drink Potion",
            "Back"
        ],
        "button functions": [
            castFireball,
            castHeal,
            drinkPotion,
            goFight
        ],
        text: "Choose a spell or item."
    },
    {
        name: "kill monster",
        "button text": [
            "Go to town square",
            "Go to town square",
            "Go to town square"
        ],
        "button functions": [
            goTown,
            goTown,
            easterEgg
        ],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": [
            "REPLAY?",
            "REPLAY?",
            "REPLAY?"
        ],
        "button functions": [
            restart,
            restart,
            restart
        ],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": [
            "REPLAY?",
            "REPLAY?",
            "REPLAY?"
        ],
        "button functions": [
            restart,
            restart,
            restart
        ],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": [
            "2",
            "8",
            "Go to town square?"
        ],
        "button functions": [
            pickTwo,
            pickEight,
            goTown
        ],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    },
    {
        name: "explore",
        "button text": [
            "Go to cave",
            "Go to swamp",
            "Go to mountain"
        ],
        "button functions": [
            goCave,
            goSwamp,
            goMountain
        ],
        text: "Where do you want to explore?"
    },
    {
        name: "swamp",
        "button text": [
            "Fight slime",
            "Fight goblin",
            "Go to town square"
        ],
        "button functions": [
            fightSlime,
            fightGoblin,
            goTown
        ],
        text: "You enter the murky swamp. You see some monsters."
    },
    {
        name: "mountain",
        "button text": [
            "Fight orc",
            "Fight ghost",
            "Go to town square"
        ],
        "button functions": [
            fightOrc,
            fightGhost,
            goTown
        ],
        text: "You climb the mountain. The air is thin and you see dangerous monsters."
    },
    {
        name: "potions",
        "button text": [
            "Buy Health (10 gold)",
            "Buy Mana Potion (10 gold)",
            "Back"
        ],
        "button functions": [
            buyHealth,
            buyManaPotion,
            goStore
        ],
        text: "You see shelves filled with colorful bottles."
    },
    {
        name: "quest board",
        "button text": [
            "Hunt Slimes (50 Gold)",
            "Goblin Slayer (100 Gold)",
            "Beast Hunter (150 Gold)",
            "Back"
        ],
        "button functions": [
            () => acceptQuest(0),
            () => acceptQuest(1),
            () => acceptQuest(2),
            goTown
        ],
        text: "The Quest Board is full of requests from villagers."
    }
];

const quests = [
    {
        name: "Hunt Slimes",
        target: "slime",
        amount: 5,
        reward: 50
    },
    {
        name: "Goblin Slayer",
        target: "goblin",
        amount: 3,
        reward: 100
    },
    {
        name: "Beast Hunter",
        target: "fanged beast",
        amount: 2,
        reward: 150
    }
];

button1.onclick = goStore;
button2.onclick = goExplore;
button3.onclick = goQuestBoard;
saveButton.onclick = saveGame;
loadButton.onclick = loadGame;

function update(location) {
    monsterStats.style.display = "none";

    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];

    if (location["button text"][3]) {
        button4.innerText = location["button text"][3];
        button4.onclick = location["button functions"][3];
        button4.style.display = "inline-block";
    } else {
        button4.style.display = "none";
    }

    text.innerText = location.text;
    playSound("click");
}

function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function buyPotionsMenu() {
    update(locations[12]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        if (health > maxHealth) {
            health = maxHealth;
        }
        goldText.innerText = gold;
        healthText.innerText = health;
        updateHealthBars();
    } else {
        text.innerText = "You do not have enough gold to buy health";
    }
}

function buyManaPotion() {
    if (gold >= 10) {
        gold -= 10;
        inventory.push("mana potion");
        goldText.innerText = gold;
        text.innerText = "You bought a mana potion.";
    } else {
        text.innerText = "You do not have enough gold.";
    }
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You now have a " + newWeapon;
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        } else {
            text.innerText = "You do not have enough gold to buy a weapon.";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon;
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function fightGoblin() {
    fighting = 3;
    goFight();
}

function fightOrc() {
    fighting = 4;
    goFight();
}

function fightGhost() {
    fighting = 5;
    goFight();
}

function goExplore() {
    update(locations[9]);
}

function goSwamp() {
    update(locations[10]);
}

function goMountain() {
    update(locations[11]);
}

function goFight() {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterMaxHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
    updateHealthBars();
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name;

    playSound("attack");

    // Monster attack
    const monsterDamage = getMonsterAttackValue(monsters[fighting].level);
    health -= monsterDamage;
    showDamage(document.querySelector("#stats"), monsterDamage, "damage");

    if (monsterDamage > 0) playSound("hit");

    if (isMonsterHit()) {
        let damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;

        // Critical Hit Logic (15% chance)
        if (Math.random() < 0.15) {
            damage *= 2;
            text.innerText += " CRITICAL HIT!";
            showDamage(monsterStats, damage, "crit");
            playSound("attack"); // Extra sound for crit
        } else {
            showDamage(monsterStats, damage, "damage");
        }

        monsterHealth -= damage;
    } else {
        text.innerText += " You miss.";
    }

    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    updateHealthBars();

    // Add shake effect
    const gameContainer = document.querySelector("#game");
    gameContainer.classList.add("damage-shake");
    setTimeout(() => {
        gameContainer.classList.remove("damage-shake");
    }, 500);

    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks";
        currentWeapon--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit() {
    return Math.random() > .2 || health < 20;
}

function magicMenu() {
    update(locations[4]);
    monsterStats.style.display = "block";
}

function castFireball() {
    if (mana >= 20) {
        mana -= 20;
        manaText.innerText = mana;
        text.innerText = "You cast Fireball! It deals 50 damage.";

        // Fireball logic
        monsterHealth -= 50;
        monsterHealthText.innerText = monsterHealth;
        showDamage(monsterStats, 50, "magic");
        playSound("attack");

        // Monster still attacks
        const monsterDamage = getMonsterAttackValue(monsters[fighting].level);
        health -= monsterDamage;
        healthText.innerText = health;
        showDamage(document.querySelector("#stats"), monsterDamage, "damage");
        if (monsterDamage > 0) playSound("hit");
        updateHealthBars();

        if (health <= 0) {
            lose();
        } else if (monsterHealth <= 0) {
            fighting === 2 ? winGame() : defeatMonster();
        } else {
            // Return to fight menu but keep text
            const message = text.innerText;
            goFight();
            text.innerText = message;
        }
    } else {
        text.innerText = "Not enough mana!";
    }
}

function castHeal() {
    if (mana >= 10) {
        mana -= 10;
        manaText.innerText = mana;
        health += 30;
        if (health > maxHealth) health = maxHealth;
        healthText.innerText = health;
        text.innerText = "You cast Heal! You recover 30 health.";
        showDamage(document.querySelector("#stats"), 30, "heal");
        updateHealthBars();

        // Monster still attacks
        const monsterDamage = getMonsterAttackValue(monsters[fighting].level);
        health -= monsterDamage;
        healthText.innerText = health;
        showDamage(document.querySelector("#stats"), monsterDamage, "damage");
        updateHealthBars();

        if (health <= 0) {
            lose();
        } else {
            // Return to fight menu but keep text
            const message = text.innerText;
            goFight();
            text.innerText = message;
        }
    } else {
        text.innerText = "Not enough mana!";
    }
}

function drinkPotion() {
    if (inventory.includes("potion")) {
        health += 50;
        if (health > maxHealth) health = maxHealth;
        healthText.innerText = health;
        text.innerText = "You drink a potion and recover 50 health.";
        showDamage(document.querySelector("#stats"), 50, "heal");

        // Remove potion
        const index = inventory.indexOf("potion");
        inventory.splice(index, 1);

        updateHealthBars();

        // Return to fight menu but keep text
        const message = text.innerText;
        goFight();
        text.innerText = message;
    } else {
        text.innerText = "You don't have any potions!";
    }
}

function drinkManaPotion() {
    if (inventory.includes("mana potion")) {
        mana += 20;
        if (mana > maxMana) mana = maxMana;
        manaText.innerText = mana;
        text.innerText = "You drink a mana potion and recover 20 mana.";
        showDamage(document.querySelector("#stats"), 20, "magic");

        // Remove potion
        const index = inventory.indexOf("mana potion");
        inventory.splice(index, 1);

        // If in fight, return to menu
        if (fighting !== undefined) {
            const message = text.innerText;
            goFight();
            text.innerText = message;
        }
    } else {
        text.innerText = "You don't have any mana potions!";
    }
}

function toggleInventory() {
    const modal = document.getElementById("inventoryModal");
    const list = document.getElementById("inventoryList");

    if (modal.style.display === "block") {
        modal.style.display = "none";
    } else {
        modal.style.display = "block";
        list.innerHTML = "";

        // Count items
        const counts = {};
        inventory.forEach(item => {
            counts[item] = (counts[item] || 0) + 1;
        });

        for (const [item, count] of Object.entries(counts)) {
            const div = document.createElement("div");
            div.classList.add("inv-item");
            div.innerHTML = `<span>${item} (x${count})</span>`;

            if (item === "potion") {
                const btn = document.createElement("button");
                btn.innerText = "Use";
                btn.classList.add("inv-btn");
                btn.onclick = () => {
                    drinkPotion();
                    toggleInventory(); // Close to update UI
                };
                div.appendChild(btn);
            } else if (item === "mana potion") {
                const btn = document.createElement("button");
                btn.innerText = "Use";
                btn.classList.add("inv-btn");
                btn.onclick = () => {
                    drinkManaPotion();
                    toggleInventory();
                };
                div.appendChild(btn);
            }

            list.appendChild(div);
        }
    }
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;

    goldText.innerText = gold;
    xpText.innerText = xp;

    // Loot Drop Logic (20% chance)
    if (Math.random() < 0.2) {
        inventory.push("potion");
        text.innerText += " The monster dropped a health potion!";
    }

    checkQuest(monsters[fighting].name);

    update(locations[5]);
    checkLevelUp();
    updateHealthBars();
}

function checkQuest(monsterName) {
    if (currentQuest && currentQuest.target === monsterName) {
        if (questProgress < currentQuest.amount) {
            questProgress++;
            questText.innerText = currentQuest.name + ": " + questProgress + "/" + currentQuest.amount + " Completed";

            if (questProgress >= currentQuest.amount) {
                text.innerText += " QUEST COMPLETE! Return to the Quest Board to claim your reward.";
                questText.innerText = currentQuest.name + ": COMPLETED! (Return to Board)";
            }
        }
    }
}

function goQuestBoard() {
    update(locations[13]);

    // If quest is complete, show claim reward button
    if (currentQuest && questProgress >= currentQuest.amount) {
        button1.innerText = "Claim Reward (" + currentQuest.reward + " Gold)";
        button1.onclick = claimReward;
        button2.style.display = "none";
        button3.style.display = "none";
        text.innerText = "You have completed your quest! Claim your reward.";
    } else {
        // Reset buttons if not complete (in case we came back)
        button2.style.display = "inline-block";
        button3.style.display = "inline-block";
    }
}

function claimReward() {
    text.innerText = "You claimed your reward of " + currentQuest.reward + " gold!";
    gold += currentQuest.reward;
    goldText.innerText = gold;

    // Visual feedback
    showDamage(document.querySelector("#stats"), currentQuest.reward, "heal");
    playSound("win");

    currentQuest = null;
    questProgress = 0;
    questText.innerText = "None";

    // Refresh board
    goQuestBoard();
}

function acceptQuest(index) {
    if (!currentQuest) {
        currentQuest = quests[index];
        questProgress = 0;
        questText.innerText = currentQuest.name + ": 0/" + currentQuest.amount + " Completed";
        text.innerText = "You accepted the quest: " + currentQuest.name + "!";
    } else {
        text.innerText = "You already have a quest. Finish it first!";
    }
}

function checkLevelUp() {
    if (xp >= level * 100) {
        level++;
        maxHealth += 20;
        health = maxHealth;
        maxMana += 10;
        mana = maxMana;
        gold += 50;
        levelText.innerText = level;
        healthText.innerText = health;
        manaText.innerText = mana;
        goldText.innerText = gold;
        text.innerText += " YOU LEVELED UP! You are now level " + level + ". Stats increased!";
        updateHealthBars();
        playSound("win");
    }
}

function updateHealthBars() {
    const healthPercent = (health / maxHealth) * 100;
    healthBar.style.width = healthPercent + "%";

    if (fighting !== undefined && monsters[fighting]) {
        const monsterPercent = (monsterHealth / monsterMaxHealth) * 100;
        monsterBar.style.width = monsterPercent + "%";
    }
}

function showDamage(target, amount, type) {
    const damageEl = document.createElement("div");
    damageEl.innerText = amount;
    damageEl.classList.add("floating-text");

    if (type === "crit") {
        damageEl.style.color = "#ff0000";
        damageEl.style.fontSize = "1.5rem";
        damageEl.innerText += "!";
    } else if (type === "heal") {
        damageEl.style.color = "#00ff00";
        damageEl.innerText = "+" + amount;
    } else if (type === "magic") {
        damageEl.style.color = "#00ffff";
    }

    // Position randomly near target
    const rect = target.getBoundingClientRect();
    const randomX = Math.floor(Math.random() * 50) - 25;
    damageEl.style.left = (rect.left + rect.width / 2 + randomX) + "px";
    damageEl.style.top = rect.top + "px";

    document.body.appendChild(damageEl);

    setTimeout(() => {
        damageEl.remove();
    }, 1000);
}

function saveGame() {
    const gameData = {
        xp: xp,
        health: health,
        maxHealth: maxHealth,
        mana: mana,
        maxMana: maxMana,
        level: level,
        gold: gold,
        currentWeapon: currentWeapon,
        inventory: inventory,
        currentQuest: currentQuest,
        questProgress: questProgress
    };
    localStorage.setItem("rpgSave", JSON.stringify(gameData));
    text.innerText = "Game saved successfully!";
}

function loadGame() {
    const savedData = localStorage.getItem("rpgSave");
    if (savedData) {
        const gameData = JSON.parse(savedData);
        xp = gameData.xp;
        health = gameData.health;
        maxHealth = gameData.maxHealth || 100; // Default for old saves
        mana = gameData.mana || 50;
        maxMana = gameData.maxMana || 50;
        level = gameData.level || 1;
        gold = gameData.gold;
        currentWeapon = gameData.currentWeapon;
        inventory = gameData.inventory;
        currentQuest = gameData.currentQuest || null;
        questProgress = gameData.questProgress || 0;

        xpText.innerText = xp;
        healthText.innerText = health;
        manaText.innerText = mana;
        goldText.innerText = gold;
        levelText.innerText = level;

        if (currentQuest) {
            questText.innerText = currentQuest.name + " (" + questProgress + "/" + currentQuest.amount + ")";
        } else {
            questText.innerText = "None";
        }

        updateHealthBars();

        // Update weapon text if needed, though we are just loading stats
        // We might want to reset to town to be safe
        goTown();
        text.innerText = "Game loaded successfully!";
    } else {
        text.innerText = "No save data found.";
    }
}

function lose() {
    update(locations[6]);
}

function winGame() {
    update(locations[7]);
}

function restart() {
    xp = 0;
    health = 100;
    maxHealth = 100;
    mana = 50;
    maxMana = 50;
    level = 1;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    currentQuest = null;
    questProgress = 0;

    levelText.innerText = level;
    questText.innerText = "None";

    xpText.innerText = xp;
    healthText.innerText = health;
    manaText.innerText = mana;
    goldText.innerText = gold;

    updateHealthBars();

    goTown();
}

function easterEgg() {
    update(locations[8]);
}

function pick(guess) {
    const numbers = [];

    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n"

    for (let i = 0; i < numbers.length; i++) {
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
        }
    }
}

function pickTwo() {
    pick(2);
}

function pickEight() {
    pick(8);
}

// Sound Engine
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "click") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === "attack") {
        osc.type = "square";
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (type === "hit") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (type === "win") {
        osc.type = "triangle";
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(600, now + 0.1);
        osc.frequency.setValueAtTime(800, now + 0.2);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.3);
        gainNode.gain.linearRampToValueAtTime(0.01, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
    }
}