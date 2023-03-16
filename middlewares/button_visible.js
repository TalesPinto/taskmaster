
/*
<input type="text" id="myTextbox">
<button id="myButton" style="display: none;">Click me</button>
<script>
*/

function buttonVisible() {
    let textbox = document.getElementById("textbox");
    let button = document.getElementById("show-btn");

    textbox.addEventListener("click", () => {
        // display the button when the textbox is clicked
        button.style.display = "block";
    });
}
module.exports = buttonVisible