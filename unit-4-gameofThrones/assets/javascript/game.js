var characters = [
  {
    id: "jon",
    name: "Jon Snow",
    imageUrl: "assets/images/jonSnow.jpg",
    healthPoints: 100,
    attackPoints: 5,
    counterAttackPoints: 5
  },
  {
    id: "red-beard",
    name: "Tormund Giantsbane",
    imageUrl: "assets/images/redBeard.jpg",
    healthPoints: 100,
    attackPoints: 5,
    counterAttackPoints: 5
  },
  {
    id: "mountain",
    name: "Gregor Cleganer",
    imageUrl: "assets/images/mountain.jpg",
    healthPoints: 110,
    attackPoints: 5,
    counterAttackPoints: 5
  },
  {
    id: "nightKing",
    name: "Night King",
    imageUrl: "assets/images/nightKing.jpg",
    healthPoints: 80,
    attackPoints: 5,
    counterAttackPoints: 5
  }
];

var myCharacter = null;
var myAttackPoints = null;
var myEnemy = null;
var wins = 0;

characters.forEach(function(character) {
  var html =
    `<div id="` +
    character.id +
    `" class="card" style="width: 18rem;">
    <img src="` +
    character.imageUrl +
    `" class="card-img-top" alt="` +
    character.name +
    `">
    <div class="card-body">
        <p class="card-text">` +
    character.name +
    ` &middot; ` +
    `<span id = "`+ character.id + `-health" >` + character.healthPoints +`</span>`+
    `</p>`+
    `</div>`+
`</div>`;
  $("#pick-your-character-div").append(html);
  var characterCard = $("#" + character.id);
  characterCard.click(function() {
    onCharacterSelect(character);
  });
});

function onCharacterSelect(selectedCharacter) {
  if (myCharacter == null) {
    myCharacter = selectedCharacter;
    myAttackPoints = myCharacter.attackPoints;
    $("#pick-your-character-div").hide();
    $("#selected-character-div").show();
    $("#enemies-div").show();
    characters.forEach(function(character) {
      var characterCard = $("#" + character.id);
      characterCard.detach();
      if (character == selectedCharacter) {
        $("#selected-character-div").append(characterCard);
      } else {
        $("#enemies-div").append(characterCard);
        characterCard.unbind("click");
        characterCard.click(function() {onEnemySelect(character); });
      }
    });
  }
}
function onEnemySelect(selectedEnemy) {
  if (myEnemy == null) {
    myEnemy = selectedEnemy;
    $("#selected-enemy-div").show();
    var characterCard = $("#" + selectedEnemy.id);
    characterCard.detach();
    $("#selected-enemy-div").append(characterCard);
  }
}

function onAttack() {
    $('#alert-div').show();
    myEnemy.healthPoints = myEnemy.healthPoints - myCharacter.attackPoints;
    $('#' + myEnemy.id + '-health').html(myEnemy.healthPoints);
    myCharacter.healthPoints = myCharacter.healthPoints - myEnemy.counterAttackPoints;
    $('#' + myCharacter.id + '-health').html(myCharacter.healthPoints);
    if (myCharacter.healthPoints <= 0) {
        $('#alert-div').html('You\'ve been defeated...GAME OVER!!!');
        $('#selected-enemy-div').hide();
        //$('#reset-button').show();
    } else if (myEnemy.healthPoints <= 0) {
        wins++;
        if (wins == (characters.length - 1)) {
            $('#alert-div').html('You\'ve won!!!! GAME OVER!!!');
            $('#enemies-div').hide();
            //$('#reset-button').show();
        } 
        else {
            $('#alert-div').html('You have defeated ' + myEnemy.name + ', you can choose to fight another enemy');
        }
        var div = $('#' + myEnemy.id);
        div.detach();
        myEnemy = null;
        $('#selected-enemy-div').hide();
    } 
    else {
        $('#alert-div').html('You attacked ' + myEnemy.name + ' for ' + myCharacter.attackPoints + ' damage.<br />' + myEnemy.name + ' attacked you back for ' + myEnemy.counterAttackPoints + ' damage.');
    }
    myCharacter.attackPoints = myCharacter.attackPoints + myAttackPoints;
}
