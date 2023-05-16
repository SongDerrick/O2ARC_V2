$(document).ready(function () {
    $('#symbol_picker').find('.symbol_preview').click(function(event) {
        symbol_preview = $(event.target);
        $('#symbol_picker').find('.symbol_preview').each(function(i, preview) {
            $(preview).removeClass('selected-symbol-preview');
        })
        symbol_preview.addClass('selected-symbol-preview');

        toolMode = $('input[name=tool_switching]:checked').val();
        if (toolMode == 'select') {
            $('.edition_grid').find('.ui-selected').each(function(i, cell) {
                symbol = getSelectedSymbol();
                setCellSymbol($(cell), symbol);
            });
        }
    });
     // Find the user_interact cell div and add a click listener to it.
    $('#user_interact').on('click', '.cell_final', function(event) {

        var selectedPreview = $('#symbol_picker').find('.selected-symbol-preview');
        // console.log(selectedPreview.attr('symbol'));  
        // Get the class of the clicked element.
        var cellClass = $(this).attr('class');
        var currentClasses = $(this).attr('class').split(' ');
        $(this).removeClass(currentClasses[1]).addClass('symbol_'+selectedPreview.attr('symbol'));
        // Log the new class of the cell

        
          
        // console.log($(this).attr('class'));
        // console.log(cellClass);
    });    

    // Select the cell_final elements and create a new MutationObserver object
    var cells = document.querySelectorAll('#user_interact .cell_final');
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            var oldClasses = getSymbolClasses(mutation.oldValue.split(' '));
            var newClasses = getSymbolClasses($(mutation.target).attr('class').split(' '));
    
            var classChanges = getSymbolClassChanges(oldClasses, newClasses);

            if(classChanges.length == 2){
                console.log(classChanges)
                console.log(classChanges[0].class, classChanges[1].class)   
            }
            }
           
        });
    });

    // Start observing changes to the 'class' attribute of each cell_final element
    cells.forEach(function(cell) {
        observer.observe(cell, { attributes: true, attributeOldValue: true });
    });




})

// Function to extract symbol classes
function getSymbolClasses(classes) {
    var symbolClasses = [];
  
    classes.forEach(function(className) {
      if (className.startsWith('symbol_')) {
        symbolClasses.push(className);
      }
    });
  
    return symbolClasses;
}

// Function to compare old and new classes and identify changes
function getSymbolClassChanges(oldClasses, newClasses) {
    var classChanges = [];
  
    oldClasses.forEach(function(oldClass) {
      if (!newClasses.includes(oldClass)) {
        classChanges.push({ class: oldClass, oldClass: oldClass, newClass: '' });
      }
    });
  
    newClasses.forEach(function(newClass) {
      if (!oldClasses.includes(newClass)) {
        classChanges.push({ class: newClass, oldClass: '', newClass: newClass });
      }
    });
  
    return classChanges;
  }



function resetOutputGrid() {
    // Use jQuery to select all <div> elements with class "cell_final"
    // and update their class attribute
    $("#user_interact .cell_final").attr("class", "cell_final symbol_0");
  }

$("#resetBtn").on("click", function() {
    // Call the resetOutputGrid() function when the button is clicked
    resetOutputGrid();
});

function resizeOutputGrid() {
    // Get the input value
    var inputValue = $("#output_grid_size").val();
    

    var rows = parseInt(inputValue.split('x')[0]);
    var cols = parseInt(inputValue.split('x')[1]);

    if(rows>cols){
        n = rows
    } else {
        n = cols
    }
    var grid = document.getElementById('user_interact');
    grid.innerHTML = '';

    for (var i = 0; i < rows; i++) {
        var row = document.createElement('div');
        row.className = 'row justify-content-center';
        for (var j = 0; j < cols; j++) {
            var cell = document.createElement('div');
            cell.className = 'cell_final symbol_0';
            cell.style.width = (400 / n) + 'px';
            cell.style.height = (400 / n) + 'px';
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    // Log the input value to the console
    console.log("Input Value:", inputValue);
  }

  function copyFromInput() {

    console.log(testgrid[0][0])

    if(testgrid[0][0].height>testgrid[0][0].width){
        n = testgrid[0][0].height
    } else {
        n = testgrid[0][0].width
    }

    var userInteractDiv = document.getElementById("user_interact");
    

    userInteractDiv.innerHTML = "";

    for (var i = 0; i < testgrid[0][0].height; i++) {
        var rowDiv = document.createElement("div");
        rowDiv.className = "row justify-content-center";
        
        for (var j = 0; j < testgrid[0][0].width; j++) {
        var cellDiv = document.createElement("div");
        cellDiv.className = "cell_final symbol_" + testgrid[0][0].grid[i][j];
        cellDiv.style.width = (400 / n)+ "px"; // Set the desired width of each cell
        cellDiv.style.height = (400 / n)+ "px"; // Set the desired height of each cell
        
        rowDiv.appendChild(cellDiv);
        }
        
        userInteractDiv.appendChild(rowDiv);

    }
    
  }

  function compareArrays(array1, array2) {
    // Check if the arrays have the same length
    if (array1.length !== array2.length) {
      return false;
    }
  
    // Iterate over the elements of the arrays
    for (let i = 0; i < array1.length; i++) {
      // Compare the elements at each index
      if (array1[i] !== array2[i]) {
        return false;
      }
    }
  
    // If all elements are equal, the arrays are identical
    return true;
  }

  function submitSolution(input, name, cRoute){
    // console.log("hi")

    const divs = document.querySelectorAll('#user_interact .cell_final');

    const numbersArray = [];

    divs.forEach(div => {
        const className = div.className;
        const number = className.split('symbol_')[1]; // Extract the number after "symbol_"
        numbersArray.push(number); // Store the number in the array
    });

    User_Answer = numbersArray.map(num => parseInt(num))
    Actual_Answer = input[0][1].grid.flat().map(num => parseInt(num))

    //console.log(numbersArray)
    //console.log(input[0][0].grid)
    //console.log(input[0][1].grid.flat()) // 이 친구가 답임 ㅋㅋ
    console.log(cRoute)
    var lastPart = cRoute.substring(cRoute.lastIndexOf('/') + 1);
    var incrementedValue = parseInt(lastPart, 10) + 1;
    
    // Convert the incremented value back to a string
    var incrementedLastPart = incrementedValue.toString();
    
    console.log(User_Answer)
    console.log(Actual_Answer)
    answer = compareArrays(User_Answer, Actual_Answer)
    console.log(answer)
    if(answer){
        alert('Success!')
        window.location.href ="/task/" + name + '/' + incrementedLastPart
    } else {
        alert('Wrong!')
    }
    

  }


