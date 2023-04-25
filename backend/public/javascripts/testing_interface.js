
class Grid {
    constructor(height, width, values) {
        this.height = height;
        this.width = width;
        this.grid = new Array(height);
        for (var i = 0; i < height; i++){
            this.grid[i] = new Array(width);
            for (var j = 0; j < width; j++){
                if (values != undefined && values[i] != undefined && values[i][j] != undefined){
                    this.grid[i][j] = values[i][j];
                } else {
                    this.grid[i][j] = 0;
                }
            }
        }
    }
}


function convertSerializedGridToGridObject(values) {
    height = values.length;
    width = values[0].length;
    return new Grid(height, width, values)
}


function loadJSONTask(train) {

    var result = []

    for (var i = 0; i < train.length; i++) {
        pair = train[i];
        values = pair['input'];
        input_grid = convertSerializedGridToGridObject(values)
        values = pair['output'];
        output_grid = convertSerializedGridToGridObject(values)
        // console.log(input_grid, output_grid)
        result.push([input_grid, output_grid])
    }
    return result
}

function resetOutputGrid(grid) {

    const array = Array.from({ length: grid[0][0].height }, () => Array.from({ length: grid[0][0].width }, () => 0));
    //console.log(array)
    newgrid = convertSerializedGridToGridObject(array)
    // console.log(newgrid)
    return newgrid
}


module.exports = {
   Grid,
   convertSerializedGridToGridObject,
   loadJSONTask,
   resetOutputGrid
}