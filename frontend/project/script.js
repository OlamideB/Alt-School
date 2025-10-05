// Stopwatch App JavaScript with Bonus Features
// Variables to track time and timer state
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;
let lapTimes = [];

// Get DOM elements
const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const themeToggle = document.getElementById('themeToggle');
const lapList = document.getElementById('lapList');

// Event listeners for buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);
themeToggle.addEventListener('click', toggleTheme);

/**
 * Starts the stopwatch timer
 * Prevents multiple timers from running simultaneously
 */
function startTimer() {
    // Prevent multiple timers from starting
    if (isRunning) return;
    
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    
    // Update display every 10ms for smooth counting
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    
    // Update button states
    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = false;
}

/**
 * Stops/pauses the stopwatch timer
 * Uses clearInterval to stop the timer
 */
function stopTimer() {
    if (!isRunning) return;
    
    isRunning = false;
    clearInterval(timerInterval);
    
    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Resets the stopwatch to 00:00:00.000
 * Stops timer and resets all values to zero
 */
function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapCount = 0;
    lapTimes = [];
    
    // Update display and button states
    updateDisplay();
    clearLapTimes();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Updates the display with current elapsed time
 * Formats time as HH:MM:SS.mmm (with milliseconds)
 */
function updateDisplay() {
    // Calculate hours, minutes, seconds, milliseconds from elapsed time
    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000));
    
    // Format with leading zeros
    const formattedTime = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${formatMilliseconds(milliseconds)}`;
    
    // Update the display
    display.textContent = formattedTime;
}

/**
 * Formats a number with leading zero if needed
 * @param {number} num - Number to format
 * @returns {string} - Formatted number with leading zero
 */
function formatNumber(num) {
    return num < 10 ? `0${num}` : num.toString();
}

/**
 * Formats milliseconds with leading zeros
 * @param {number} ms - Milliseconds to format
 * @returns {string} - Formatted milliseconds with leading zeros
 */
function formatMilliseconds(ms) {
    if (ms < 10) return `00${ms}`;
    if (ms < 100) return `0${ms}`;
    return ms.toString();
}

/**
 * Records a lap time when the lap button is clicked
 */
function recordLap() {
    if (!isRunning) return;
    
    lapCount++;
    const currentTime = getCurrentTimeString();
    lapTimes.push({ number: lapCount, time: currentTime });
    
    // Add lap to display
    addLapToDisplay(lapCount, currentTime);
}

/**
 * Gets the current formatted time string
 * @returns {string} - Current time in HH:MM:SS.mmm format
 */
function getCurrentTimeString() {
    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000));
    
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${formatMilliseconds(milliseconds)}`;
}

/**
 * Adds a lap time to the display list
 * @param {number} lapNumber - The lap number
 * @param {string} timeString - The formatted time string
 */
function addLapToDisplay(lapNumber, timeString) {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapNumber}</span>
        <span class="lap-time">${timeString}</span>
    `;
    
    // Add to top of list (most recent first)
    lapList.insertBefore(lapItem, lapList.firstChild);
}

/**
 * Clears all lap times from display
 */
function clearLapTimes() {
    lapList.innerHTML = '';
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update theme toggle icon
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

/**
 * Loads saved theme preference
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

/**
 * Formats milliseconds with leading zeros
 * @param {number} ms - Milliseconds to format
 * @returns {string} - Formatted milliseconds with leading zeros
 */
function formatMilliseconds(ms) {
    if (ms < 10) return `00${ms}`;
    if (ms < 100) return `0${ms}`;
    return ms.toString();
}

/**
 * Records a lap time when the lap button is clicked
 */
function recordLap() {
    if (!isRunning) return;
    
    lapCount++;
    const currentTime = getCurrentTimeString();
    lapTimes.push({ number: lapCount, time: currentTime });
    
    // Add lap to display
    addLapToDisplay(lapCount, currentTime);
}

/**
 * Gets the current formatted time string
 * @returns {string} - Current time in HH:MM:SS.mmm format
 */
function getCurrentTimeString() {
    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000));
    
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}.${formatMilliseconds(milliseconds)}`;
}

/**
 * Adds a lap time to the display list
 * @param {number} lapNumber - The lap number
 * @param {string} timeString - The formatted time string
 */
function addLapToDisplay(lapNumber, timeString) {
    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';
    lapItem.innerHTML = `
        <span class="lap-number">Lap ${lapNumber}</span>
        <span class="lap-time">${timeString}</span>
    `;
    
    // Add to top of list (most recent first)
    lapList.insertBefore(lapItem, lapList.firstChild);
}

/**
 * Clears all lap times from display
 */
function clearLapTimes() {
    lapList.innerHTML = '';
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Update theme toggle icon
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', newTheme);
}

/**
 * Loads saved theme preference
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Initialize button states and theme on page load
document.addEventListener('DOMContentLoaded', () => {
    stopBtn.disabled = true;
    lapBtn.disabled = true;
    loadTheme();
    updateDisplay();
});