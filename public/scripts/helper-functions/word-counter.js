//Event listener to check for key presses
$ document.getElementById("input").addEventListener("keypress", function(input) {

  // Get value of textbox and split into array where there is one or more continous spaces
  let words = this.value.split(/\s+/); //Spliting words
  let lengthOfSubmission = words.length; //Checking length of textbox
  let max = 10; //max words

  if (lengthOfSubmission > max) {
    input.preventDefault(); // Cancel event

  }
});


