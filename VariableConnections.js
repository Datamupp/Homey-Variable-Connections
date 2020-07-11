// Don't you dare delete that old forgotten variable in case it's used in some flow?
// Or do you want to see in which flow(s) your variables is used?
// This homeyscript lists all variables of homey's built in logicsystem (not Better Logic variables)
// to the console and which flows they're used in.
//
// Håkan Bergström
// https://github.com/Datamupp

var stringifiedObject;
var occurences=0;
var unusedVariables=0;

let allVariables = await Homey.logic.getVariables();
let allFlows = await Homey.flow.getFlows();

_.forEach(allVariables, currentVariable => {
    occurences=0;
    console.log(currentVariable.name);
    _.forEach(allFlows, currentFlow => {
        stringifiedObject=JSON.stringify(currentFlow);
        if (stringifiedObject.includes(currentVariable.id)) {
            occurences++;
            console.log('    ' + currentFlow.name);
        }
    })

    if (occurences == 0) {
        unusedVariables++;
        console.log('    Not found in any flows!                      <<<<<<<<<<<<<<<');
    }

    console.log();
})

console.log();
if (unusedVariables == 0) {
    console.log('No unused variables!  Good!');
}
else
{
    console.log('Found ' + unusedVariables + ' unused variables!');
}

return true;