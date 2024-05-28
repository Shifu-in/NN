document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainScreen = document.getElementById("mainScreen");
    const levelDisplay = document.getElementById("level");
    const coinsDisplay = document.getElementById("coins");

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

    let userData = {
        level: 1,
        experience: 0,
        coins: 0
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
    }

    loadUserData();

    playButton.addEventListener("click", function() {
        alert("Play button clicked");
    });

    settingsButton.addEventListener("click", function() {
        alert("Settings button clicked");
    });

    earnButton.addEventListener("click", function() {
        taskList.style.display = "block";
        loadTasks();
    });

    propertiesButton.addEventListener("click", function() {
        alert("Properties button clicked");
    });

    garageButton.addEventListener("click", function() {
        alert("Garage button clicked");
    });

    gymButton.addEventListener("click", function() {
        alert("Gym button clicked");
    });

    workButton.addEventListener("click", function() {
        startMining(8 * 60 * 60); // Майнинг на 8 часов
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
        alert(`Task completed: ${task.name}`);
        taskList.style.display = "none";
    }

    function checkLevelUp() {
        const experienceNeeded = userData.level * 100;
        if (userData.experience >= experienceNeeded) {
            userData.level += 1;
            userData.experience -= experienceNeeded;
            alert(`Level up! You are now level ${userData.level}`);
        }
    }

    function startMining(duration) {
        alert(`Mining started for ${duration / 3600} hours`);
        setTimeout(() => {
            const reward = duration / 3600 * 10; // Награда за каждый час майнинга
            userData.coins += reward;
            saveUserData();
            updateDisplay();
            alert(`Mining completed! You earned ${reward} coins`);
        }, duration * 1000);
    }
});
