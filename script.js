document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainScreen = document.getElementById("mainScreen");
    const miningScreen = document.getElementById("miningScreen");
    const characterTapScreen = document.getElementById("characterTapScreen");
    const levelDisplay = document.getElementById("level");
    const coinsDisplay = document.getElementById("coins");
    const tapCounter = document.getElementById("tapCounter");

    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainScreen.style.display = "block";
        updateDisplay();
    }, 3000); // Загрузка экрана на 3 секунды

    const playButton = document.getElementById("playButton");
    const settingsButton = document.getElementById("settingsButton");
    const earnButton = document.getElementById("earnButton");

    const propertiesButton = document.getElementById("propertiesButton");
    const garageButton = document.getElementById("garageButton");
    const gymButton = document.getElementById("gymButton");
    const workButton = document.getElementById("workButton");

    const taskList = document.getElementById("taskList");
    const taskItems = document.getElementById("taskItems");

    const startMiningButton = document.getElementById("startMiningButton");
    const stopMiningButton = document.getElementById("stopMiningButton");
    const miningStatus = document.getElementById("miningStatus");
    const backButton = document.getElementById("backButton");

    const tapCharacterImage = document.getElementById("tapCharacterImage");
    const backToMainButton = document.getElementById("backToMainButton");

    let userData = {
        level: 1,
        experience: 0,
        coins: 0,
        taps: 0
    };

    function loadUserData() {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            userData = JSON.parse(storedData);
        }
    }

    function saveUserData() {
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    function updateDisplay() {
        levelDisplay.textContent = `Level: ${userData.level}`;
        coinsDisplay.textContent = `Coins: ${userData.coins}`;
        tapCounter.textContent = userData.taps;
    }

    loadUserData();

    playButton.addEventListener("click", function() {
        characterTapScreen.style.display = "block";
        mainScreen.style.display = "none";
    });

    settingsButton.addEventListener("click", function() {
        alert("Settings are not implemented yet.");
    });

    earnButton.addEventListener("click", function() {
        taskList.style.display = "block";
        loadTasks();
    });

    propertiesButton.addEventListener("click", function() {
        alert("Properties are not implemented yet.");
    });

    garageButton.addEventListener("click", function() {
        alert("Garage is not implemented yet.");
    });

    gymButton.addEventListener("click", function() {
        alert("Gym is not implemented yet.");
    });

    workButton.addEventListener("click", function() {
        mainScreen.style.display = "none";
        miningScreen.style.display = "block";
    });

    backButton.addEventListener("click", function() {
        miningScreen.style.display = "none";
        mainScreen.style.display = "block";
    });

    backToMainButton.addEventListener("click", function() {
        characterTapScreen.style.display = "none";
        mainScreen.style.display = "block";
    });

    startMiningButton.addEventListener("click", function() {
        startMining(8 * 60 * 60); // Майнинг на 8 часов
    });

    stopMiningButton.addEventListener("click", function() {
        miningStatus.textContent = "Mining stopped";
    });

    tapCharacterImage.addEventListener("click", function() {
        userData.taps += 1;
        userData.coins += 1; // Награда за каждый тап
        updateDisplay();
        saveUserData();
    });

    function loadTasks() {
        const tasks = [
            { name: "Subscribe to Channel 1", reward: 10 },
            { name: "Subscribe to Channel 2", reward: 20 },
            { name: "Subscribe to Channel 3", reward: 30 }
        ];

        taskItems.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement("li");
            li.textContent = `${task.name} - Reward: ${task.reward} coins`;
            li.addEventListener("click", function() {
                completeTask(task);
            });
            taskItems.appendChild(li);
        });
    }

    function completeTask(task) {
        userData.coins += task.reward;
        userData.experience += task.reward;
        checkLevelUp();
        saveUserData();
        updateDisplay();
        taskList.style.display = "none";
    }

    function checkLevelUp() {
        const experienceNeeded = userData.level * 100;
        if (userData.experience >= experienceNeeded) {
            userData.level += 1;
            userData.experience -= experienceNeeded;
        }
    }

    function startMining(duration) {
        miningStatus.textContent = `Mining started for ${duration / 3600} hours`;
        setTimeout(() => {
            const reward = duration / 3600 * 10; // Награда за каждый час майнинга
            userData.coins += reward;
            saveUserData();
            updateDisplay();
            miningStatus.textContent = `Mining completed! You earned ${reward} coins`;
        }, duration * 1000);
    }
});
