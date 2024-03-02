// TODO: Add code to check answers to questions
document.addEventListener('DOMContentLoaded', function() {

    // When click  on correct answer button, set the green color
    let correct = document.querySelector('.correct');
    correct.addEventListener('click', function(event) {
        correct.style.backgroundColor = '#4CAF50';
        document.querySelector('#feedback1').innerHTML = 'Correct!';
    });

    // When click  on incorrect answer button, set the red color
    let incorrects = document.querySelectorAll('.incorrect');

    for(let i = 0; i < incorrects.length; i++)
    {
        incorrects[i].addEventListener('click', function(event) {
        incorrects[i].style.backgroundColor = '#f52920';
        document.querySelector('#feedback1').innerHTML = 'Incorrect';
        });
    }

    let multipleChoiceButtons = document.querySelectorAll('.incorrect, .correct');

    for (let i = 0; i < multipleChoiceButtons.length; i++) {
        multipleChoiceButtons[i].addEventListener('click', function(event) {
            this.style.backgroundColor = this.classList.contains('correct') ? '#4CAF50' : '#f52920';
            document.querySelector('#feedback1').innerHTML = this.classList.contains('correct') ? 'Correct!' : 'Incorrect';

            // Disable all the buttons
            for (let button of multipleChoiceButtons) {
                button.disabled = true; 
            }
        });
    }

    document.querySelector('#check').addEventListener('click', function(){
       let input = document.querySelector('input');
       
       if(input.value == 'Châu Á'){
           input.style.backgroundColor = '#4CAF50';
           document.querySelector('#feedback2').innerHTML = 'Correct!';
       } else {
           input.style.backgroundColor = '#f52920';
           document.querySelector('#feedback2').innerHTML = 'Incorrect';
       }
    });

});