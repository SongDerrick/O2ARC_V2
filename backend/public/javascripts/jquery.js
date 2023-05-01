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
        console.log(selectedPreview.attr('symbol'));  
        // Get the class of the clicked element.
        var cellClass = $(this).attr('class');
        var currentClasses = $(this).attr('class').split(' ');
        $(this).removeClass(currentClasses[1]).addClass('symbol_'+selectedPreview.attr('symbol'));
        // Log the new class of the cell

        
          
        console.log($(this).attr('class'));
        console.log(cellClass);
    });


})

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
