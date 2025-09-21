let globlVar = "global var";
function testGloblScop() {
  console.log(`Global scop: ${globlVar}`);
}

function testFunScop() {
  var funVar = "Fun Var";
  console.log(`Fun Scop: ${funVar}`);
}
console.log(`Outside fun, throw error, Fun Scop: ${funVar}`);

function testBlockScop() {}
