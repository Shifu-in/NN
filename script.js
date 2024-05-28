document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById("loadingScreen");
    const mainScreen = document.getElementById("mainScreen");
    const miningScreen = document.getElementById("miningScreen");
    const characterTapScreen = document.getElementById("characterTapScreen");
    const earnScreen = document.getElementById("earnScreen");
    const comingSoonScreen = document.getElementById("comingSoonScreen");
    const levelDisplay = document.getElementById("level");
    const coinsDisplay = document.getElementById("coins");
    const levelEarnDisplay = document.getElementById("levelEarn");
    const coinsEarnDisplay = document.getElementById("coinsEarn");
    const tapCounter = document.getElementById("tapCounter");

    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainScreen.style.display = "block";
        updateDisplay();
    }, 3000); // Загрузка экрана на 3 секунды

    const settingsButton = document.getElementById("settingsButton");
    const earnButton = document.getElementById("earnButton");

    const propertiesButton = document.getElementById("propertiesButton");
    const garageButton = document.getElementById("garageButton");
    const gymButton = document.getElementById("gymButton");
    const workButton = document.getElementById("workButton");

    const taskItemsEarn = document.getElementById("taskItemsEarn");
    const backToMainFromEarnButton = document.getElementById("backToMainFromEarnButton");
    const backToMainFromSoonButton = document.getElementById("backToMainFromSoonButton");

    const startMiningButton = document.getElementById("startMiningButton");
    const stopMiningButton = document.getElementById("stopMiningButton");
    const miningStatus = document.getElementById("miningStatus");
    const backButton = document.getElementById("backButton");

    const tapCharacterImage = document.getElementById("characterImage");

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
        levelEarnDisplay.textContent = `Level: ${userData.level}`;
        coinsEarnDisplay.textContent = `Coins: ${userData.coins}`;
        tapCounter.textContent = userData.taps;
    }

    loadUserData();

    settingsButton.addEventListener("click", function() {
        showComingSoon();
    });

    earnButton.addEventListener("click", function() {
        mainScreen.style.display = "none";
        earnScreen.style.display = "block";
        loadTasksEarn();
    });

    propertiesButton.addEventListener("click", function() {
        showComingSoon();
    });

    garageButton.addEventListener("click", function() {
        showComingSoon();
    });

    gymButton.addEventListener("click", function() {
        showComingSoon();
    });

    workButton.addEventListener("click", function() {
        mainScreen.style.display = "none";
        miningScreen.style.display = "block";
    });

    backButton.addEventListener("click", function() {
        miningScreen.style.display = "none";
        mainScreen.style.display = "block";
    });

    backToMainFromEarnButton.addEventListener("click", function() {
        earnScreen.style.display = "none";
        mainScreen.style.display = "block";
    });

    backToMainFromSoonButton.addEventListener("click", function() {
        comingSoonScreen.style.display = "none";
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
        showAnimation("+1 XP", tapCharacterImage.
