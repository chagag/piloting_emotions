/**
Various useful functions
**/

function getRandomInt(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min);
}

function getRandomElement (list){
  return list[Math.floor(Math.random()*list.length)];
}

function getFixationTime (){  //get randomized time of fixation by randomly choosing from 0.5, 1 and 1.5s
  var fixationTime = getRandomElement([500, 1000, 1500]);
  return fixationTime;
}

function getStimuli () { //function to get the first stimuli
  var curr_stim = stiumliShuffled[0];
  var stim = base_path + curr_stim //add the path the stim
  return stim;
}

function trialTrnaision (){
  stiumliShuffled.shift()
}

function getWord (){
  wordList = wordList.shift();
  return wordList;
}


function checkResponse(data){ //check repeated response
  var lastRatings = jsPsych.data.get().last(10).filter({trial_type:'image-slider-response_noButton'}).values();
  var currentRating = Number(lastRatings[0].response);
  var last1Rating = Number(lastRatings[1].response);
  var last2Rating = Number(lastRatings[2].response);
    if ((currentRating == last1Rating) && (currentRating == last2Rating)){
      alert('It seems that you were making the exact same rating as the one in the previous trial. Please make sure to change the scale to reflect your estimate of the mean group emotion.');
      return false;
    } else {
      return true;
    }
  }else {return true;}}
}

function checkTyping(){
    var lasttrialdata = jsPsych.data.getLastTrialData().select('responses').values[0];
    var lasttrialdata2 = JSON.parse(lasttrialdata).Q0;
    if (wordList !== lasttrialdata2){      //test if type correctly
      falseAnswer += 1;
      alert("Attention! Please type the word correctly. If the alert shows up for 4 times, the experiment will be automatically terminated.");
      wordList.unshift();

      if (falseAnswer == 4){
        alert("Hi! You've made too much errors in typing the word suggesting that you are not paying attention to the task. The task will be Terminated");
        window.close();
      }else{return true;}

      return true; }
    else {falseAnswer = 0;return false}
}


function getButtons() {
    var trialButtons = [
    '<button class="jspsych-btn" style="color:white; font-size: 24px; padding: 26px ;background-color:black; position: fixed; left:25%;top:40%; width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>',
    '<button class="jspsych-btn" style="color:white; font-size: 24px; padding: 26px ;background-color:red;position: fixed; left:62%;top:40%;width: 210px;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.9);border-radius: 50%">%choice%</button>'
    ];
    myButtons = [];
    myButtons.push(trialButtons);
    //alert (myButtons)
    return myButtons[myButtons.length -1];
  }

function getNextSlide () {  //use to shift instruction slides
  var currentSlide = slideList.shift();
  return currentSlide;
}



//data/server communication
function saveData(filename, filedata, callback, error_callback){
   $.ajax({
      type: 'post',
      cache: false,
      url: 'https://web.stanford.edu/~amitgold/cgi-bin/save_data.php',
      data: {filename: filename, filedata: filedata},
      success: callback,
      error: error_callback
   });
}
